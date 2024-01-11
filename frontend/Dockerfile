FROM node:15

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY setUpProxyProd.js /app/src/setUpProxy.js

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]