FROM node:18 AS builder

# Set working directory
WORKDIR /app
# Copy the root package.json and yarn.lock to install dependencies
COPY package*.json ./
# Install dependencies
RUN npm install

# Rebuild bcrypt for current architecture
RUN npm rebuild bcrypt --build-from-source
# Copy the entire monorepo to the container
COPY . .
# Build the NestJS app
RUN npx nx build backend --prod
# Use a lightweight Node.js image for the production environment
FROM node:18-alpine
# Set working directory
WORKDIR /app
# Copy the build output and install only production dependencies
COPY --from=builder /app/dist/apps/backend /app
COPY --from=builder /app/node_modules /app/node_modules
# Expose the backend port
EXPOSE 3000
# Start the NestJS app
CMD ["node", "main.js"]
