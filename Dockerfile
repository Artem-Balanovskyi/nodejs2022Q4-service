FROM node:18.13-alpine as builder

WORKDIR /app/build

COPY package*.json .

RUN npm install --legacy-peer-deps 

WORKDIR /app/build/dist

COPY . .

FROM node:18.13-alpine

COPY --from=builder /app/build/dist /app
COPY --from=builder /app/build/node_modules/ /app/node_modules

WORKDIR /app