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
  {
    srNo: 7,
    head: "Branches",
    credit: 150000,
    debit: 150000,
    remark: "Head office fund",
  },
  {
    srNo: 8,
    head: "Branches",
    credit: 180000,
    debit: 180000,
    remark: "Fund transfer",
  },
  {
    srNo: 9,
    head: "Branches",
    credit: 95000,
    debit: 95000,
    remark: "Expense recovery",
  },
  {
    srNo: 10,
    head: "Stamps",
    credit: 25000,
    debit: 25000,
    remark: "Stamp duty",
  },
  {
    srNo: 11,
    head: "Profit & Loss A/c",
    credit: 220000,
    debit: 220000,
    remark: "Closing balance",
  },
  {
    srNo: 12,
    head: "Cash",
    credit: 50000,
    debit: 70000,
    remark: "Cash settlement",
  },
];

const columns = [
  {
    field: "heads",
    headerName: "Heads",
    width: 200,
  },
  {
    field: "credit",
    headerName: "Credit",
    width: 200,
  },
  {
    field: "debit",
    headerName: "Debit",
    width: 200,
  },
  {
    field: "remark",
    headerName: "Remark",
    width: 200,
  },
];

const rows = [
  {
    id: 1,
    heads: "MLZ225/48",
    credit: 1200,
    debit: 1200,
    remark: "remark",
  },
  {
    id: 2,
    heads: "MLZ225/48",
    credit: 1200,
    debit: 1200,
    remark: "remark",
  },
];

const ParticularsOfEmoluments = () => {
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
      <Table>
        <TableHead>
          <VoucherTableHeadRow>
            <TableHeadCell>Sr. No.</TableHeadCell>
            <TableHeadCell>Service roll no</TableHeadCell>
            <TableHeadCell>Employee name</TableHeadCell>
            <TableHeadCell>Salary</TableHeadCell>
            <TableHeadCell>D.A</TableHeadCell>
            <TableHeadCell>HRA</TableHeadCell>
            <TableHeadCell>Bonus</TableHeadCell>
            <TableHeadCell>Branch business performance</TableHeadCell>
            <TableHeadCell>M chit business performance</TableHeadCell>
            <TableHeadCell>Business incentive</TableHeadCell>
            <TableHeadCell>Total amount paid</TableHeadCell>
            <TableHeadCell>E.P.F</TableHeadCell>
            <TableHeadCell>P tax</TableHeadCell>
            <TableHeadCell>L.I.C</TableHeadCell>
            <TableHeadCell>Total deduction</TableHeadCell>
            <TableHeadCell>Total after deduction</TableHeadCell>
          </VoucherTableHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row, idx) => (
            <VoucherTableBodyRow key={idx}>
              <TableBodyCell>{row?.srNo ?? "-"}</TableBodyCell>
              <TableBodyCell>{row?.serviceRollNo ?? "-"}</TableBodyCell>
              <TableBodyCell>{row?.employeeName ?? "-"}</TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.salary ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.da ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.hra ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.bonus ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.branchPerformance ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.mChitPerformance ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.businessIncentive ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.totalAmountPaid ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.epf ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.ptax ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.lic ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹ {Number(row?.totalDeduction ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
              <TableBodyCell>
                ₹{" "}
                {Number(row?.totalAfterDeduction ?? 0).toLocaleString("en-IN")}
              </TableBodyCell>
            </VoucherTableBodyRow>
          ))}

          {/* Totals Row */}
          <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
            <TableBodyCell
              colSpan={3}
              style={{ fontWeight: 500, textAlign: "center" }}
            >
              Total:
            </TableBodyCell>

            <TableBodyCell>
              ₹ {(finalTotalData?.salary ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹ {(finalTotalData?.da ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹ {(finalTotalData?.hra ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹ {(finalTotalData?.bonus ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹{" "}
              {(finalTotalData?.branchPerformance ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹{" "}
              {(finalTotalData?.mChitPerformance ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹{" "}
              {(finalTotalData?.businessIncentive ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹ {(finalTotalData?.totalAmountPaid ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹ {(finalTotalData?.epf ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹ {(finalTotalData?.ptax ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹ {(finalTotalData?.lic ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹ {(finalTotalData?.totalDeduction ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              ₹{" "}
              {(finalTotalData?.totalAfterDeduction ?? 0).toLocaleString(
                "en-IN"
              )}
            </TableBodyCell>
          </VoucherTableBodyRow>
        </TableBody>
      </Table>
    </TableContainerWithBorder>
  );
};
export default ParticularsOfEmoluments;
