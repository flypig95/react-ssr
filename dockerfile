FROM node:16.13.0

LABEL maintainer="chencong"

WORKDIR /root/app

COPY package.json /root/app/ 
COPY .npmrc /root/app/
RUN yarn 

COPY . /root/app/
RUN yarn build:prd

EXPOSE 8080
CMD ["yarn", "server"]
