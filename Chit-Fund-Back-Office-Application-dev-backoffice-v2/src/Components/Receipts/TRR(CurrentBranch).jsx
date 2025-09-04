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
} from "@mui/material";
import Trophy from "../../assets/Trophy.png";
import {
  GettingAllCollectors,
  getAllBranches,
  GenerateReceipt,
  GettingAllTokens,
} from "../API/Api.jsx";
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
  EmployeeDetailsPageLabel,
  StyledTab,
  StyledTabs,
  InputLabelLead,
  StyledSelect,
  StyledOutlinedInput,
  LeadDataInput,
  ModalOutlineBtn,
  ReceiptOutlineBtn,
  TableDeleteBtn,
  TableContainerWithBorder,
  VoucherTableHeadRow,
  TableHeadCell,
  VoucherTableBodyRow,
  TableBodyCell,
} from "../../StyledElement.jsx";
import { useCRM } from "../../Context/CRMContext.jsx";
import CalenderIcon from "../../assets/calender.svg";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";
import { LuIndianRupee } from "react-icons/lu";

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

export default function CRROtherBranch() {
  const { winningDetailsId } = useParams();
  const { showToast, showErrorToast } = useCRM();
  const [ReceiptDetails, setReceiptDetails] = useState({
    receiptType: "CRR_OTHER_BRANCH",
  });
  const [listOfTokens, setListOfTokens] = useState([]);
  const [collectorNameList, setCollectorNameList] = useState([]);
  const [ListOfBranches, setListOfBranches] = useState([]);
  const [transactions, setTransactions] = useState([]);
  console.log("transactions", transactions);

  const fetchingCollector = async () => {
    const response = await GettingAllCollectors(winningDetailsId);
    if (response.statusCode === 200) {
      setCollectorNameList(response?.data?.collectors?.results);
    }
  };

  const fetchingTokens = async () => {
    const response = await GettingAllTokens();
    if (response.statusCode === 200) {
      setListOfTokens(response?.data?.results);
    }
  };
  const fetchingBranches = async () => {
    const response = await getAllBranches(winningDetailsId);
    if (response.success) {
      setListOfBranches(response?.data);
    }
  };

  useEffect(() => {
    fetchingCollector();
    fetchingTokens();
    fetchingBranches();
  }, []);

  const handleTransactionInputChange = (e) => {
    const { name, value } = e.target;
    // setTransactionInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = () => {
    const {
      receiptNo,
      receiptSeries,
      dateOfReceipt,
      totalAmount,
      collectorName,
      receivedBy,
      chequeDetails,
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
      transactions?.miscAmount !== undefined &&
      transactions?.branchName;

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
      // "amount",
      // "miscAmount",
      // "totalAmount",
      "transactions.amount",
      "transactions.miscAmount",
      "chequeDetails.amount",
    ];
    const dateFields = ["chequeDate", "dateOfReceipt"];

    console.log("name", name);
    console.log("value", value);

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
            <EmployeeDetailsPageLabel>Collector name</EmployeeDetailsPageLabel>
            <LeadDataInput
              select
              fullWidth
              name="collectorName"
              value={ReceiptDetails.collectorName}
              onChange={handleInputChange}
              placeholder="Select Branch"
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
              {collectorNameList.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"15%"} flexShrink={1}>
            <EmployeeDetailsPageLabel>Receipt series</EmployeeDetailsPageLabel>
            <LeadDataInput
              select
              fullWidth
              name="receiptSeries"
              value={ReceiptDetails.receiptSeries}
              onChange={handleInputChange}
              placeholder="Select Series"
              variant="outlined"
              size="small"
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9e9e9e" }}>Select</span>;
                  }

                  const selectedSeries = collectorNameList.find(
                    (series) => series.id === selected
                  );
                  return selectedSeries ? selectedSeries.name : selected;
                },
                MenuProps: {
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                },
              }}
            >
              {collectorNameList.map((series) => (
                <MenuItem key={series.id} value={series.id}>
                  {series.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"16%"} flexShrink={1}>
            <EmployeeDetailsPageLabel>Received by</EmployeeDetailsPageLabel>
            <LeadDataInput
              select
              fullWidth
              name="receivedBy"
              value={ReceiptDetails.receivedBy}
              onChange={handleInputChange}
              placeholder="Select Collector"
              variant="outlined"
              size="small"
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9e9e9e" }}>Select</span>;
                  }

                  const selectedCollector = collectorNameList.find(
                    (collector) => collector.id === selected
                  );
                  return selectedCollector ? selectedCollector.name : selected;
                },
                MenuProps: {
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                },
              }}
            >
              {collectorNameList.map((collector) => (
                <MenuItem key={collector.id} value={collector.id}>
                  {collector.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} md={2} width={"16%"} flexShrink={1}>
            <EmployeeDetailsPageLabel>Receipt no</EmployeeDetailsPageLabel>
            <LeadDataInput
              fullWidth
              placeholder="Enter no"
              name="receiptNo"
              value={ReceiptDetails.receiptNo}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"16%"} flexShrink={1}>
            <EmployeeDetailsPageLabel>Total amount</EmployeeDetailsPageLabel>
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
                      fontSize: "16px", // Adjust size as needed
                      color: "#555", // Optional styling
                    }}
                  />
                ),
              }}
            />
          </Grid>
          <Grid sx={{ width: "15%" }} flexShrink={1}>
            <InputLabelLead>Date of receipt</InputLabelLead>
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
      {/* Transactions Section */}
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
        <Typography sx={{ fontSize: "20px", fontWeight: 600, mb: 1 }}>
          Transactions
        </Typography>

        <Grid
          container
          spacing={2}
          display={"flex"}
          width={"100%"}
          sx={{ marginBottom: "32px" }}
        >
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>No of tokens</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="transactions.token"
              value={ReceiptDetails?.transactions?.token}
              onChange={handleInputChange}
              placeholder="Select token"
              variant="outlined"
              size="small"
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return (
                      <span style={{ color: "#9e9e9e" }}>Select token</span>
                    );
                  }

                  const selectedNumber = listOfTokens.find(
                    (token) => token.id === selected
                  );
                  return selectedNumber ? selectedNumber.id : selected;
                },
                MenuProps: {
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                },
              }}
            >
              {listOfTokens.map((token) => (
                <MenuItem key={token.id} value={token.id}>
                  {token.id}
                </MenuItem>
              ))}
            </LeadDataInput>
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
            <EmployeeDetailsPageLabel variant="body2">
              Amount{" "}
            </EmployeeDetailsPageLabel>
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
            <EmployeeDetailsPageLabel variant="body2">
              Misc amount{" "}
            </EmployeeDetailsPageLabel>
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 2,
          }}
        >
          <ReceiptOutlineBtn
            onClick={handleAddTransaction}
            sx={{ height: 32, flexGrow: 0 }}
          >
            Add
          </ReceiptOutlineBtn>
        </Box>

        {/* Table of transactions */}

        {transactions.length > 0 && (
          <TableContainerWithBorder>
            <Table>
              <TableHead>
                <VoucherTableHeadRow>
                  {[
                    "Receipt no",
                    "Branch name",
                    "Token",
                    "Narration",
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
                      {row?.transactions?.branchName
                        ? ListOfBranches.find(
                            (branch) =>
                              branch.id === row.transactions.branchName
                          )?.name
                        : "-"}
                    </TableBodyCell>
                    <TableBodyCell>
                      {row?.transactions?.token
                        ? listOfTokens.find(
                            (token) => token.id === row.transactions.token
                          )?.name
                        : "-"}
                    </TableBodyCell>
                    <TableBodyCell>
                      {row?.transactions?.narration || "-"}
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

        {/* Cheque and bank details */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={3} sx={{ width: "22%", flexGrow: 1 }}>
            <EmployeeDetailsPageLabel>Cheque no</EmployeeDetailsPageLabel>
            <LeadDataInput
              fullWidth
              value={ReceiptDetails?.chequeDetails?.chequeNo}
              name="chequeDetails.chequeNo"
              onChange={handleInputChange}
              placeholder="Enter cheque no"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ width: "22%", flexGrow: 1 }}>
            <EmployeeDetailsPageLabel>Cheque date</EmployeeDetailsPageLabel>
            <CustomDatePicker
              label="Cheque date"
              value={
                ReceiptDetails?.chequeDetails?.chequeDate
                  ? new Date(ReceiptDetails?.chequeDetails?.chequeDate)
                  : null
              }
              onChange={(newValue) =>
                setReceiptDetails((prev) => ({
                  ...prev,
                  chequeDetails: {
                    ...prev.chequeDetails,
                    chequeDate:
                      newValue instanceof Date && !isNaN(newValue)
                        ? newValue.toISOString()
                        : "",
                  },
                }))
              }
            />
            ;
          </Grid>
          <Grid item xs={12} sm={3} sx={{ width: "22%", flexGrow: 1 }}>
            <EmployeeDetailsPageLabel>Bank name</EmployeeDetailsPageLabel>
            <LeadDataInput
              select
              fullWidth
              name="chequeDetails.bankName"
              value={ReceiptDetails?.chequeDetails?.bankName}
              onChange={handleInputChange}
              placeholder="Select Bank"
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
              {collectorNameList.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ width: "22%", flexGrow: 1 }}>
            <EmployeeDetailsPageLabel>Bank head</EmployeeDetailsPageLabel>

            <LeadDataInput
              select
              fullWidth
              name="chequeDetails.bankHead"
              value={ReceiptDetails?.chequeDetails?.bankHead}
              onChange={handleInputChange}
              placeholder="Select Bank Head"
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
              {collectorNameList.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <FilledButton sx={{ width: "180px" }} onClick={handleGenerate}>
            Generate
          </FilledButton>
        </Box>
      </Box>
    </Box>
  );
}
