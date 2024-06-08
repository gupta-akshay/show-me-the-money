import { Request, Response } from 'express';
import axios from 'axios';

const XERO_API_URL = process.env.XERO_API_URL || 'http://localhost:3000/api.xro/2.0/Reports/BalanceSheet';

export const getBalanceSheet = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(XERO_API_URL);
    res.json(response.data);
  } catch (error) {
    console.error('Error in getBalanceSheet:', error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const errorMessage = error.response?.data?.message || 'Failed to fetch balance sheet data';
      res.status(status).json({ error: errorMessage });
    } else {
      res.status(500).json({ error: 'Failed to fetch balance sheet data' });
    }
  }
};
