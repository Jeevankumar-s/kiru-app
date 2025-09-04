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
            <TableHeadCell rowSpan={2}>Category</TableHeadCell>
            <TableHeadCell rowSpan={2}>Total members</TableHeadCell>
            <TableHeadCell rowSpan={2}>Instalment</TableHeadCell>
            <TableHeadCell rowSpan={2}>Value</TableHeadCell>

            {/* Grouped Headings */}
            <TableHeadCell colSpan={2} align="center">
              Date of
            </TableHeadCell>
            <TableHeadCell colSpan={9} align="center">
              Date of
            </TableHeadCell>

            <TableHeadCell colSpan={3} align="center">
              Chit agreement
            </TableHeadCell>
            <TableHeadCell rowSpan={2}>
              Date of <br /> submission of <br /> balance <br /> sheet
            </TableHeadCell>
          </VoucherTableHeadRow>

          {/* Sub Headings */}
          <VoucherTableHeadRow>
            <TableHeadCell>Commencement</TableHeadCell>
            <TableHeadCell>Termination</TableHeadCell>

            <TableHeadCell>F.D.R No</TableHeadCell>
            <TableHeadCell>Bank</TableHeadCell>
            <TableHeadCell>Place</TableHeadCell>
            <TableHeadCell>Commencement</TableHeadCell>
            <TableHeadCell>Maturity</TableHeadCell>

            <TableHeadCell>Rate of interest</TableHeadCell>
            <TableHeadCell>Period in months</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell>Maturity value</TableHeadCell>

            <TableHeadCell>Group</TableHeadCell>
            <TableHeadCell>Year</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
          </VoucherTableHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row, idx) => (
            <VoucherTableBodyRow key={idx}>
              <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.chitGroup || "-"}</TableBodyCell>
              <TableBodyCell>{row.category || "-"}</TableBodyCell>
              <TableBodyCell>{row.totalMembers || "-"}</TableBodyCell>
              <TableBodyCell>{row.instalment || "-"}</TableBodyCell>
              <TableBodyCell>{row.value || "-"}</TableBodyCell>

              {/* Date of */}
              <TableBodyCell>{row.commencement || "-"}</TableBodyCell>
              <TableBodyCell>{row.termination || "-"}</TableBodyCell>

              <TableBodyCell>{row.fdrNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.bank || "-"}</TableBodyCell>
              <TableBodyCell>{row.place || "-"}</TableBodyCell>

              {/* Date of */}
              <TableBodyCell>{row.dateCommencement || "-"}</TableBodyCell>
              <TableBodyCell>{row.dateMaturity || "-"}</TableBodyCell>

              <TableBodyCell>{row.rateOfInterest || "-"}</TableBodyCell>
              <TableBodyCell>{row.periodInMonths || "-"}</TableBodyCell>
              <TableBodyCell>{row.amount || "-"}</TableBodyCell>
              <TableBodyCell>{row.maturityValue || "-"}</TableBodyCell>

              {/* Chit Agreement */}
              <TableBodyCell>{row.group || "-"}</TableBodyCell>
              <TableBodyCell>{row.year || "-"}</TableBodyCell>
              <TableBodyCell>{row.agreementDate || "-"}</TableBodyCell>

              <TableBodyCell>{row.submissionDate || "-"}</TableBodyCell>
            </VoucherTableBodyRow>
          ))}

          {/* Totals Row */}
          <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
            <TableBodyCell colSpan={5} />
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                Total: {(finalTotalData?.value ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell colSpan={9} />
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                Total: {(finalTotalData?.amount ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell colSpan={5} />
          </VoucherTableBodyRow>
        </TableBody>
      </Table>
    </TableContainerWithBorder>
  );
};
export default GroupWarChitControl;
