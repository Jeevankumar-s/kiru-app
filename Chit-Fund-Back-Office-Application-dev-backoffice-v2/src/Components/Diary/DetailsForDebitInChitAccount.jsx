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
import { Details } from "@mui/icons-material";

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

const DetailsForDebitInChitAccount = () => {
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
            <TableHeadCell rowSpan={2}>Subscriber name</TableHeadCell>
            <TableHeadCell rowSpan={2}>Cash/Cheque no</TableHeadCell>
            <TableHeadCell rowSpan={2}>Bank</TableHeadCell>
            <TableHeadCell rowSpan={2}>Auction no</TableHeadCell>

            {/* Actual amount paid group */}
            <TableHeadCell colSpan={4} align="center">
              Actual amount paid
            </TableHeadCell>

            {/* Adjustment if any group */}
            <TableHeadCell colSpan={2} align="center">
              Adjustment if any
            </TableHeadCell>

            <TableHeadCell rowSpan={2}>Grand total</TableHeadCell>
            <TableHeadCell rowSpan={2}>Narration</TableHeadCell>
            <TableHeadCell rowSpan={2}>AD sanction no</TableHeadCell>
          </VoucherTableHeadRow>

          {/* Sub Headings */}
          <VoucherTableHeadRow>
            {/* Paid Amount group */}
            <TableHeadCell>Paid amount</TableHeadCell>
            <TableHeadCell>Commission</TableHeadCell>
            <TableHeadCell>GST/CGST/SGST</TableHeadCell>
            <TableHeadCell>IGST</TableHeadCell>
            <TableHeadCell>Dividend</TableHeadCell>
            <TableHeadCell>Future call</TableHeadCell>
          </VoucherTableHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row, idx) => (
            <VoucherTableBodyRow key={idx}>
              <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.chitGroup || "-"}</TableBodyCell>
              <TableBodyCell>{row.subscriberName || "-"}</TableBodyCell>
              <TableBodyCell>{row.cashChequeNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.bank || "-"}</TableBodyCell>
              <TableBodyCell>{row.auctionNo || "-"}</TableBodyCell>

              {/* Paid Amount */}
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.commission ?? 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>

              {/* Actual Amount Paid */}
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.gst ?? 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.igst ?? 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.other ?? 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>

              {/* Adjustment if any */}
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.dividend ?? 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.futureCall ?? 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>

              {/* Grand total */}
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  <LuIndianRupee style={{ marginRight: 4, fontSize: "13px" }} />
                  {Number(row.grandTotal ?? 0).toLocaleString("en-IN")}
                </RupeeFieldContainerInTable>
              </TableBodyCell>

              <TableBodyCell>{row.narration || "-"}</TableBodyCell>
              <TableBodyCell>{row.adSanctionNo || "-"}</TableBodyCell>
            </VoucherTableBodyRow>
          ))}

          {/* Totals Row */}
          <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
            <TableBodyCell colSpan={6} />

            {/* Totals for Paid amount */}
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />
                {(finalTotalData?.commission ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>

            {/* Totals for Actual amount paid */}
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />{" "}
                {(finalTotalData?.gst ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />
                {(finalTotalData?.igst ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />
                {(finalTotalData?.other ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>

            {/* Totals for Adjustments */}
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />{" "}
                {(finalTotalData?.dividend ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />
                {(finalTotalData?.futureCall ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>

            {/* Totals for Grand Total */}
            <TableBodyCell>
              <RupeeFieldContainerInTable>
                Total:{" "}
                <LuIndianRupee
                  style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
                />
                {(finalTotalData?.grandTotal ?? 0).toLocaleString("en-IN")}
              </RupeeFieldContainerInTable>
            </TableBodyCell>

            <TableBodyCell />
            <TableBodyCell />
          </VoucherTableBodyRow>
        </TableBody>
      </Table>
    </TableContainerWithBorder>
  );
};
export default DetailsForDebitInChitAccount;
