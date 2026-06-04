FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install || true
RUN npm run build || true
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
