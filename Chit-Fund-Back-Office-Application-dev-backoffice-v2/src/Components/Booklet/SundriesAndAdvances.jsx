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

const SundriesAndAdvances = () => {
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
    <>
      <TableContainerWithBorder>
        <Table sx={{ minWidth: "auto", overflowX: "auto" }}>
          <TableHead>
            {/* Main Headings */}
            <VoucherTableHeadRow>
              <TableHeadCell rowSpan={2}>Sr. No.</TableHeadCell>
              <TableHeadCell rowSpan={2}>Employee name</TableHeadCell>

              {/* Grouped Headings */}
              <TableHeadCell colSpan={2} align="center">
                EB deposit
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Telephone deposit
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Rent advance
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Prepaid advance
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Vehicle recovery advances
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Sundry creditors
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Sundry debtors
              </TableHeadCell>
              <TableHeadCell rowSpan={2}>On account of</TableHeadCell>
            </VoucherTableHeadRow>

            {/* Sub Headings */}
            <VoucherTableHeadRow>
              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>
              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>
              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>
              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>
              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>
              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>
              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>
            </VoucherTableHeadRow>
          </TableHead>

          <TableBody>
            {tableData.map((row, idx) => (
              <VoucherTableBodyRow key={idx}>
                <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
                <TableBodyCell>{row.employeeName || "-"}</TableBodyCell>

                <TableBodyCell>{row.ebDepositCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.ebDepositDebit || "-"}</TableBodyCell>

                <TableBodyCell>
                  {row.telephoneDepositCredit || "-"}
                </TableBodyCell>
                <TableBodyCell>
                  {row.telephoneDepositDebit || "-"}
                </TableBodyCell>

                <TableBodyCell>{row.rentAdvanceCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.rentAdvanceDebit || "-"}</TableBodyCell>

                <TableBodyCell>{row.prepaidAdvanceCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.prepaidAdvanceDebit || "-"}</TableBodyCell>

                <TableBodyCell>
                  {row.vehicleRecoveryCredit || "-"}
                </TableBodyCell>
                <TableBodyCell>{row.vehicleRecoveryDebit || "-"}</TableBodyCell>

                <TableBodyCell>
                  {row.sundryCreditorsCredit || "-"}
                </TableBodyCell>
                <TableBodyCell>{row.sundryCreditorsDebit || "-"}</TableBodyCell>

                <TableBodyCell>{row.sundryDebtorsCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.sundryDebtorsDebit || "-"}</TableBodyCell>

                <TableBodyCell>{row.onAccountOf || "-"}</TableBodyCell>
              </VoucherTableBodyRow>
            ))}

            {/* Totals Row */}
            <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
              <TableBodyCell colSpan={2} />
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.ebDeposit ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.telephoneDeposit ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.rentAdvance ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.prepaidAdvance ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.vehicleRecovery ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.sundryCreditors ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.sundryDebtors ?? 0}
              </TableBodyCell>
              <TableBodyCell />
            </VoucherTableBodyRow>
          </TableBody>
        </Table>
      </TableContainerWithBorder>

      <TableContainerWithBorder>
        <Table sx={{ minWidth: "auto", overflowX: "auto" }}>
          <TableHead>
            {/* Main Headings */}
            <VoucherTableHeadRow>
              <TableHeadCell rowSpan={2}>Sr. No.</TableHeadCell>
              <TableHeadCell rowSpan={2}>Items</TableHeadCell>

              {/* Grouped Headings */}
              <TableHeadCell colSpan={2} align="center">
                Decree advances
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Advocate advances
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                A/C advances
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Vehicle advance
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Court advances
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Press advances
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Staff misappropriation A/C
              </TableHeadCell>

              <TableHeadCell rowSpan={2}>On account of</TableHeadCell>
            </VoucherTableHeadRow>

            {/* Sub Headings */}
            <VoucherTableHeadRow>
              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>

              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>

              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>

              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>

              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>

              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>

              <TableHeadCell>Credit</TableHeadCell>
              <TableHeadCell>Debit</TableHeadCell>
            </VoucherTableHeadRow>
          </TableHead>

          <TableBody>
            {tableData.map((row, idx) => (
              <VoucherTableBodyRow key={idx}>
                <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
                <TableBodyCell>{row.items || "-"}</TableBodyCell>

                <TableBodyCell>{row.decreeCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.decreeDebit || "-"}</TableBodyCell>

                <TableBodyCell>{row.advocateCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.advocateDebit || "-"}</TableBodyCell>

                <TableBodyCell>{row.acCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.acDebit || "-"}</TableBodyCell>

                <TableBodyCell>{row.vehicleCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.vehicleDebit || "-"}</TableBodyCell>

                <TableBodyCell>{row.courtCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.courtDebit || "-"}</TableBodyCell>

                <TableBodyCell>{row.pressCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.pressDebit || "-"}</TableBodyCell>

                <TableBodyCell>{row.staffMisCredit || "-"}</TableBodyCell>
                <TableBodyCell>{row.staffMisDebit || "-"}</TableBodyCell>

                <TableBodyCell>{row.onAccountOf || "-"}</TableBodyCell>
              </VoucherTableBodyRow>
            ))}

            {/* Totals Row */}
            <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
              <TableBodyCell colSpan={2} />
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.decree ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.advocate ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.ac ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.vehicle ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.court ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.press ?? 0}
              </TableBodyCell>
              <TableBodyCell colSpan={2}>
                Total: {finalTotalData?.staffMis ?? 0}
              </TableBodyCell>
              <TableBodyCell />
            </VoucherTableBodyRow>
          </TableBody>
        </Table>
      </TableContainerWithBorder>
    </>
  );
};
export default SundriesAndAdvances;
