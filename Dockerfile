# ======================== BASE ========================
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# ======================== DEPS ========================
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN pnpm install --frozen-lockfile
RUN npx prisma generate

# ======================== BUILD =======================
FROM base AS build
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/generated ./generated

RUN pnpm run build

RUN pnpm prune --prod

# ======================== PRODUCTION ==================
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app

COPY package.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY prisma ./prisma/

# Reference the compiled .js file explicitly
CMD ["node", "dist/src/main.js"]
