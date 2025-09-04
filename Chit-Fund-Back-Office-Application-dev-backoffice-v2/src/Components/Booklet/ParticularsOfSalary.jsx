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

const ParticularsOfSalary = () => {
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
            <TableHeadCell rowSpan={2}>Service roll no</TableHeadCell>
            <TableHeadCell rowSpan={2}>Employee name</TableHeadCell>
            <TableHeadCell rowSpan={2}>Designation</TableHeadCell>

            {/* Rate of emoluments */}
            <TableHeadCell colSpan={3} align="center">
              Rate of emoluments
            </TableHeadCell>

            {/* Emoluments paid */}
            <TableHeadCell colSpan={4} align="center">
              Emoluments paid
            </TableHeadCell>

            {/* Deductions */}
            <TableHeadCell colSpan={5} align="center">
              Deductions
            </TableHeadCell>

            <TableHeadCell rowSpan={2}>Total amount paid</TableHeadCell>
          </VoucherTableHeadRow>

          {/* Sub Headings */}
          <VoucherTableHeadRow>
            {/* Rate of emoluments */}
            <TableHeadCell>Salary</TableHeadCell>
            <TableHeadCell>DA</TableHeadCell>
            <TableHeadCell>HRA</TableHeadCell>

            {/* Emoluments paid */}
            <TableHeadCell>Salary</TableHeadCell>
            <TableHeadCell>DA</TableHeadCell>
            <TableHeadCell>HRA</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>

            {/* Deductions */}
            <TableHeadCell>EPF</TableHeadCell>
            <TableHeadCell>PF Loan</TableHeadCell>
            <TableHeadCell>ESI</TableHeadCell>
            <TableHeadCell>Other</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
          </VoucherTableHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row, idx) => (
            <VoucherTableBodyRow key={idx}>
              <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.serviceRollNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.employeeName || "-"}</TableBodyCell>
              <TableBodyCell>{row.designation || "-"}</TableBodyCell>

              {/* Rate of emoluments */}
              <TableBodyCell>{row.salaryRate || "₹ 0"}</TableBodyCell>
              <TableBodyCell>{row.daRate || "₹ 0"}</TableBodyCell>
              <TableBodyCell>{row.hraRate || "₹ 0"}</TableBodyCell>

              {/* Emoluments paid */}
              <TableBodyCell>{row.salaryPaid || "₹ 0"}</TableBodyCell>
              <TableBodyCell>{row.daPaid || "₹ 0"}</TableBodyCell>
              <TableBodyCell>{row.hraPaid || "₹ 0"}</TableBodyCell>
              <TableBodyCell>{row.emolumentsTotal || "₹ 0"}</TableBodyCell>

              {/* Deductions */}
              <TableBodyCell>{row.epf || "₹ 0"}</TableBodyCell>
              <TableBodyCell>{row.pfLoan || "₹ 0"}</TableBodyCell>
              <TableBodyCell>{row.esi || "₹ 0"}</TableBodyCell>
              <TableBodyCell>{row.otherDeduction || "₹ 0"}</TableBodyCell>
              <TableBodyCell>{row.deductionTotal || "₹ 0"}</TableBodyCell>

              <TableBodyCell>{row.totalAmountPaid || "₹ 0"}</TableBodyCell>
            </VoucherTableBodyRow>
          ))}

          {/* Totals Row */}
          <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
            <TableBodyCell colSpan={15} />
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                Total:{" "}
                {(finalTotalData?.totalAmountPaid ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
          </VoucherTableBodyRow>
        </TableBody>
      </Table>
    </TableContainerWithBorder>
  );
};
export default ParticularsOfSalary;
