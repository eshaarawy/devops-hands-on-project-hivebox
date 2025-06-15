FROM node:20

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

RUN npm i

# Copy the remaining project files
COPY . .

CMD ["node", "version.js"]
