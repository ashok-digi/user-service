# Use Node.js LTS
FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --only=production

# Copy the rest of your code
COPY . .

# Expose the port your service listens on
EXPOSE 3001

# Start the app
CMD [ "node", "app.js"]