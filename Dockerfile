# ======================== BASE ========================
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.14.4 --activate
WORKDIR /app

# ======================== DEPS ========================
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json pnpm-lock.yaml prisma.config.ts ./
COPY prisma ./prisma/
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
COPY package.json pnpm-lock.yaml prisma.config.ts ./
COPY prisma ./prisma/
RUN pnpm install --prod --frozen-lockfile

# ======================== PRODUCTION ==================
FROM node:24-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY package.json ./
COPY --from=build /app/dist ./dist
COPY --from=prod-deps /app/node_modules ./node_modules
COPY prisma ./prisma/

EXPOSE 3000

CMD ["node", "dist/main.js"]
