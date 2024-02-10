
FROM nginx:latest

RUN mkdir /app

WORKDIR /app

ADD ./dist ./dist

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

# FROM node:18-alpine3.18

# COPY package.json package-lock.json ./

# RUN npm install

# COPY . ./

# RUN npm run build