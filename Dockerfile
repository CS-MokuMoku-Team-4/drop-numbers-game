# syntax=docker/dockerfile:1
FROM node:18-alpine AS base

# Install dependencies only when needed
# FROM base AS deps
WORKDIR /app

COPY --link package.json ./
RUN npm install
RUN npm install -g next
RUN npm install use-sound
# RUN npx next -v

# Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps --link /app/node_modules ./node_modules
# COPY --link  . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN \
#   addgroup --system --gid 1001 nodejs; \
#   adduser --system --uid 1001 nextjs

# COPY --from=builder --link /app/public ./public

# USER nextjs

# EXPOSE 5000

COPY . .

# ENV PORT 5000
# ENV HOSTNAME localhost

CMD ["npm", "run", "dev"]