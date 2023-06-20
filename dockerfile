FROM node:16.13.0

LABEL maintainer="chencong"

WORKDIR /root/app

COPY package.json /root/app/ 
COPY .npmrc /root/app/
RUN npm install 

COPY . /root/app/

RUN npm run build:prd

EXPOSE 8080
CMD ["npm", "run", "server"]
