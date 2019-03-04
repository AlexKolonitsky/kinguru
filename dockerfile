FROM dmitryshevkun/base:base_1804_npm

run mkdir -p /app
run git clone https://github.com/AlexKolonitsky/kinguru
run cp -r kinguru/backend/* app/

WORKDIR /app

run npm i

EXPOSE 3010

run pm2 index.js
