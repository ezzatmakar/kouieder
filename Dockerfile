# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./ .

# Build the Next.js application
RUN npm run build

# Expose the port that your Next.js application listens on
EXPOSE 3000

# Start the Next.js application
CMD [ "npm", "start" ]
