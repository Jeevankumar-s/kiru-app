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
        <TableHeadCell rowSpan={2}>Chit group</TableHeadCell>
        <TableHeadCell rowSpan={2}>Inst. no</TableHeadCell>
        <TableHeadCell rowSpan={2}>Call amount</TableHeadCell>

        {/* Drawal */}
        <TableHeadCell colSpan={3} align="center">
          Drawal
        </TableHeadCell>

        <TableHeadCell rowSpan={2}>Chit agreement no.</TableHeadCell>
        <TableHeadCell rowSpan={2}>Commission</TableHeadCell>
      </VoucherTableHeadRow>

      {/* Sub Headings */}
      <VoucherTableHeadRow>
        <TableHeadCell>Date</TableHeadCell>
        <TableHeadCell>Day</TableHeadCell>
        <TableHeadCell>Time</TableHeadCell>
      </VoucherTableHeadRow>
    </TableHead>

    <TableBody>
      {tableData.map((row, idx) => (
        <VoucherTableBodyRow key={idx}>
          <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
          <TableBodyCell>{row.chitGroup || "-"}</TableBodyCell>
          <TableBodyCell>{row.instNo || "-"}</TableBodyCell>
          <TableBodyCell>
            <RupeeFieldContainerInTable>
              <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
              {row.callAmount?.toLocaleString("en-IN") || "0"}
            </RupeeFieldContainerInTable>
          </TableBodyCell>

          {/* Drawal */}
          <TableBodyCell>{row.date || "-"}</TableBodyCell>
          <TableBodyCell>{row.day || "-"}</TableBodyCell>
          <TableBodyCell>{row.time || "-"}</TableBodyCell>

          <TableBodyCell>{row.chitAgreementNo || "-"}</TableBodyCell>

          <TableBodyCell>
            <RupeeFieldContainerInTable>
              <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
              {row.commission?.toLocaleString("en-IN") || "0"}
            </RupeeFieldContainerInTable>
          </TableBodyCell>
        </VoucherTableBodyRow>
      ))}

      {/* Totals Row */}
      <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
        <TableBodyCell colSpan={3} />
        <TableBodyCell>
          <RupeeFieldContainerInTable>
            <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
            Total: {(finalTotalData?.callAmount ?? 0).toLocaleString("en-IN")}
          </RupeeFieldContainerInTable>
        </TableBodyCell>
        <TableBodyCell colSpan={3} />
        <TableBodyCell />
        <TableBodyCell>
          <RupeeFieldContainerInTable>
            <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
            Total: {(finalTotalData?.commission ?? 0).toLocaleString("en-IN")}
          </RupeeFieldContainerInTable>
        </TableBodyCell>
      </VoucherTableBodyRow>
    </TableBody>
  </Table>
</TableContainerWithBorder>

  );
};
export default GroupWarChitControl;
