FROM dmitryshevkun/base:base_1804_npm

run sudo mkdir -p /app
run sudo git clone https://github.com/AlexKolonitsky/kinguru
run sudo cp -r kinguru/backend/* app/

WORKDIR /app

run sudo npm i

EXPOSE 3010

run sudo pm2 index.js
