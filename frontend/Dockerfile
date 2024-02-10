# FROM node:14
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD ["serve", "-s", "build"]

EXPOSE 3000

CMD ["npm","start"]