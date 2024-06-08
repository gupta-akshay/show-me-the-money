import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';

const mock = new MockAdapter(axios);

const mockResponse: BalanceSheetResponse = {
  Status: 'OK',
  Reports: [
    {
      ReportID: 'BalanceSheet',
      ReportName: 'Balance Sheet',
      ReportType: 'BalanceSheet',
      ReportTitles: ['Balance Sheet', 'Demo Org', 'As at 08 June 2024'],
      ReportDate: '08 June 2024',
      UpdatedDateUTC: '/Date(1717837001379)/',
      Fields: [],
      Rows: [
        {
          RowType: 'Header',
          Cells: [
            { Value: 'Date' },
            { Value: '08 June 2024' },
            { Value: '09 June 2023' },
          ],
        },
        {
          RowType: 'Section',
          Title: 'Assets',
          Rows: [
            {
              RowType: 'Row',
              Cells: [
                { Value: 'My Bank Account' },
                { Value: '126.70' },
                { Value: '99.60' },
              ],
            },
          ],
        },
        {
          RowType: 'SummaryRow',
          Cells: [
            { Value: 'Total Bank' },
            { Value: '126.70' },
            { Value: '99.60' },
          ],
        },
      ],
    },
  ],
};

const emptyResponse: BalanceSheetResponse = {
  Status: 'OK',
  Reports: [
    {
      ReportID: 'BalanceSheet',
      ReportName: 'Balance Sheet',
      ReportType: 'BalanceSheet',
      ReportTitles: [],
      ReportDate: '',
      UpdatedDateUTC: '',
      Fields: [],
      Rows: [],
    },
  ],
};

describe('App Component', () => {
  beforeAll(() => {
    process.env.REACT_APP_API_URL = '/api/balance-sheet';
  });

  test('renders balance sheet data', async () => {
    mock.onGet(process.env.REACT_APP_API_URL).reply(200, mockResponse);

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('08 June 2024')).toBeInTheDocument();
      expect(screen.getByText('09 June 2023')).toBeInTheDocument();
      expect(screen.getByText('Assets')).toBeInTheDocument();
      expect(screen.getByText('My Bank Account')).toBeInTheDocument();
      expect(screen.getByText('Total Bank')).toBeInTheDocument();
    });
  });

  test('handles error state', async () => {
    mock.onGet(process.env.REACT_APP_API_URL).networkError();

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch balance sheet data')).toBeInTheDocument();
    });
  });

  test('handles empty data', async () => {
    mock.onGet(process.env.REACT_APP_API_URL).reply(200, emptyResponse);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
      expect(screen.queryByText('Date')).not.toBeInTheDocument();
    });
  });

  test('handles different report structures', async () => {
    const differentResponse: BalanceSheetResponse = {
      Status: 'OK',
      Reports: [
        {
          ReportID: 'BalanceSheet',
          ReportName: 'Balance Sheet',
          ReportType: 'BalanceSheet',
          ReportTitles: ['Balance Sheet', 'Demo Org', 'As at 08 June 2024'],
          ReportDate: '08 June 2024',
          UpdatedDateUTC: '/Date(1717837001379)/',
          Fields: [],
          Rows: [
            {
              RowType: 'Header',
              Cells: [
                { Value: 'Date' },
                { Value: '08 June 2024' },
                { Value: '09 June 2023' },
              ],
            },
            {
              RowType: 'Section',
              Title: 'Liabilities',
              Rows: [
                {
                  RowType: 'Row',
                  Cells: [
                    { Value: 'Credit Card' },
                    { Value: '500' },
                    { Value: '400' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    mock.onGet(process.env.REACT_APP_API_URL).reply(200, differentResponse);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('08 June 2024')).toBeInTheDocument();
      expect(screen.getByText('09 June 2023')).toBeInTheDocument();
      expect(screen.getByText('Liabilities')).toBeInTheDocument();
      expect(screen.getByText('Credit Card')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
      expect(screen.getByText('400')).toBeInTheDocument();
    });
  });
});
