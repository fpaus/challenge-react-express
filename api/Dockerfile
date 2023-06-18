FROM node:16-alpine as install_dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev



FROM node:16-alpine as build

WORKDIR /app

COPY --from=install_dependencies /app ./

COPY . .

# RUN npm run build


FROM node:16-alpine as run

WORKDIR /app

COPY --from=install_dependencies /app/node_modules ./node_modules
COPY --from=build /app ./

EXPOSE 8080

CMD ["npm", "start"]