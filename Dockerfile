FROM node:18-alpine as builder

WORKDIR /app/build

COPY package.json ./
COPY yarn.lock ./
# COPY tsconfig*.json ./
RUN yarn install && yarn cache clean

WORKDIR /app/build/dist

COPY . .

FROM node:18.0.0-alpine

COPY --from=builder /app/build/dist /app
COPY --from=builder /app/build/node_modules/ /app/node_modules

WORKDIR /app

EXPOSE ${PORT}

CMD ["yarn", "start:dev"]