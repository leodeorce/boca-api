FROM node

WORKDIR /usr/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000/api/health || exit 1 

CMD ["yarn", "dev"]