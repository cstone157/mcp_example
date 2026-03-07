# Build stage
# FROM node:18-alpine AS builder
FROM node:18-alpine


# WORKDIR /build
# WORKDIR /app
WORKDIR /app

# Copy package files
COPY package*.json ./
# COPY tsconfig.json ./

# Copy source code
# COPY --chown=nodejs:nodejs src/ ./src/
COPY src/ src/

# # Copy dependencies from builder
# COPY --from=builder /build/node_modules ./node_modules

# # Install dumb-init for proper signal handling in containers
# RUN apk add --no-cache dumb-init

# # Create non-root user for security
# RUN addgroup -g 1001 -S nodejs && \
#     adduser -S nodejs -u 1001

# # Copy package files
# COPY --chown=nodejs:nodejs package*.json ./

# Install dependencies
# RUN npm install --global typescript
# RUN npm ci --only=production
# RUN npm ci
RUN npm install

# # Create logs directory
# RUN mkdir -p /app/logs && \
#     chown nodejs:nodejs /app/logs

# # Switch to non-root user
# USER nodejs

# Expose port
EXPOSE 3000

# Build the project
# RUN npm run build

# # Health check
# HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
#   CMD node -e "console.log('healthy')" || exit 1
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "console.log('healthy')" || exit 1

# Use dumb-init to handle signals properly
# ENTRYPOINT ["node", "/app/dist/index.js"]
# ENTRYPOINT ["/sbin/dumb-init", "--"]

# Start the application
CMD ["npm", "start"]