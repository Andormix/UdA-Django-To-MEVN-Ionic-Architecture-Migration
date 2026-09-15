FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
ARG NPM_STRICT_SSL=true
RUN npm config set strict-ssl ${NPM_STRICT_SSL} && npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
