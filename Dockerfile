# Stage 1: Build Angular/Ionic application
FROM node:18-bookworm-slim AS build

WORKDIR /app

# Build dependencies for native Node modules on ARM
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ \
 && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package*.json ./

# Install dependencies from lockfile (skip optional native deps)
RUN npm ci --omit=optional

# Copy source code
COPY . .

# Run production build
RUN npx ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy compiled files from build stage (Ionic compiles to www by default)
COPY --from=build /app/www /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
