# syntax=docker/dockerfile:1
FROM node:18 AS build
WORKDIR /app
COPY package* ./
RUN npm install
COPY . ./
COPY docker.env .env
CMD ["npm", "run", "dev"]
