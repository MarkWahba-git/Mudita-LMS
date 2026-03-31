FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Prisma v7 needs a DATABASE_URL to generate the client (no actual connection)
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# next-intl requires message files at runtime
COPY --from=builder /app/messages ./messages
# Prisma generated client needed at runtime
COPY --from=builder /app/src/generated ./src/generated
# Prisma schema + migrations needed for migrate deploy at runtime
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
EXPOSE 3000
CMD ["node", "server.js"]
