# Stage 1: Build Angular/Ionic application
FROM node:18-alpine AS build

WORKDIR /app

# Build dependencies for native Node modules (e.g. @parcel/watcher on ARM)
RUN apk add --no-cache python3 make g++

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

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
