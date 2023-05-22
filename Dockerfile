FROM node:18-alpine as development
WORKDIR /app
COPY . ./
RUN npm i  --legacy-peer-deps

FROM development as mno
WORKDIR /app
RUN app=mno npm run package

FROM development as api
WORKDIR /app
RUN app=api npm run package

FROM development as auth
WORKDIR /app
RUN app=auth npm run package

FROM node:lts-alpine3.16 as releasemno
ENV NODE_ENV production
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /app
COPY --from=mno /app/build/ ./
CMD node main
