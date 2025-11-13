# Build stage
FROM oven/bun:1 AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Build arguments for Vite environment variables
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Pass build args as environment variables during build
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

RUN bun run build

# Production stage - use Caddy for static file serving
FROM caddy:2-alpine AS runner

COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 3000

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
