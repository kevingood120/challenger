FROM node:alpine
WORKDIR /usr/backend
COPY package*.json ./
RUN npm install @nestjs/cli --global
RUN npm install
COPY . .
EXPOSE 3050:3050
CMD npm start
