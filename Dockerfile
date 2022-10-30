FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm run build 

RUN npm install -g serve

EXPOSE 3000

CMD [ "serve", "-s", "build" ]
