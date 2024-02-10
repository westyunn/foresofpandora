FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# FROM nginx 
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "run", "start"]

# COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build  /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]