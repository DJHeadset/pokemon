FROM node:15

WORKDIR /battle

COPY package*.json ./

RUN npm install
RUN npm install node-fetch@2

COPY . .

EXPOSE 5001

CMD [ "node", "battleserver.js" ]
