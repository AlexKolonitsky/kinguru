FROM 188775681538.dkr.ecr.eu-west-1.amazonaws.com/base:base_1804_npm

run mkdir -p /app
WORKDIR /app
COPY ./backend/* /app/

run npm i

EXPOSE 3010

CMD ["npm","start"]
