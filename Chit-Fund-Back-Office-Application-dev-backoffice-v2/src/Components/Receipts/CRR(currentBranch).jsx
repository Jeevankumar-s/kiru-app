import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Autocomplete,
  TextField,
} from "@mui/material";
import { useCRM } from "../../Context/CRMContext.jsx";
import Trophy from "../../assets/Trophy.png";
import {
  gettingWinnerPersonalDetails,
  GettingAllCollectors,
  GettingAllTokens,
  GenerateReceipt,
  GettingReceiptSeries,
  GettingReceiptNumber,
  GettingSubscriberNameById,
} from "../API/Api.jsx";
import { LuIndianRupee } from "react-icons/lu";

import PdfImage from "../../assets/PDFImage.png";
import {
  TopContainerForAllPages,
  OutlineButton,
  RowValues,
  FilledButton,
  TableHeadRow,
  StatusChip,
  StyledAvatar,
  CommonSearchInput,
  EmployeeDetailsPageInput,
  InputLabelLead,
  StyledTab,
  StyledTabs,
  StyledSelect,
  StyledOutlinedInput,
  LeadDataInput,
  TableDeleteBtn,
  TableContainerWithBorder,
  VoucherTableHeadRow,
  TableHeadCell,
  VoucherTableBodyRow,
  TableBodyCell,
} from "../../StyledElement.jsx";
import CalenderIcon from "../../assets/calender.svg";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";

const uploadedDocuments = {
  llp: "llp_document_url",
};

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

