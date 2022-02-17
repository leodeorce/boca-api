FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install
RUN npm run typeorm migration:run

COPY . .

EXPOSE 3333


CMD ["npm", "run", "dev"]