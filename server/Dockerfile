FROM node:12-alpine
WORKDIR /home/node/app
COPY package*.json /home/node/app/
RUN npm install
COPY --chown=node:node . .
CMD npm start
EXPOSE 8080