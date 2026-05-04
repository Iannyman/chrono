FROM node:20 AS base

RUN apt update && apt install -y less man-db
RUN apt upgrade -y

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm config set strict-ssl false && npm install

# --- Production ---
FROM base AS production
COPY . .

RUN npm run build

# Standalone output copies only the minimal files needed to run
COPY --from=production /app/.next/standalone /app/.next/standalone
COPY --from=production /app/.next/static /app/.next/standalone/.next/static
COPY --from=production /app/public /app/.next/standalone/public

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", ".next/standalone/server.js"]
