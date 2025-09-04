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

const DrawlsAndPrizedMoneyRegister = () => {
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
      <Table sx={{ width: "125%", overflowX: "auto" }}>
        <TableHead>
          <VoucherTableHeadRow>
            <TableHeadCell rowSpan={2}>Sr. No.</TableHeadCell>
            <TableHeadCell rowSpan={2}>Payment date</TableHeadCell>
            <TableHeadCell rowSpan={2}>Chit no</TableHeadCell>
            <TableHeadCell rowSpan={2}>Inst. no</TableHeadCell>
            <TableHeadCell rowSpan={2}>Auction date</TableHeadCell>
            <TableHeadCell rowSpan={2}>Chit amount</TableHeadCell>
            <TableHeadCell rowSpan={2}>Subscriber name</TableHeadCell>
            <TableHeadCell rowSpan={2}>Prized money</TableHeadCell>
            <TableHeadCell rowSpan={2}>Form sent for approval on</TableHeadCell>

            {/* A.O Sanction with sub columns */}
            <TableHeadCell colSpan={2} align="center">
              A.O. Sanction
            </TableHeadCell>

            <TableHeadCell rowSpan={2}>Guarantor name</TableHeadCell>
            <TableHeadCell rowSpan={2}>Document no</TableHeadCell>
            <TableHeadCell rowSpan={2}>In favour of</TableHeadCell>
          </VoucherTableHeadRow>

          <VoucherTableHeadRow>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>No</TableHeadCell>
          </VoucherTableHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row, idx) => (
            <VoucherTableBodyRow key={idx}>
              <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.paymentDate || "-"}</TableBodyCell>
              <TableBodyCell>{row.chitNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.instNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.auctionDate || "-"}</TableBodyCell>
              <TableBodyCell>{row.chitAmount || "-"}</TableBodyCell>
              <TableBodyCell>{row.subscriberName || "-"}</TableBodyCell>
              <TableBodyCell>{row.prizedMoney || "-"}</TableBodyCell>
              <TableBodyCell>{row.formSentDate || "-"}</TableBodyCell>
              <TableBodyCell>{row.aoSanctionDate || "-"}</TableBodyCell>
              <TableBodyCell>{row.aoSanctionNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.guarantorName || "-"}</TableBodyCell>
              <TableBodyCell>{row.documentNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.inFavourOf || "-"}</TableBodyCell>
            </VoucherTableBodyRow>
          ))}

          {/* Totals Row */}
          <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
            <TableBodyCell colSpan={5} />
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />
                {(finalTotalData?.chitAmount ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell />
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />
                {(finalTotalData?.prizedMoney ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell colSpan={6} />
          </VoucherTableBodyRow>
        </TableBody>
      </Table>
    </TableContainerWithBorder>
  );
};
export default DrawlsAndPrizedMoneyRegister;
