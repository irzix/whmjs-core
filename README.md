# Hostito

> Open source web hosting billing & management system — built with NestJS and PostgreSQL (via Prisma).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Made by Webito](https://img.shields.io/badge/made%20by-Webito-black)](https://webito.io)
[![Sponsor](https://img.shields.io/badge/Sponsor-webito--io-ff69b4)](https://github.com/sponsors/webito-io)

---

## What is Hostito?

Hostito is a free, open source alternative to WHMCS — built for the modern web.

No PHP. No expensive licenses. No ugly interfaces.

Just a clean, developer-friendly billing and client management system for hosting providers, built with a modern JavaScript stack.

---

## Features

- 🧾 **Billing & Invoicing** — automated invoice generation, due date reminders
- 👤 **Client Management** — admin panel, client portal, reseller support
- 📦 **Product & Plan Management** — hosting plans, domains, VPS, licenses
- 🎫 **Support Tickets** — built-in helpdesk with departments and priorities
- 💳 **Payment Gateways** — Stripe, PayPal, crypto, manual payments
- 🖥️ **Server Provisioning** — cPanel, DirectAdmin integration (coming soon)
- 🔔 **Notifications** — email and SMS support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, NestJS |
| Database | PostgreSQL, Prisma |
| Auth | JWT (Passport, @nestjs/jwt) |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/webito-io/hostito-core.git
cd hostito-core

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Generate Prisma client & run initial migrations
npm run prepare

# Start development server
npm run start:dev
```

---

## Project Structure

```
hostito-core/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── invoices/
│   │   ├── payments/
│   │   ├── tickets/
│   │   ├── notifications/
│   │   ├── organizations/
│   │   ├── domains/
│   │   ├── coupons/
│   │   ├── servers/
│   │   ├── services/
│   │   ├── taxes/
│   │   ├── announcements/
│   │   ├── roles/
│   │   ├── audit-logs/
│   │   └── email-templates/
│   └── common/
├── prisma/
│   └── schema.prisma
└── test/
```

---

## Scripts

- build — compile TypeScript to dist
- start — run production server
- start:dev — run dev server with watch
- lint — run ESLint with auto-fix
- test, test:watch, test:cov — unit tests via Jest
- test:e2e — e2e tests via Jest
- prepare — Prisma generate + migrate dev

---

## API Reference

- Docs served at: http://localhost:3000/api
- Auth: Bearer JWT
- Generated via @nestjs/swagger + @scalar/nestjs-api-reference

---

## Roadmap

- [x] Project architecture
- [x] Auth foundation (JWT, roles, permissions)
- [x] Users module (basic CRUD)
- [x] Products module (listing, pagination)
- [ ] Plans management
- [ ] Orders & invoices
- [ ] Payment gateway integrations
- [ ] Support ticket system
- [ ] cPanel / DirectAdmin provisioning
- [ ] Admin dashboard (React)
- [ ] Client portal (React)
- [ ] Multi-language support
- [ ] Multi-currency support

---

## Environment Variables

Set these in your `.env`:

- DATABASE_URL — Postgres connection string
- PORT — server port (default: 3000)
- JWT_SECRET — secret for JWT tokens
- EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM — SMTP settings

---

## Sponsorship

We’re building modern, JavaScript-based, open source infrastructure for hosting providers and fintech:

- Hostito — hosting billing & management (NestJS + Prisma)
- Exito — crypto exchange platform
- Ledgito — accounting for exchanges and hosting

Your support helps us keep everything free and open source, invest in docs and community, and accelerate development.

- Sponsor: https://github.com/sponsors/webito-io
 
Thank you for believing in open source.

---

## Contributing

Hostito is built by the community, for the community.

Whether you're fixing a bug, adding a feature, or improving docs — all contributions are welcome.

### How to contribute

1. Fork the repository
2. Create a new branch — `git checkout -b feature/your-feature`
3. Make your changes
4. Write or update tests if needed
5. Open a Pull Request with a clear description

### What we need help with

- 🔌 Payment gateway integrations (Stripe, PayPal, crypto)
- 🖥️ Server module integrations (cPanel, DirectAdmin, Plesk)
- 🌍 Translations and multi-language support
- 🧪 Writing tests
- 📖 Documentation improvements
- 🎨 Frontend (React) components

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a PR.

### Code of Conduct

Be kind. Be constructive. We're all here to build something great together.

---

## License

MIT — free to use, modify, and distribute.

---
