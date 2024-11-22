# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Install a static file server to serve the React app
RUN npm install -g serve

# Expose the port your app will run on
EXPOSE 3006

# Command to start the static file server
CMD ["serve", "-s", "build", "-l", "3006"]
