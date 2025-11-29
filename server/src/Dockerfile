# Use a lighter version of Node
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (to cache dependencies)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the code
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]