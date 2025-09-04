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

const GroupWarChitControl = () => {
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
      <Table sx={{ minWidth: "auto", overflowX: "auto" }}>
        <TableHead>
          {/* Main Headings */}
          <VoucherTableHeadRow>
            <TableHeadCell rowSpan={2}>Sr. No.</TableHeadCell>

            {/* Particulars of group commenced */}
            <TableHeadCell colSpan={5} align="center">
              Particulars of group commenced
            </TableHeadCell>

            <TableHeadCell rowSpan={2}>
              Subscription per instalment
            </TableHeadCell>

            {/* PSO registration particulars */}
            <TableHeadCell colSpan={3} align="center">
              PSO registration particulars
            </TableHeadCell>

            {/* Chit agreement registration particulars */}
            <TableHeadCell colSpan={4} align="center">
              Chit agreement registration particulars
            </TableHeadCell>

            <TableHeadCell rowSpan={2}>Date of commencement</TableHeadCell>
            <TableHeadCell rowSpan={2}>Remark</TableHeadCell>
          </VoucherTableHeadRow>

          {/* Sub Headings */}
          <VoucherTableHeadRow>
            {/* Particulars of group commenced */}
            <TableHeadCell>Chit group</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Members</TableHeadCell>
            <TableHeadCell>Value</TableHeadCell>
            <TableHeadCell>Duration in months</TableHeadCell>

            {/* PSO registration particulars */}
            <TableHeadCell>D.R. office</TableHeadCell>
            <TableHeadCell>Date of order</TableHeadCell>
            <TableHeadCell>Order no</TableHeadCell>

            {/* Chit agreement registration particulars */}
            <TableHeadCell>Register office</TableHeadCell>
            <TableHeadCell>Date of agreement</TableHeadCell>
            <TableHeadCell>No</TableHeadCell>
            <TableHeadCell>Year</TableHeadCell>
          </VoucherTableHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row, idx) => (
            <VoucherTableBodyRow key={idx}>
              <TableBodyCell>{row.srNo || "-"}</TableBodyCell>

              {/* Particulars of group commenced */}
              <TableBodyCell>{row.chitGroup || "-"}</TableBodyCell>
              <TableBodyCell>{row.category || "-"}</TableBodyCell>
              <TableBodyCell>{row.members || "-"}</TableBodyCell>
              <TableBodyCell>{row.value || "-"}</TableBodyCell>
              <TableBodyCell>{row.durationInMonths || "-"}</TableBodyCell>

              <TableBodyCell>{row.subscription || "-"}</TableBodyCell>

              {/* PSO registration particulars */}
              <TableBodyCell>{row.drOffice || "-"}</TableBodyCell>
              <TableBodyCell>{row.dateOfOrder || "-"}</TableBodyCell>
              <TableBodyCell>{row.orderNo || "-"}</TableBodyCell>

              {/* Chit agreement registration particulars */}
              <TableBodyCell>{row.registerOffice || "-"}</TableBodyCell>
              <TableBodyCell>{row.dateOfAgreement || "-"}</TableBodyCell>
              <TableBodyCell>{row.no || "-"}</TableBodyCell>
              <TableBodyCell>{row.year || "-"}</TableBodyCell>

              <TableBodyCell>{row.dateOfCommencement || "-"}</TableBodyCell>
              <TableBodyCell>{row.remark || "-"}</TableBodyCell>
            </VoucherTableBodyRow>
          ))}
        </TableBody>
      </Table>
    </TableContainerWithBorder>
  );
};
export default GroupWarChitControl;
