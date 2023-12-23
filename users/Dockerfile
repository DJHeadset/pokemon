FROM node:15

WORKDIR /users

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
