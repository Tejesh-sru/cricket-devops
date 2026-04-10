FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Copy source and build
COPY . .
# Ensure assets are built for root (not /CRIC/) so Nginx serves correctly at `/`
ENV PUBLIC_URL=/
RUN npm run build

FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts to nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
