# FROM nginx:latest
FROM node:18-alpine3.18
# RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# ADD ./dist ./dist

# NGINX 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 기본 설정 파일이 존재하는 경우에만 삭제
RUN if [ -f /etc/nginx/conf.d/default.conf ]; then rm /etc/nginx/conf.d/default.conf; fi


EXPOSE 3000

# COPY  ./nginx.conf /etc/nginx/conf.d/default.conf 

# COPY --from=build-stage /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]



