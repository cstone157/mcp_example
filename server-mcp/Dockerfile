# Build stage
FROM node:18-alpine AS builder

WORKDIR /build

COPY package*.json ./

RUN npm ci

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Install dumb-init for proper signal handling in containers
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy dependencies from builder
COPY --from=builder /build/node_modules ./node_modules

# Copy application code
COPY --chown=nodejs:nodejs src/ ./src/

# Copy package files
COPY --chown=nodejs:nodejs package*.json ./

# Create logs directory
RUN mkdir -p /app/logs && \
    chown nodejs:nodejs /app/logs

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "console.log('healthy')" || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["/sbin/dumb-init", "--"]

# Start the application
CMD ["node", "src/index.js"]
