FROM node:10.16.3-alpine

RUN npm config set unsafe-perm true
RUN npm install yarn -g

ADD . /app

WORKDIR /app

ENV TOP_MONGO_URL='mongodb://mongo:27017/toptal'

RUN yarn install
RUN yarn add typescript
RUN yarn run tsc

ENTRYPOINT ["node", "./out/app.js"]