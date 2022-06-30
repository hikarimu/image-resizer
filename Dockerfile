FROM node:18.3.0-alpine as builder
WORKDIR /usr/app
COPY package*.json .
COPY tsconfig.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18.3.0-alpine 
WORKDIR /usr/app
COPY package*.json .
COPY --from=builder /usr/app/dist .
COPY .env.docker .env
RUN mkdir uploads && mkdir resized-images
RUN npm pkg delete scripts.prepare && npm ci --production
CMD ["node", "./src/app/app.js"]
