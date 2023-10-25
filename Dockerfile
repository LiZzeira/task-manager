FROM node:18

WORKDIR /usr/src/app

COPY packa*.json .
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:docker"]