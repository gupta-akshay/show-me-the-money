import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import BalanceSheet from './components/BalanceSheet';

const App: FC = () => {
  const [data, setData] = useState<RowsEntity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<BalanceSheetResponse>(import.meta.env.VITE_API_URL || '/api/balance-sheet');
        setData(response?.data?.Reports?.[0]?.Rows || []);
      } catch (e) {
        setError('Failed to fetch balance sheet data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Balance Sheet</h1>
      {data && <BalanceSheet rows={data} />}
    </div>
  );
};

export default App;
