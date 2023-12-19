# syntax=docker/dockerfile:1
FROM node:18 AS build
WORKDIR /app
COPY package* ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
