FROM node:alpine As development

RUN apk --no-cache add --virtual python3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist/ ./
