FROM node:20-alpine AS base

RUN apk add --no-cache \
    openssl \
    libstdc++ \
    bash \
    && addgroup -S app && adduser -S app -G app


WORKDIR /app

FROM base AS deps

# WORKDIR /app

COPY . .

RUN npm ci
run npx prisma generate

FROM base AS builder

WORKDIR /app

COPY --from=deps --chown=app:node /app/package.json ./
COPY --from=deps --chown=app:node /app/package-lock.json ./
COPY --from=deps --chown=app:node /app/tsconfig.json ./
COPY --from=deps --chown=app:node /app/node_modules ./node_modules
COPY --from=deps --chown=app:node /app/prisma ./prisma
COPY --from=deps --chown=app:node /app/src ./src

RUN npm install

RUN npm run build

FROM base AS runner

WORKDIR /app

COPY --from=deps --chown=app:node /app/package.json ./
COPY --from=deps --chown=app:node /app/node_modules ./node_modules
COPY --from=deps --chown=app:node /app/prisma ./prisma
COPY --from=builder --chown=app:node /app/build ./build

EXPOSE 3333

CMD ["npm", "run", "start"]