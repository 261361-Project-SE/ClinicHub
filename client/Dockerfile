FROM node:22.7.0
WORKDIR /app/frontend
COPY  package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]