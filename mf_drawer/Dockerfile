FROM node:14
WORKDIR /app
COPY src /app
RUN npm install -g http-server
CMD ["http-server", "-p", "8080"]