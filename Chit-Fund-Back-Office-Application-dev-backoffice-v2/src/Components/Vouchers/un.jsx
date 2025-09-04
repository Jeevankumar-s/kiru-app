import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "branchName", headerName: "Branch name", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "receiptNo", headerName: "Your/Rcpt no", width: 130 },
  { field: "series", headerName: "Series", width: 100 },
  { field: "head", headerName: "Head", width: 130 },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    valueFormatter: (params) =>
      `₹ ${Number(params.value).toLocaleString("en-IN")}`,
  },
  { field: "description", headerName: "Description", width: 130 },
  { field: "creditDebit", headerName: "Credit/debit", width: 100 },
  { field: "transType", headerName: "Trans.type", width: 100 },
];

const rows = [
  {
    id: 1,
    branchName: "-",
    date: "12 Jun 2025",
    receiptNo: "45679",
    series: "Advice",
    head: "MLZ225/48",
    amount: 1200,
    description: "Coimbatore",
    creditDebit: "Credit",
    transType: "Receipt",
  },
  {
    id: 2,
    branchName: "-",
    date: "12 Jun 2025",
    receiptNo: "45679",
    series: "Advice",
    head: "MLZ225/48",
    amount: 1200,
    description: "Coimbatore",
    creditDebit: "Credit",
    transType: "Receipt",
  },
  {
    id: 3,
    branchName: "-",
    date: "",
    receiptNo: "45670",
    series: "Advice",
    head: "-",
    amount: 1500,
    description: "Coimbatore",
    creditDebit: "Debit",
    transType: "Receipt",
  },
];

export default function ReceiptTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
