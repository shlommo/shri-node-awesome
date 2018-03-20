FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./

ENV PORT=8080
ENV NODE_ENV=development

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD npm start -- --port $PORT
