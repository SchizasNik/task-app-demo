FROM node:10.16.3-alpine as build

RUN npm config set unsafe-perm true
RUN npm install yarn -g

ADD . /app

WORKDIR /app

ENV GENERATE_SOURCEMAP='false'

RUN yarn install
RUN yarn run build

FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/mime.types /etc/nginx/mime.types

COPY --from=build /app/build /usr/share/nginx/html