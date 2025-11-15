# Bakery Monorepo

Monorepo scaffold for a bakery ordering app:
- apps/web : Next.js + TypeScript + Tailwind (customer + admin PWA)
- apps/mobile : Expo React Native (customer app)
- packages/api : Serverless API (TypeScript) with Prisma
- packages/ui : Shared UI components

Run locally:
1. Install pnpm: https://pnpm.io/installation
2. Install deps: pnpm install
3. Start dev: pnpm dev

See .env.example for required environment variables.