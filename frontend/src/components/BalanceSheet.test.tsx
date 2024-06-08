import { render, screen } from '@testing-library/react';
import BalanceSheet from './BalanceSheet';

const mockRows: RowsEntity[] = [
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
];

const emptySection: RowsEntity = {
  RowType: 'Section',
  Title: 'Empty Section',
  Rows: [],
};

const nestedSection: RowsEntity = {
  RowType: 'Section',
  Title: 'Nested Section',
  Rows: [
    {
      RowType: 'Section',
      Title: 'Subsection',
      Rows: [
        {
          RowType: 'Row',
          Cells: [
            { Value: 'Sub Item' },
            { Value: '100' },
            { Value: '200' },
          ],
        },
      ],
    },
  ],
};

describe('BalanceSheet Component', () => {
  test('renders balance sheet rows correctly', () => {
    render(<BalanceSheet rows={mockRows} />);

    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('08 June 2024')).toBeInTheDocument();
    expect(screen.getByText('09 June 2023')).toBeInTheDocument();
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('My Bank Account')).toBeInTheDocument();
    expect(screen.getByText('Total Bank')).toBeInTheDocument();
  });

  test('renders empty section without errors', () => {
    render(<BalanceSheet rows={[emptySection]} />);

    expect(screen.getByText('Empty Section')).toBeInTheDocument();
  });

  test('renders nested sections correctly', () => {
    render(<BalanceSheet rows={[nestedSection]} />);

    expect(screen.getByText('Nested Section')).toBeInTheDocument();
    expect(screen.getByText('Subsection')).toBeInTheDocument();
    expect(screen.getByText('Sub Item')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  test('renders without rows', () => {
    render(<BalanceSheet rows={[]} />);

    expect(screen.queryByText('Date')).not.toBeInTheDocument();
  });
});
