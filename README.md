# Show Me The Money

The goal of this project is to build a simple one-page application to display the Balance Sheet report from [Xero](https://www.xero.com/au/). The project consists of a backend API and a frontend application.

## Project Structure
- `backend` directory contains the backend API build with Node.js, Express, and Typescript.
- `frontend` directory contains the frontend application build with React and Typescript.

## Prerequisites

- Docker and Docker Compose installed

## Running the Project with Docker

### Step 1: Start Docker Compose

Run the following command at the root of the project to start the services:
```bash
docker-compose up --build
```
This command will build and start the backend, frontend, and Mock Xero API services. The services will be available at:
- Frontend: http://localhost:3003
- Backend: http://localhost:3001
- Mock Xero API: https://localhost:3000

> I have observed that Mock Xero API image is sometimes slow to boot up. So please wait until you see a log similar to below
```
{"app":"mockoon-server","environmentName":"Xero Accounting API","environmentUUID":"29617044-37dc-4efd-bf04-690ef3c90c1d","level":"info","message":"Transaction recorded","requestMethod":"GET","requestPath":"/api.xro/2.0/Reports/BalanceSheet","requestProxied":false,"responseStatus":200,"timestamp":"2024-06-08T12:59:29.312Z"}
```

## Running the Project Locally

### Step 1: Install Dependencies

Navigate to the `backend` and `frontend` directories and install the dependencies using Yarn:

```bash
cd backend
yarn install

cd ../frontend
yarn install
```

### Step 2: Create `.env` files

Create a `.env` file in the `backend` directory with the following content:
```
PORT=3001
XERO_API_URL=http://localhost:3000/api.xro/2.0/Reports/BalanceSheet
```
Create a `.env` file in the `frontend` directory with the following content:
```
VITE_API_URL=http://localhost:3001/api/balance-sheet
```

### Step 3: Start the Mock Xero API

Run the mock Xero API in a Docker container

```bash
docker pull jaypeng2015/show-me-the-money
docker run -d -p 3000:3000 jaypeng2015/show-me-the-money
```

### Step 4: Start the Backend Server

In the `backend` directory, start the backend server:
```bash
yarn start
```

The backend server will be running at http://localhost:3001

### Step 5: Start the Frontend Server

In the `frontend` directory, start the frontend server:
```bash
yarn dev
```

The frontend application will be running at http://localhost:3000
