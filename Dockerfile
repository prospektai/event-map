# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine AS production

# Install openssl for certificate generation
RUN apk add --no-cache openssl

# Create directory for SSL certificates
RUN mkdir -p /etc/nginx/certs

# Generate self-signed SSL certificates
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/certs/nginx.key \
    -out /etc/nginx/certs/nginx.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=localhost"

# Copy Nginx configuration
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Development environment
FROM node:20-alpine AS development

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]
