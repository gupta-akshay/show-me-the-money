# Use the official Node.js 16 image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files.
COPY package.json yarn.lock ./

# Install yarn if it's not already installed
RUN if [ ! -x "$(command -v yarn)" ]; then npm install -g yarn; fi

# Install dependencies
RUN yarn install

# Copy the rest of the application code.
COPY . .

# Set environment variables
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the application.
RUN yarn build

# Install a simple static file server.
RUN yarn global add serve

# Expose the frontend port.
EXPOSE 3000

# Start the application.
CMD [ "serve", "-s", "dist" ]
