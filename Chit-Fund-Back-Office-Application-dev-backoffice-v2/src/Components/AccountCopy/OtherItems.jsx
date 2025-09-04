import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableHead,
  MenuItem,
  FormControl,
} from "@mui/material";
import { LuIndianRupee } from "react-icons/lu";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";

import {
  TableContainerWithBorder,
  VoucherTableHeadRow,
  TableHeadCell,
  VoucherTableBodyRow,
  TableBodyCell,
  RupeeFieldContainerInTable,
  TopContainerForAllPages,
  FilledButton,
  TopModuleName,
  StyledPaper,
  InputLabelLead,
  LeadDataInput,
  VoucherInnerHeading,
  AccountCopyVioletContainerTypo,
  AccountCopyInnerHeadingContainer,
} from "../../StyledElement";

const tableData = [
  {
    srNo: 1,
    date: "21 May 2025",
    head: "-",
    narration: "-",
    credit: 0,
    debit: 80000,
  },
  {
    srNo: 2,
    date: "15 Sept 2025",
    head: "-",
    narration: "-",
    credit: 0,
    debit: 80000,
  },
  {
    srNo: 3,
    date: "15 Sept 2025",
    head: "-",
    narration: "-",
    credit: 0,
    debit: 80000,
  },
];

const scrollbarStyles = {
  maxHeight: 200,
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#DCDCDC",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  scrollbarWidth: "thin",
  scrollbarColor: "#DCDCDC transparent",
};

// Other items options
const otherItemOptions = [
  { id: 1, name: "EPF" },
  { id: 2, name: "ESI" },
  { id: 3, name: "Professional Tax" },
  { id: 4, name: "TDS" },
  { id: 5, name: "Office Expenses" },
  { id: 6, name: "Miscellaneous" },
];

