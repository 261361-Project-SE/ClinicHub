FROM node:22.7.0
WORKDIR /app
COPY  package*.json ./
COPY . .
RUN npm i
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]