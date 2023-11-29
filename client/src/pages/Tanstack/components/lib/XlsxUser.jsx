import xlsx from 'json-as-xlsx';
// import { people } from "@/people";
// import { Data } from '../../Data';

export function DownloadToExcel(data) {
  let columns = [
    {
      // sheet: "Persons",
      sheet: 'Transaction',
      columns: [
        { label: ' TxId', value: 'orderNo' },
        { label: 'From', value: (row) => row.fToken.symbol.toUpperCase() },
        { label: 'From Value', value: 'fValue' },
        { label: 'To', value: (row) => row.tToken.symbol.toUpperCase() },
        { label: 'To Value', value: 'tValue' },
        { label: 'Blendery', value: 'blenderyAddress' },
        { label: 'User', value: 'userAddress' },
        { label: 'Status', value: 'status' },
      ],
      // content: people,
      content: data,
    },
  ];

  let settings = {
    fileName: 'Transaction Excel',
  };

  xlsx(columns, settings);
}
