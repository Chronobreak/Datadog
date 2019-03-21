FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
EXPOSE 8126/tcp
EXPOSE 8125/udp
CMD [ "node", "server.js" ]