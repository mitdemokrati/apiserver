FROM node:10.15-alpine as build

WORKDIR /appbuild/

ADD package*.json /appbuild/

ENV NODE_ENV=production

RUN npm ci

ADD src /appbuild/src
ADD config /appbuild/config
ADD ./jest.config.js /appbuild/
ADD ./tsconfig.json /appbuild/
ADD ./tslint.json /appbuild/

RUN npm run lint
RUN npm run test:ci
RUN npm run build

RUN npm prune --production

FROM node:10.15-alpine

WORKDIR /usr/src/service

COPY --from=build /appbuild/package*.json .
COPY --from=build /appbuild/node_modules node_modules
COPY --from=build /appbuild/dist dist

USER node

CMD ["npm", "run", "server"]