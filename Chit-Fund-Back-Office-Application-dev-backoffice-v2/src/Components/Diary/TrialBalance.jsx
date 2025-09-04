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

const TwelveHeads = () => {
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
    <Box>
      {/* <Box>
         <Box sx={{ height: 400, maxWidth: { xs: "100%", md: "1000px" } }}>
           <DataGrid
             rows={rows}
             columns={columns}
             disableRowSelectionOnClick
             hideFooterPagination={true}
             hideFooter={true}
             sx={{
               "& .MuiDataGrid-cell": {
                 borderRight: "1px solid #e0e0e0",
               },
               "& .MuiDataGrid-columnHeaders": {
                 borderRight: "1px solid #e0e0e0",
                 backgroundColor: "#f5f5f5", // Light grey background for headers
                 borderBottom: "2px solid #e0e0e0",
               },
               "& .MuiDataGrid-columnHeader": {
                 backgroundColor: "#f5f5f5", // Light grey background for individual headers
               },
               "& .MuiDataGrid-row": {
                 "&:nth-of-type(odd)": {
                   backgroundColor: "#ffffff", // White background for odd rows
                 },
                 "&:nth-of-type(even)": {
                   backgroundColor: "#f5f5f5", // Light grey background for even rows
                 },
               },
             }}
           />
         </Box>
       </Box> */}
      <TableContainerWithBorder>
        <Table>
          <TableHead>
            <VoucherTableHeadRow>
              {["Sr. No.", "Heads", "Credit", "Debit"].map((header) => (
                <TableHeadCell key={header}>{header}</TableHeadCell>
              ))}
            </VoucherTableHeadRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, idx) => (
              <VoucherTableBodyRow key={idx}>
                <TableBodyCell>{row.srNo}</TableBodyCell>
                <TableBodyCell>{row.head || "-"}</TableBodyCell>
                <TableBodyCell>
                  <RupeeFieldContainerInTable>
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        fontSize: "13px", // Optional: Adjust icon size if needed
                      }}
                    />
                    {Number(row.credit).toLocaleString("en-IN")}
                  </RupeeFieldContainerInTable>
                </TableBodyCell>

                <TableBodyCell>
                  <RupeeFieldContainerInTable>
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        fontSize: "13px",
                      }}
                    />
                    {Number(row.debit).toLocaleString("en-IN")}
                  </RupeeFieldContainerInTable>
                </TableBodyCell>
              </VoucherTableBodyRow>
            ))}
            <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
              <TableBodyCell colSpan={2} />
              <TableBodyCell style={{ fontWeight: 500, textAlign: "right" }}>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  Total:{finalTotalData.credit.toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>

              <TableBodyCell sx={{ fontWeight: 500 }}>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  Total:{finalTotalData.debit.toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
            </VoucherTableBodyRow>
          </TableBody>
        </Table>
      </TableContainerWithBorder>
    </Box>
  );
};
export default TwelveHeads;
