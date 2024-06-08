FROM node:18

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files.
COPY package.json yarn.lock ./

# Install yarn if it's not already installed
RUN if [ ! -x "$(command -v yarn)" ]; then npm install -g yarn; fi

# Install dependencies
RUN yarn install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN yarn build

# Set the environment variables.
ARG XERO_API_URL
ENV XERO_API_URL=$XERO_API_URL
ENV NODE_ENV=production

# Expose the backend port.
EXPOSE 3001

# Start the application.
CMD [ "node", "dist/index.js" ]