const AccountCopyOtherItems = () => {
  const [selectedOtherItem, setSelectedOtherItem] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [finalTotalData] = useState({
    credit: 0,
    debit: 240000,
  });

  const fetchData = async () => {
    try {
      // Replace with actual API call for other items data
      // const response = await getAccountCopyOtherItems("other-items", 1, 10);
      // setData(response.data);
      console.log("Fetching other items data...");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
      <TopContainerForAllPages>
        <TopModuleName>Other items</TopModuleName>
      </TopContainerForAllPages>
      <StyledPaper sx={{ minHeight: "calc(100vh - 113px)" }}>
        {/* Search and Actions Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            px: 2,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid
                size={{ xs: 12, sm: 4 }}
                item
                width={"34%"}
                sx={{ alignItems: "center" }}
              >
                <InputLabelLead>Select other item</InputLabelLead>
                <FormControl fullWidth size="small">
                  <LeadDataInput
                    select
                    fullWidth
                    value={selectedOtherItem}
                    onChange={(e) => setSelectedOtherItem(e.target.value)}
                    placeholder="Select Other Item"
                    variant="outlined"
                    size="small"
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (selected) => {
                        if (!selected) {
                          return (
                            <span style={{ color: "#9e9e9e" }}>EPF</span>
                          );
                        }
                        const selectedOption = otherItemOptions?.find(
                          (option) => option.id === selected
                        );
                        return selectedOption ? selectedOption.name : selected;
                      },
                      MenuProps: {
                        PaperProps: {
                          sx: scrollbarStyles,
                        },
                      },
                    }}
                  >
                    {otherItemOptions?.map((each) => (
                      <MenuItem key={each.id} value={each.id}>
                        {each.name}
                      </MenuItem>
                    ))}
                  </LeadDataInput>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }} item width={"14%"}>
                <CustomDatePicker
                  label="Start Date"
                  value={startDate ? new Date(startDate) : null}
                  onChange={(newValue) =>
                    setStartDate(
                      newValue instanceof Date && !isNaN(newValue)
                        ? newValue.toISOString()
                        : ""
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }} item width={"14%"}>
                <CustomDatePicker
                  label="End Date"
                  value={endDate ? new Date(endDate) : null}
                  onChange={(newValue) =>
                    setEndDate(
                      newValue instanceof Date && !isNaN(newValue)
                        ? newValue.toISOString()
                        : ""
                    )
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ gap: 2, alignItems: "flex-end", ml: "auto" }}>
            <FilledButton sx={{ alignItems: "flex-end" }}>Export</FilledButton>
          </Box>
        </Box>
        <AccountCopyInnerHeadingContainer>
          <VoucherInnerHeading>Previous net balance:</VoucherInnerHeading>
          <AccountCopyVioletContainerTypo>
            <RupeeFieldContainerInTable>
              Cr:{" "}
              <LuIndianRupee
                style={{
                  marginLeft: 4,
                  marginRight: 2,
                  fontSize: "13px",
                  marginTop: "0px",
                }}
              />{" "}
              6,16,567,788 | Dr:{" "}
              <LuIndianRupee
                style={{ marginLeft: 4, marginRight: 2, fontSize: "13px" }}
              />{" "}
              6,16,567,788{" "}
            </RupeeFieldContainerInTable>
          </AccountCopyVioletContainerTypo>
        </AccountCopyInnerHeadingContainer>
        <TableContainerWithBorder>
          <Table sx={{ width: "100%", overflowX: "auto" }}>
            <TableHead>
              <VoucherTableHeadRow>
                <TableHeadCell>Sr No.</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
                <TableHeadCell>Head</TableHeadCell>
                <TableHeadCell>Narration</TableHeadCell>
                <TableHeadCell>Credit</TableHeadCell>
                <TableHeadCell>Debit</TableHeadCell>
              </VoucherTableHeadRow>
            </TableHead>

            <TableBody>
              {tableData.map((row, idx) => (
                <VoucherTableBodyRow key={idx}>
                  <TableBodyCell>{row.srNo || "-"}</TableBodyCell>
                  <TableBodyCell>{row.date || "-"}</TableBodyCell>
                  <TableBodyCell>{row.head || "-"}</TableBodyCell>
                  <TableBodyCell>{row.narration || "-"}</TableBodyCell>
                  <TableBodyCell>
                    <RupeeFieldContainerInTable>
                      <LuIndianRupee
                        style={{
                          marginLeft: 4,
                          marginRight: 2,
                          fontSize: "13px",
                        }}
                      />
                      {row.credit?.toLocaleString("en-IN") || "0"}
                    </RupeeFieldContainerInTable>
                  </TableBodyCell>
                  <TableBodyCell>
                    <RupeeFieldContainerInTable>
                      <LuIndianRupee
                        style={{
                          marginLeft: 4,
                          marginRight: 2,
                          fontSize: "13px",
                        }}
                      />
                      {row.debit?.toLocaleString("en-IN") || "0"}
                    </RupeeFieldContainerInTable>
                  </TableBodyCell>
                </VoucherTableBodyRow>
              ))}

              {/* Totals Row */}
              <VoucherTableBodyRow sx={{ backgroundColor: "#F3F2F5" }}>
                <TableBodyCell colSpan={4}>
                  <Typography variant="body2" fontWeight="bold">
                    Total:
                  </Typography>
                </TableBodyCell>
                <TableBodyCell>
                  <Typography variant="body2" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
                    Total: 
                    <LuIndianRupee
                      style={{
                        marginLeft: 4,
                        marginRight: 2,
                        fontSize: "13px",
                      }}
                    />
                    {(finalTotalData?.credit ?? 0).toLocaleString("en-IN")}
                  </Typography>
                </TableBodyCell>
                <TableBodyCell>
                  <Typography variant="body2" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
                    Total: 
                    <LuIndianRupee
                      style={{
                        marginLeft: 4,
                        marginRight: 2,
                        fontSize: "13px",
                      }}
                    />
                    {(finalTotalData?.debit ?? 0).toLocaleString("en-IN")}
                  </Typography>
                </TableBodyCell>
              </VoucherTableBodyRow>
            </TableBody>
          </Table>
        </TableContainerWithBorder>
      </StyledPaper>
    </Box>
  );
};

export default AccountCopyOtherItems;
