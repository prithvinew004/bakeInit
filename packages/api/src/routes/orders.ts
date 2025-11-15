import express from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const router = express.Router();

const OrderCreate = z.object({
  items: z.array(z.object({ productId: z.string(), qty: z.number().int().min(1) })),
  address: z.object({ line1: z.string(), city: z.string() }).passthrough(),
  paymentMethod: z.enum(['COD', 'RAZORPAY']),
  idempotencyKey: z.string().optional()
});

router.post('/', async (req, res) => {
  try {
    const parsed = OrderCreate.parse(req.body);
    // server: fetch products and recalc totals
    const productIds = parsed.items.map((i) => i.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } }});
    // NOTE: implement real price calc and Razorpay integration later
    const subtotal = parsed.items.reduce((acc, it) => {
      const p = products.find((x: any) => x.id === it.productId);
      return acc + (p ? p.price * it.qty : 0);
    }, 0);
    const order = await prisma.order.create({
      data: {
        userId: 'anonymous',
        items: parsed.items as any,
        subtotal,
        deliveryCharge: 300,
        total: subtotal + 300,
        paymentStatus: 'PENDING',
        orderStatus: 'PLACED',
        address: parsed.address as any
      }
    });
    res.json({ orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: String(err) });
  }
});

export default router;