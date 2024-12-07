FROM node:22.7.0
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g prisma
COPY . .
RUN npm run build
RUN npm run prisma:generate
EXPOSE 5000
CMD ["sh", "-c", " npm run prisma:push && npm run start:dev"]
