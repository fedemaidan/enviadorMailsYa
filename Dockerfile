FROM node:8.9.1
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
RUN npm install nodemailer
RUN npm install body-parser
RUN npm install nodemailer-smtp-transport
RUN npm install cors

COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]