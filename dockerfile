FROM dmitryshevkun/base:base_1804_npm

run mkdir -p /app
WORKDIR /app
COPY ./backend/* /app/

run npm i

EXPOSE 3010

run pm2 index.js
