FROM node:15

WORKDIR /backend

COPY package*.json ./

RUN npm install
RUN npm install node-fetch@2

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]