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
      <TableContainerWithBorder>
        <Table>
          <TableHead>
            {/* Main Headings */}
            <VoucherTableHeadRow>
              <TableHeadCell rowSpan={2}>Sr. No.</TableHeadCell>
              <TableHeadCell rowSpan={2}>Chit group</TableHeadCell>
              <TableHeadCell rowSpan={2}>Drawal</TableHeadCell>
              <TableHeadCell rowSpan={2}>Subscriber name</TableHeadCell>

              {/* Grouped Headings */}
              <TableHeadCell colSpan={3} align="center">
                Outstanding
              </TableHeadCell>
              <TableHeadCell colSpan={2} align="center">
                Unpaid
              </TableHeadCell>

              <TableHeadCell rowSpan={2}>
                Amount remitted by party
              </TableHeadCell>
            </VoucherTableHeadRow>

            {/* Sub Headings */}
            <VoucherTableHeadRow>
              <TableHeadCell>Prized money</TableHeadCell>
              <TableHeadCell>Kasar</TableHeadCell>
              <TableHeadCell>Total</TableHeadCell>
              <TableHeadCell>Commission</TableHeadCell>
              <TableHeadCell>Prize money</TableHeadCell>
            </VoucherTableHeadRow>
          </TableHead>

          <TableBody>
            {tableData.map((row, idx) => (
              <VoucherTableBodyRow key={idx}>
                <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
                <TableBodyCell>{row.chitGroup || "-"}</TableBodyCell>
                <TableBodyCell>{row.drawal || "1"}</TableBodyCell>
                <TableBodyCell>{row.subscriberName || "2"}</TableBodyCell>

                <TableBodyCell>{row.outstandingPrized || "3"}</TableBodyCell>
                <TableBodyCell>{row.outstandingKasar || "4"}</TableBodyCell>
                <TableBodyCell>{row.outstandingTotal || "5"}</TableBodyCell>

                <TableBodyCell>{row.unpaidCommission || "6"}</TableBodyCell>
                <TableBodyCell>{row.unpaidPrize || "7"}</TableBodyCell>

                <TableBodyCell>{row.amountRemitted || "8"}</TableBodyCell>
              </VoucherTableBodyRow>
            ))}

            <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
              <TableBodyCell colSpan={4} />
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
              <TableBodyCell sx={{ fontWeight: 500 }}>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  Total:{finalTotalData.debit.toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell sx={{ fontWeight: 500 }}>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  Total:{finalTotalData.debit.toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell sx={{ fontWeight: 500 }}>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  Total:{finalTotalData.debit.toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell />
            </VoucherTableBodyRow>
          </TableBody>
        </Table>
      </TableContainerWithBorder>

      <TableContainerWithBorder>
        <Table>
          <TableHead>
            <VoucherTableHeadRow>
              {["Sr. No.", "Abstract", "Credit", "Debit"].map((header) => (
                <TableHeadCell key={header}>{header}</TableHeadCell>
              ))}
            </VoucherTableHeadRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, idx) => (
              <VoucherTableBodyRow key={idx}>
                <TableBodyCell>{row.srNo}</TableBodyCell>
                <TableBodyCell>{row.abstract || "-"}</TableBodyCell>
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
