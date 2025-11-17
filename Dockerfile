# Multi-stage build for optimized image size

# Stage 1: Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_WEATHER_API_KEY
ARG VITE_BASE_PATH=/

# Set environment variables for build
ENV VITE_WEATHER_API_KEY=${VITE_WEATHER_API_KEY}
ENV VITE_BASE_PATH=${VITE_BASE_PATH}

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine AS production

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional, we'll create this)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
