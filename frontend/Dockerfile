FROM node:19.0.1-alpine
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENTRYPOINT npm run serve