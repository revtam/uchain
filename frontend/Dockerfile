FROM node:19.0.1-alpine

ARG PORT

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

ENTRYPOINT npm run serve -- -l ${PORT}