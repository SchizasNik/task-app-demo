# run locally with docker-compose

with docker/docker-compose installed:

run `docker-compose up` and go to http://localhost:3008

to rebuild images, run `docker-compose build --no-cache`

# run for development

you will need to have node installed for local development

to install yarn: `npm i -g yarn`

to install typescript: `npm i -g typescript`

## run nginx proxy

replace `{PATH_TO_CONF}` with absolute path to dev_utils/conf and run the following command

run 
```
docker run --name nginx-top -p:3001:3001 -v {PATH_TO_CONF}:/etc/nginx:ro -d nginx
```

## run server

in ./server
run `yarn install`
run `yarn tsc`
run `node ./out/app.js`

### run unit tests

run `yarn test`

## web app

in ./web-app
run `yarn install`
run `yarn start`

open http://localhost:3001/