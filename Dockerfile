FROM node:8.10.0
WORKDIR /usr/src/app
COPY package*.json ./
COPY frontend/package*.json ./frontend/
RUN npm install
WORKDIR /usr/src/app/frontend
RUN npm install
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/frontend
RUN npm run build
WORKDIR /usr/src/app
EXPOSE 5000
CMD [ "npm", "start" ]