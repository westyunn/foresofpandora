FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# FROM nginx 
EXPOSE 3000
ENV PORT 80
CMD ["npm", "start"]