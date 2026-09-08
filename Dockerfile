# ======================== BASE ========================
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# ======================== DEPS ========================
FROM base AS deps
# پکیج‌های مورد نیاز کامپایل ماژول‌های native مثل bcrypt روی alpine
RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ======================== BUILD =======================
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN pnpm run build

# ======================== PROD DEPS ===================
FROM base AS prod-deps
RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json pnpm-lock.yaml ./
# نصب صرفاً پکیج‌های پروداکشن به جای اجرای prune
RUN pnpm install --prod --frozen-lockfile

# ======================== PRODUCTION ==================
FROM node:24-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY package.json ./
COPY --from=build /app/dist ./dist
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma

COPY prisma ./prisma/

CMD ["node", "dist/main.js"]
