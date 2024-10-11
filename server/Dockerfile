FROM node:18-bookworm-slim

WORKDIR /app

COPY package*.json  .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]