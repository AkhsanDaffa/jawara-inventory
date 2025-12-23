FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Vite default port 5173, kita expose agar bisa diakses
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]