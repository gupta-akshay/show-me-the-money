import { FC, Fragment } from 'react';

interface BalanceSheetProps {
  rows: RowsEntity[];
}

const BalanceSheet: FC<BalanceSheetProps> = ({ rows }) => {
  const renderRows = (rows: RowsEntity[]) => {
    return rows.map((row, index) => {
      if (row.RowType === 'Header' || row.RowType === 'SummaryRow') {
        return (
          <tr key={index}>
            {row.Cells?.map((cell, cellIndex) => (
              <th key={cellIndex}>{cell.Value}</th>
            ))}
          </tr>
        );
      }
      if (row.RowType === 'Row') {
        return (
          <tr key={index}>
            {row.Cells?.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell.Value}</td>
            ))}
          </tr>
        );
      }
      if (row.RowType === 'Section') {
        console.log('section ---', row);
        return (
          <Fragment key={index}>
            <tr>
              <td colSpan={3}><strong>{row.Title}</strong></td>
            </tr>
            {renderRows(row.Rows || [])}
          </Fragment>
        );
      }
      return null;
    });
  };

  return (
    <table border={1}>
      <thead>
        {renderRows([rows[0]])}
      </thead>
      <tbody>
        {renderRows(rows.slice(1))}
      </tbody>
    </table>
  );
};

export default BalanceSheet;
