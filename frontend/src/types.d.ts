interface BalanceSheetResponse {
  Status: string;
  Reports?: ReportsEntity[] | null;
}

interface ReportsEntity {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: string[];
  ReportDate: string;
  UpdatedDateUTC: string;
  Fields: any[];
  Rows: RowsEntity[];
}

interface RowsEntity {
  RowType: string;
  Cells?: CellsEntity[];
  Title?: string;
  Rows?: RowsEntity[];
}

interface CellsEntity {
  Value: string;
  Attributes?: AttributesEntity[];
}

interface AttributesEntity {
  Value: string;
  Id: string;
}
