FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM node:20-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY . .

COPY --from=builder /app/node_modules ./node_modules

RUN chown -R appuser:appgroup /app

USER appuser

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "run", "start"]
