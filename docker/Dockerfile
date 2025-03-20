FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps  # Prevents dependency issues

COPY . .

EXPOSE 4454

CMD ["npm", "run", "dev", "--", "--port", "4454", "--host"]
