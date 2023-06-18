FROM node:16-alpine as install_dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci


FROM node:16-alpine as build

WORKDIR /app

COPY --from=install_dependencies /app ./

COPY . .

RUN npm run build

FROM nginx:1.25.1-alpine as production
ENV NODE_ENV production

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]