# FROM node:18

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# COPY . ./

# RUN npm run build

# EXPOSE 3000

# # CMD ["serve", "-s", "build"]

# CMD ["npm","start"]


FROM node:18

RUN npm install -g serve

RUN mkdir /app
WORKDIR /app

RUN mkdir ./build
COPY ./build ./build

ENTRYPOINT ["serve", "-s", "build"]