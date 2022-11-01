FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm -rf ./.env
COPY ./.env.production ./.env
RUN npm run build
EXPOSE 5000
CMD [ "node", "./dist/index.js" ]