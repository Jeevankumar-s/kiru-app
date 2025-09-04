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

const BPPForMChitsAndOtherBranches = () => {
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
            <TableHeadCell rowSpan={2}>Months</TableHeadCell>

            {/* Grouped Heading */}
            <TableHeadCell colSpan={5} align="center">
              Details of chits enlisted
            </TableHeadCell>

            <TableHeadCell rowSpan={2}>Paid</TableHeadCell>
            <TableHeadCell rowSpan={2}>Balance payable</TableHeadCell>
            <TableHeadCell rowSpan={2}>Name of staff</TableHeadCell>
            <TableHeadCell rowSpan={2}>Total paid</TableHeadCell>
            <TableHeadCell rowSpan={2}>Admin office sanction no</TableHeadCell>
          </VoucherTableHeadRow>

          {/* Sub Headings */}
          <VoucherTableHeadRow>
            <TableHeadCell>Chit group</TableHeadCell>
            <TableHeadCell>Subscriber</TableHeadCell>
            <TableHeadCell>Total tickets</TableHeadCell>
            <TableHeadCell>Value</TableHeadCell>
            <TableHeadCell>Payable</TableHeadCell>
          </VoucherTableHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row, idx) => (
            <VoucherTableBodyRow key={idx}>
              <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.months || "-"}</TableBodyCell>

              {/* Details of chits enlisted */}
              <TableBodyCell>{row.chitGroup || "-"}</TableBodyCell>
              <TableBodyCell>{row.subscriber || "-"}</TableBodyCell>
              <TableBodyCell>{row.totalTickets || "-"}</TableBodyCell>

              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.value || 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>

              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.payable || 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>

              {/* Paid */}
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.paid || 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>

              {/* Balance payable */}
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.balancePayable || 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>

              {/* Name of staff */}
              <TableBodyCell>{row.nameOfStaff || "-"}</TableBodyCell>

              {/* Total paid */}
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.totalPaid || 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>

              {/* Admin office */}
              <TableBodyCell>{row.adminOffice || "-"}</TableBodyCell>
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
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                Total: {(finalTotalData?.payable ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                Total: {(finalTotalData?.paid ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                Total:{" "}
                {(finalTotalData?.balancePayable ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell />
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                Total:{" "}
                {(finalTotalData?.totalPaid ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell />
          </VoucherTableBodyRow>
        </TableBody>
      </Table>
    </TableContainerWithBorder>
  );
};
export default BPPForMChitsAndOtherBranches;
