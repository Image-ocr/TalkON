FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.base.json ./

FROM base AS deps

COPY packages/types/package*.json ./packages/types/
COPY packages/shared/package*.json ./packages/shared/
COPY packages/encryption/package*.json ./packages/encryption/
COPY packages/backend-auth/package*.json ./packages/backend-auth/

RUN npm install

FROM deps AS builder

COPY packages/types ./packages/types
COPY packages/shared ./packages/shared
COPY packages/encryption ./packages/encryption
COPY packages/backend-auth ./packages/backend-auth

RUN npm run build --workspace=packages/types
RUN npm run build --workspace=packages/shared
RUN npm run build --workspace=packages/encryption
RUN npm run build --workspace=packages/backend-auth

FROM node:20-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 talkon

COPY --from=builder --chown=talkon:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=talkon:nodejs /app/packages/types/dist ./packages/types/dist
COPY --from=builder --chown=talkon:nodejs /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder --chown=talkon:nodejs /app/packages/encryption/dist ./packages/encryption/dist
COPY --from=builder --chown=talkon:nodejs /app/packages/backend-auth/dist ./packages/backend-auth/dist
COPY --from=builder --chown=talkon:nodejs /app/packages/backend-auth/package.json ./packages/backend-auth/

USER talkon

EXPOSE 3001

CMD ["node", "packages/backend-auth/dist/index.js"]
