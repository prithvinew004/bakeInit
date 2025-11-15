import express from 'express';
import dotenv from 'dotenv';
import ordersRouter from './routes/orders';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/orders', ordersRouter);

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`API running on http://localhost:${port}`));