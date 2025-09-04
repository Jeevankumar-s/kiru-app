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

const Credit = () => {
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
            <TableHeadCell>Sr. No.</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Branch</TableHeadCell>
            <TableHeadCell>Investments</TableHeadCell>
            <TableHeadCell>Banks</TableHeadCell>
            <TableHeadCell>Other items</TableHeadCell>
            <TableHeadCell>Forman chits</TableHeadCell>
            <TableHeadCell>Decree debtors</TableHeadCell>
            <TableHeadCell>Advances</TableHeadCell>
            <TableHeadCell>Stamps</TableHeadCell>
            <TableHeadCell>P & L</TableHeadCell>
            <TableHeadCell>Cash</TableHeadCell>
            <TableHeadCell>Credit</TableHeadCell>
          </VoucherTableHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row, idx) => (
            <VoucherTableBodyRow key={idx}>
              <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.date || "-"}</TableBodyCell>
              <TableBodyCell>{row.branch || "-"}</TableBodyCell>
              <TableBodyCell>{row.investments || "-"}</TableBodyCell>
              <TableBodyCell>{row.banks || "-"}</TableBodyCell>
              <TableBodyCell>{row.otherItems || "-"}</TableBodyCell>
              <TableBodyCell>{row.formanChits || "-"}</TableBodyCell>
              <TableBodyCell>{row.decreeDebtors || "-"}</TableBodyCell>
              <TableBodyCell>{row.advances || "-"}</TableBodyCell>
              <TableBodyCell>{row.stamps || "-"}</TableBodyCell>
              <TableBodyCell>{row.pnl || "-"}</TableBodyCell>
              <TableBodyCell>
                {row.cash ? `₹ ${row.cash.toLocaleString("en-IN")}` : "-"}
              </TableBodyCell>
              <TableBodyCell>
                {row.credit ? `₹ ${row.credit.toLocaleString("en-IN")}` : "-"}
              </TableBodyCell>
            </VoucherTableBodyRow>
          ))}

          {/* Totals Row */}
          <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
            <TableBodyCell colSpan={10} />
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />
                {(finalTotalData?.pnl ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />
                {(finalTotalData?.cash ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />
                {(finalTotalData?.credit ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
          </VoucherTableBodyRow>
        </TableBody>
      </Table>
    </TableContainerWithBorder>
  );
};
export default Credit;
