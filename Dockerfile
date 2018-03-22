FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

ENV PORT=8080
ENV NODE_ENV=development
ENV REPO=awesome_project

RUN npm install --quiet

COPY . .

RUN npm run build
RUN git clone --mirror https://github.com/mrmlnc/les-reponses-sur-devoirs.git awesome_project

EXPOSE 8080
CMD npm start
