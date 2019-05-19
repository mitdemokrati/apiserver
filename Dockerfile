## Builder
FROM node:12.2-alpine as builder

COPY . /app

WORKDIR /app

RUN apk add --no-cache --virtual build-dependencies python make g++

RUN npm ci

RUN npm run pipeline:ci

RUN npm prune --production

## Server
FROM node:12.2-alpine

COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/dist dist

ENV NODE_ENV production

USER node

CMD ["node", "/app/dist/server.js"]