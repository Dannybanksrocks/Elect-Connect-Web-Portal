FROM node:lts-alpine as build
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM caddy:latest
COPY --from=build /app/build /var/www/html
COPY ./caddy/Caddyfile /etc/caddy/
EXPOSE 80
CMD ["caddy", "run", "--config",  "/etc/caddy/Caddyfile", "--adapter" ,"caddyfile"]