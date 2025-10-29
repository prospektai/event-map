# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine AS production

# Copy Nginx configuration
# The configuration is mounted at runtime via docker-compose

# SSL certificates are handled by the reverse proxy

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
