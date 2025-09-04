import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Checkbox,
  Menu,
  MenuItem,
  Popover,
  Avatar,
  InputAdornment,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardContent,
  FormControl,
  Chip,
  RadioGroup,
  Autocomplete,
} from "@mui/material";
import { LuIndianRupee } from "react-icons/lu";

import {
  TableContainerWithBorder,
  VoucherTableHeadRow,
  TableHeadCell,
  VoucherTableBodyRow,
  TableBodyCell,
  RupeeFieldContainerInTable,
} from "../../StyledElement";
import { Delete } from "@mui/icons-material";

const tableData = [
  {
    srNo: 1,
    head: "Branches",
    credit: 120000,
    remark: "Inter-branch adj.",
    debit: 100000,
  },
  {
    srNo: 2,
    head: "Investments",
    credit: 250000,
    remark: "FD Maturity",
    debit: 250000,
  },
  {
    srNo: 3,
    head: "Banks",
    credit: 300000,
    debit: 280000,
    remark: "Bank transfer",
  },
  {
    srNo: 4,
    head: "Other items",
    credit: 75000,
    debit: 75000,
    remark: "Misc. expense",
  },
  {
    srNo: 5,
    head: "Chits",
    credit: 90000,
    debit: 90000,
    remark: "Chit payment",
  },
  {
    srNo: 6,
    head: "Company chits",
    credit: 60000,
    debit: 60000,
    remark: "Dividend adj.",
  },
];

const DeletedVouchers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finalTotalData, setFinalTotalData] = useState({
    credit: 0,
    debit: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getVoucherList("12 heads", 1, 10);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainerWithBorder>
      <Table sx={{ width: "100%", overflowX: "auto" }}>
        <TableHead>
          <VoucherTableHeadRow>
            <TableHeadCell>Sr No.</TableHeadCell>
            <TableHeadCell>Branch name</TableHeadCell>
            <TableHeadCell>Chosen date</TableHeadCell>
            <TableHeadCell>Removed date</TableHeadCell>
            <TableHeadCell>Voucher no</TableHeadCell>
            <TableHeadCell>Transaction type</TableHeadCell>
            <TableHeadCell>Head</TableHeadCell>
            <TableHeadCell>Narration</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell>Series</TableHeadCell>
            <TableHeadCell>Received by</TableHeadCell>
            <TableHeadCell>Deleted by</TableHeadCell>
            <TableHeadCell>Delete reason</TableHeadCell>
          </VoucherTableHeadRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, idx) => (
            <VoucherTableBodyRow key={idx}>
              <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.branchName || "-"}</TableBodyCell>
              <TableBodyCell>{row.chosenDate || "-"}</TableBodyCell>
              <TableBodyCell>{row.removedDate || "-"}</TableBodyCell>
              <TableBodyCell>{row.voucherNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.transactionType || "-"}</TableBodyCell>
              <TableBodyCell>{row.head || "-"}</TableBodyCell>
              <TableBodyCell>{row.narration || "-"}</TableBodyCell>
              <TableBodyCell>
                {row.amount ? `₹ ${row.amount}` : "-"}
              </TableBodyCell>
              <TableBodyCell>{row.series || "-"}</TableBodyCell>
              <TableBodyCell>{row.receivedBy || "-"}</TableBodyCell>
              <TableBodyCell>{row.deletedBy || "-"}</TableBodyCell>
              <TableBodyCell>{row.deleteReason || "-"}</TableBodyCell>
            </VoucherTableBodyRow>
          ))}
          <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
            <TableBodyCell colSpan={8} />
            <TableBodyCell>Total: ₹ 0</TableBodyCell>
            <TableBodyCell />
            <TableBodyCell />
            <TableBodyCell />
            <TableBodyCell />
          </VoucherTableBodyRow>
        </TableBody>
      </Table>
    </TableContainerWithBorder>
  );
};
export default DeletedVouchers;
