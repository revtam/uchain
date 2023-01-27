FROM node:19.0.1-alpine

WORKDIR /app

COPY . .

RUN mkdir -p files
RUN npm ci
RUN npm run build

ENTRYPOINT npm run serve