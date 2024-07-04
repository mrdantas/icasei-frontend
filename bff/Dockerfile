FROM node:14
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY src /app/src
CMD ["node", "src/server.js"]