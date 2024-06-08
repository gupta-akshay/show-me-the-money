# Use the official Node.js 16 image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files.
COPY package.json yarn.lock ./

# Install dependencies.
RUN yarn install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN yarn build

# Install a simple static file server.
RUN yarn global add serve

# Expose the frontend port.
EXPOSE 3000

# Start the application.
CMD [ "serve", "-s", "dist" ]