export default function CRRCurrentBranch() {
  const { winningDetailsId } = useParams();
  const { showToast, showErrorToast } = useCRM();
  const [ReceiptDetails, setReceiptDetails] = useState({
    dateOfReceipt: new Date().toISOString(), // today's date in ISO format
    receiptType: "CRR_SAME_BRANCH",
  });
  const [listOfTokens, setListOfTokens] = useState([]);
  const [collectorNameList, setCollectorNameList] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [receiptSeries, setReceiptSeries] = useState(null);

  const fetchingTokens = async () => {
    const response = await GettingAllTokens();
    if (response.success) {
      setListOfTokens(response?.data?.results);
    }
  };

  const fetchingCollector = async () => {
    const response = await GettingAllCollectors(winningDetailsId);
    if (response.statusCode === 200) {
      setCollectorNameList(response?.data?.results);
    }
  };

  const fetchingReceiptSeries = async () => {
    const response = await GettingReceiptSeries(ReceiptDetails.collectorName);
    if (response.success) {
      setReceiptSeries(response?.data);
    }
  };

  const fetchingReceiptNumber = async () => {
    const response = await GettingReceiptNumber(ReceiptDetails.receiptSeries);
    if (response.success) {
      setReceiptDetails((prev) => ({
        ...prev,
        receiptNo: response?.data,
      }));
    }
  };

  const fetchingSubscriberName = async () => {
    const response = await GettingSubscriberNameById(
      ReceiptDetails?.transactions?.token
    );
    setReceiptDetails((prev) => ({
      ...prev,
      transactions: {
        ...prev.transactions,
        subscriber: response?.data?.name || "",
      },
    }));
  };

  useEffect(() => {
    // Step 1: clear the selected series
    setReceiptDetails((prev) => ({ ...prev, receiptSeries: "" }));
    setReceiptSeries([]); // optional: clear list to prevent match      // Step 2: fetch new list
    if (ReceiptDetails.collectorName) {
      fetchingReceiptSeries();
    }
  }, [ReceiptDetails.collectorName]);

  useEffect(() => {
    // Step 1: clear the selected series
    setReceiptDetails((prev) => ({ ...prev, receiptNo: "" }));
    if (ReceiptDetails.receiptSeries) {
      fetchingReceiptNumber();
    }
  }, [ReceiptDetails.receiptSeries]);

  useEffect(() => {
    if (ReceiptDetails?.transactions?.token) {
      fetchingSubscriberName();
    }
  }, [ReceiptDetails?.transactions?.token]);

  useEffect(() => {
    fetchingCollector();
    fetchingTokens();
  }, []);

  const handleAddTransaction = () => {
    const {
      receiptNo,
      receiptSeries,
      dateOfReceipt,
      totalAmount,
      collectorName,
      receivedBy,
      // chequeDetails,
      transactions,
    } = ReceiptDetails || {};

    const isValid =
      receiptNo &&
      receiptSeries &&
      dateOfReceipt &&
      totalAmount !== undefined &&
      collectorName &&
      receivedBy &&
      // chequeDetails?.bankHead &&
      // chequeDetails?.bankName &&
      // chequeDetails?.chequeNo &&
      // chequeDetails?.chequeDate &&
      transactions?.amount !== undefined &&
      transactions?.miscAmount !== undefined;
    // transactions?.branchName;

    if (isValid) {
      setTransactions((prev) => [...prev, ReceiptDetails]);
    } else {
      showErrorToast("Please fill all the fields before adding a transaction.");
      // optionally show UI error message
    }
  };

  const handleDeleteTransaction = (idx) => {
    setTransactions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleInputChange = (e) => {
    console.log("handleInputChange called");
    const { name, value } = e.target;
    const numericFields = [
      "totalAmount",
      "transactions.amount",
      "transactions.miscAmount",
      "chequeDetails.amount",
    ];
    const dateFields = ["chequeDate", "dateOfReceipt"];

    const setNestedValue = (obj, path, val) => {
      const keys = path.split(".");
      const lastKey = keys.pop();
      const nestedObj = keys.reduce((acc, key) => {
        if (!acc[key]) acc[key] = {};
        return acc[key];
      }, obj);
      nestedObj[lastKey] = val;
      return { ...obj };
    };

    const cleanedName = name.replace(/\?/g, "");
    let updatedValue = value;

    if (numericFields.includes(cleanedName)) {
      updatedValue = Number(value);
    } else if (dateFields.includes(cleanedName)) {
      updatedValue = new Date(value).toISOString();
    } else if (value === "") {
      updatedValue = " ";
    }

    setReceiptDetails((prevData) =>
      cleanedName.includes(".")
        ? setNestedValue({ ...prevData }, cleanedName, updatedValue)
        : { ...prevData, [cleanedName]: updatedValue }
    );
  };

  const handleGenerate = async () => {
    if (transactions.length === 0) {
      showErrorToast("Please add at least one transaction before generating.");
      return;
    }
    try {
      const response = await GenerateReceipt(transactions);
      if (response.success) {
        showToast(response.message || "Receipt generated successfully");
      }
    } catch (error) {
      console.error("Error generating receipt:", error);
      showErrorToast("Failed to generate receipt. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <Box>
        <Grid container spacing={2} display={"flex"} width={"100%"}>
          <Grid item xs={12} sm={4} width={"15%"} flexShrink={1}>
            <InputLabelLead>Collector name</InputLabelLead>
            <Autocomplete
              size="small"
              options={collectorNameList}
              getOptionLabel={(option) => option.fullName || ""}
              value={
                collectorNameList.find(
                  (c) => c.id === ReceiptDetails.collectorName
                ) || null
              }
              onChange={(event, newValue) =>
                setReceiptDetails((prev) => ({
                  ...prev,
                  collectorName: newValue ? newValue.id : "",
                }))
              }
              renderInput={(params) => (
                <LeadDataInput {...params} placeholder="Select" />
              )}
              slotProps={{
                paper: {
                  sx: {
                    "& .MuiAutocomplete-listbox": scrollbarStyles, // ✅ apply to listbox
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"15%"} flexShrink={1}>
            <InputLabelLead>Receipt series</InputLabelLead>
            <Autocomplete
              size="small"
              options={receiptSeries}
              getOptionLabel={(option) => option.receiptSeries || ""}
              value={
                (receiptSeries &&
                  receiptSeries.find(
                    (s) => s.id === ReceiptDetails.receiptSeries
                  )) ||
                null
              }
              onChange={(event, newValue) =>
                setReceiptDetails((prev) => ({
                  ...prev,
                  receiptSeries: newValue ? newValue.id : "",
                }))
              }
              renderInput={(params) => (
                <LeadDataInput {...params} placeholder="Select Series" />
              )}
              slotProps={{
                paper: {
                  sx: {
                    "& .MuiAutocomplete-listbox": scrollbarStyles, // ✅ same style
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"16%"} flexShrink={1}>
            <InputLabelLead>Received by</InputLabelLead>
            <Autocomplete
              size="small"
              options={collectorNameList}
              getOptionLabel={(option) => option.fullName || ""}
              value={
                collectorNameList.find(
                  (c) => c.id === ReceiptDetails.receivedBy
                ) || null
              }
              onChange={(event, newValue) =>
                setReceiptDetails((prev) => ({
                  ...prev,
                  receivedBy: newValue ? newValue.id : "",
                }))
              }
              renderInput={(params) => (
                <LeadDataInput {...params} placeholder="Select Collector" />
              )}
              slotProps={{
                paper: {
                  sx: {
                    "& .MuiAutocomplete-listbox": scrollbarStyles, // ✅ custom scrollbar
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2} width={"16%"} flexShrink={1}>
            <InputLabelLead>Receipt no</InputLabelLead>
            <LeadDataInput
              fullWidth
              placeholder="Enter no"
              name="receiptNo"
              value={ReceiptDetails.receiptNo}
              // onChange={handleInputChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"16%"} flexShrink={1}>
            <InputLabelLead>Total amount</InputLabelLead>
            <LeadDataInput
              fullWidth
              placeholder="Enter amount"
              name="totalAmount"
              value={ReceiptDetails.totalAmount}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <LuIndianRupee
                    style={{
                      marginRight: 4,
                      // marginTop: 4,
                      fontSize: "16px", // Adjust size as needed
                      color: "#555", // Optional styling
                    }}
                  />
                ),
              }}
            />
          </Grid>
          <Grid sx={{ width: "15%" }} flexShrink={1}>
            <CustomDatePicker
              label="Date of receipt"
              value={
                ReceiptDetails?.dateOfReceipt
                  ? new Date(ReceiptDetails?.dateOfReceipt)
                  : null
              }
              onChange={(newValue) =>
                setReceiptDetails((prev) => ({
                  ...prev,
                  dateOfReceipt:
                    newValue instanceof Date && !isNaN(newValue)
                      ? newValue.toISOString()
                      : "",
                }))
              }
            />
            ;
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          padding: "16px ",

          backgroundColor: "#F9F9FF",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "8px",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
            Transactions
          </Typography>
          <OutlineButton
            onClick={handleAddTransaction}
            sx={{ height: 32, width: "126px" }}
          >
            Add
          </OutlineButton>
        </Box>

        <Box
          sx={{
            width: "100%",
            marginBottom: "16px",
            backgroundColor: "#F9F9FF",
            borderRadius: "16px",
          }}
        >
          <Grid
            container
            spacing={2}
            display={"flex"}
            width={"100%"}
            sx={{ marginBottom: "32px" }}
          >
            <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
              <InputLabelLead>No of token</InputLabelLead>
              <Autocomplete
                size="small"
                options={listOfTokens || []}
                getOptionLabel={(option) => option.node || ""}
                value={
                  (listOfTokens &&
                    listOfTokens.find(
                      (token) =>
                        token.id === ReceiptDetails?.transactions?.token
                    )) ||
                  null
                }
                onChange={(event, newValue) =>
                  setReceiptDetails((prev) => ({
                    ...prev,
                    transactions: {
                      ...prev.transactions,
                      token: newValue ? newValue.id : "",
                    },
                  }))
                }
                renderInput={(params) => (
                  <LeadDataInput {...params} placeholder="Select token" />
                )}
                slotProps={{
                  paper: {
                    sx: {
                      "& .MuiAutocomplete-listbox": scrollbarStyles,
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
              <InputLabelLead>Subscriber name</InputLabelLead>
              <LeadDataInput
                fullWidth
                placeholder="subscriber name"
                name="transactions.subscriberName"
                value={ReceiptDetails?.transactions?.subscriber || ""}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
              <InputLabelLead variant="body2">Amount </InputLabelLead>
              <LeadDataInput
                fullWidth
                name="transactions.amount"
                value={ReceiptDetails?.transactions?.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  startAdornment: (
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        // marginTop: 4,
                        fontSize: "16px", // Adjust size as needed
                        color: "#555", // Optional styling
                      }}
                    />
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            display={"flex"}
            width={"100%"}
            sx={{ marginBottom: "32px" }}
          >
            <Grid item xs={12} sm={4} width={"32.4%"}>
              <InputLabelLead>Other</InputLabelLead>
              <LeadDataInput
                select
                fullWidth
                name="transactions.other"
                value={ReceiptDetails?.transactions?.other}
                onChange={handleInputChange}
                placeholder="Select"
                variant="outlined"
                size="small"
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9e9e9e" }}>Select</span>;
                    }

                    const selectedBranch = collectorNameList.find(
                      (branch) => branch.id === selected
                    );
                    return selectedBranch ? selectedBranch.name : selected;
                  },
                  MenuProps: {
                    PaperProps: {
                      sx: scrollbarStyles,
                    },
                  },
                }}
              >
                <MenuItem value="">Select</MenuItem>
                {/* Add other options as needed */}
                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                <MenuItem value="Adjustment">Adjustment</MenuItem>
                <MenuItem value="Refund">Refund</MenuItem>
              </LeadDataInput>
            </Grid>

            <Grid item xs={12} sm={4} width={"32.4%"}>
              <InputLabelLead variant="body2">Misc amount </InputLabelLead>
              <LeadDataInput
                fullWidth
                name="transactions.miscAmount"
                value={ReceiptDetails?.transactions?.miscAmount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  startAdornment: (
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        // marginTop: 4,
                        fontSize: "16px", // Adjust size as needed
                        color: "#555", // Optional styling
                      }}
                    />
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Table of transactions */}
          {transactions.length > 0 && (
            <TableContainerWithBorder>
              <Table>
                <TableHead>
                  <VoucherTableHeadRow>
                    {[
                      "Receipt no",
                      "Subscriber name",
                      "Token",
                      "Amount",
                      "Misc amount",
                      "Action",
                    ].map((header) => (
                      <TableHeadCell key={header}>{header}</TableHeadCell>
                    ))}
                  </VoucherTableHeadRow>
                </TableHead>
                <TableBody>
                  {transactions.map((row, idx) => (
                    <VoucherTableBodyRow key={idx}>
                      <TableBodyCell>
                        {ReceiptDetails.receiptNo || "-"}
                      </TableBodyCell>
                      <TableBodyCell>
                        {row?.transactions?.subscriberName || "-"}
                      </TableBodyCell>
                      <TableBodyCell>
                        {row?.transactions?.token
                          ? listOfTokens.find(
                              (token) => token.id === row.transactions.token
                            )?.node
                          : "-"}
                      </TableBodyCell>

                      <TableBodyCell>
                        ₹{" "}
                        {Number(row?.transactions?.amount).toLocaleString(
                          "en-IN"
                        )}
                      </TableBodyCell>
                      <TableBodyCell>
                        ₹{" "}
                        {Number(row?.transactions?.miscAmount).toLocaleString(
                          "en-IN"
                        )}
                      </TableBodyCell>
                      <TableBodyCell sx={{ borderRight: "none" }}>
                        <TableDeleteBtn
                          onClick={() => handleDeleteTransaction(idx)}
                        >
                          Delete
                        </TableDeleteBtn>
                      </TableBodyCell>
                    </VoucherTableBodyRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainerWithBorder>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <FilledButton sx={{ width: "180px" }} onClick={handleGenerate}>
              Generate
            </FilledButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
