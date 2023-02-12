FROM node:16.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production --ignore-scripts

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
