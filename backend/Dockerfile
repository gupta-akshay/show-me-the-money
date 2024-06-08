FROM node:18

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files.
COPY package.json yarn.lock ./

# Install dependencies.
RUN yarn install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN yarn build

# Set the environment variables.
ENV NODE_ENV=production

# Expose the backend port.
EXPOSE 3001

# Start the application.
CMD [ "node", "dist/index.js" ]