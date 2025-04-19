# Use Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# App binds to port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
