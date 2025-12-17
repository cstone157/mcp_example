# Use a lighter version of Node
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (to cache dependencies)
COPY . .

# Install only production dependencies
RUN npm ci --only=production

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]