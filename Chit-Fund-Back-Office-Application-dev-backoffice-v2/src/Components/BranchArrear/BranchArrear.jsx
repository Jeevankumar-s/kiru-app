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

const BranchArrear = () => {
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
      <Table sx={{ width: "130%", overflowX: "auto" }}>
        <TableHead>
          <VoucherTableHeadRow>
            <TableHeadCell>Sr. No.</TableHeadCell>
            <TableHeadCell>Chit group</TableHeadCell>
            <TableHeadCell>Ticket no</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Call no.</TableHeadCell>
            <TableHeadCell>Prized arrear</TableHeadCell>
            <TableHeadCell>N-P arrear</TableHeadCell>
            <TableHeadCell>Date of last realization</TableHeadCell>
            <TableHeadCell>Last amount collected</TableHeadCell>
            <TableHeadCell>Default interest collected</TableHeadCell>
            <TableHeadCell>Arrear realization date</TableHeadCell>
            <TableHeadCell>Arrear amount collected</TableHeadCell>
            <TableHeadCell>Mobile no</TableHeadCell>
          </VoucherTableHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row, idx) => (
            <VoucherTableBodyRow key={idx}>
              <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.chitGroup || "-"}</TableBodyCell>
              <TableBodyCell>{row.ticketNo || "-"}</TableBodyCell>
              <TableBodyCell>{row.name || "-"}</TableBodyCell>
              <TableBodyCell>{row.callNo || "-"}</TableBodyCell>
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  ₹{row.prizedArrear?.toLocaleString("en-IN") || "0"}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  ₹{row.npArrear?.toLocaleString("en-IN") || "0"}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell>{row.lastRealizationDate || "-"}</TableBodyCell>
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  ₹{row.lastAmountCollected?.toLocaleString("en-IN") || "0"}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  ₹
                  {row.defaultInterestCollected?.toLocaleString("en-IN") || "0"}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell>{row.arrearRealizationDate || "-"}</TableBodyCell>
              <TableBodyCell>
                <RupeeFieldContainerInTable>
                  ₹{row.arrearAmountCollected?.toLocaleString("en-IN") || "0"}
                </RupeeFieldContainerInTable>
              </TableBodyCell>
              <TableBodyCell>{row.mobileNo || "-"}</TableBodyCell>
            </VoucherTableBodyRow>
          ))}

          {/* Totals Row */}
          <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
            <TableBodyCell colSpan={5} />
            <TableBodyCell>
              Total: ₹
              {(finalTotalData?.prizedArrear ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell>
              Total: ₹{(finalTotalData?.npArrear ?? 0).toLocaleString("en-IN")}
            </TableBodyCell>
            <TableBodyCell />
            <TableBodyCell>
              Total: ₹
              {(finalTotalData?.lastAmountCollected ?? 0).toLocaleString(
                "en-IN"
              )}
            </TableBodyCell>
            <TableBodyCell>
              Total: ₹
              {(finalTotalData?.defaultInterestCollected ?? 0).toLocaleString(
                "en-IN"
              )}
            </TableBodyCell>
            <TableBodyCell />
            <TableBodyCell>
              Total: ₹
              {(finalTotalData?.arrearAmountCollected ?? 0).toLocaleString(
                "en-IN"
              )}
            </TableBodyCell>
            <TableBodyCell />
          </VoucherTableBodyRow>
        </TableBody>
      </Table>
    </TableContainerWithBorder>
  );
};
export default BranchArrear;
