import request from 'supertest';
import express from 'express';
import routes from '../routes';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BalanceSheetMockData from './__mocks__/balanceSheetMock.json';

const app = express();
app.use(express.json());
app.use('/api', routes);

describe('GET /api/balance-sheet', () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    process.env.XERO_API_URL = 'http://localhost:3000/api.xro/2.0/Reports/BalanceSheet';
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return balance sheet data', async () => {
    mock.onGet(process.env.XERO_API_URL).reply(200, BalanceSheetMockData);

    const response = await request(app).get('/api/balance-sheet');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should handle network error', async () => {
    mock.onGet(process.env.XERO_API_URL).networkError();

    const response = await request(app).get('/api/balance-sheet');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to fetch balance sheet data');
  });

  it('should handle server error', async () => {
    mock.onGet(process.env.XERO_API_URL).reply(500, {
      message: 'Internal Server Error',
    });

    const response = await request(app).get('/api/balance-sheet');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
  });

  it('should handle not found error', async () => {
    mock.onGet(process.env.XERO_API_URL).reply(404, {
      message: 'Not Found',
    });

    const response = await request(app).get('/api/balance-sheet');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });
});
