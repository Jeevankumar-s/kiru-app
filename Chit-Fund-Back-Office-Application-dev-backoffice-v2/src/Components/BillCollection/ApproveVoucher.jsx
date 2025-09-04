import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
} from "@mui/material";
import {
  GettingAllCollectors,
  GettingNotApprovedVouchers,
  GenerateReceipt,
} from "../API/Api.jsx";
import {
  RowValues,
  TableHeadRow,
  InputLabelLead,
  LeadDataInput,
  StyledTableContainer,
} from "../../StyledElement.jsx";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";

import { useCRM } from "../../Context/CRMContext.jsx";
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
  const [listOfNotApprovedVouchers, setListOfNotApprovedVouchers] = useState(
    []
  );
  const [transactions, setTransactions] = useState([]);
  console.log("transactions", transactions);

  const fetchingCollector = async () => {
    const response = await GettingAllCollectors(winningDetailsId);
    if (response.statusCode === 200) {
      setCollectorNameList(response?.data?.results);
    }
  };

  const fetchingVoucher = async () => {
    const response = await GettingNotApprovedVouchers();
    if (response.success) {
      setListOfNotApprovedVouchers(response?.data);
    }
  };

  useEffect(() => {
    fetchingCollector();
    fetchingVoucher();
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
          <Grid sx={{ width: "15%" }} flexGrow={1}>
            <CustomDatePicker
              label="Date"
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
          </Grid>
          <Grid item xs={12} sm={4} width={"15%"} flexGrow={1}>
            <InputLabelLead>Payment method</InputLabelLead>
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
              {/* {collectorNameList.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))} */}
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="cheque">Cheque</MenuItem>
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"15%"} flexGrow={1}>
            <InputLabelLead>Mony Collector</InputLabelLead>
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
                  return selectedBranch ? selectedBranch.fullName : selected;
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
                  {branch.fullName}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
        </Grid>
      </Box>

      <StyledTableContainer
        sx={{
          minHeight: "calc(100vh - 223px)",
          maxHeight: "calc(100vh - 223px)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadRow>Date</TableHeadRow>
              <TableHeadRow>Receipt no</TableHeadRow>
              <TableHeadRow>Chit name</TableHeadRow>
              <TableHeadRow>Subscriber name</TableHeadRow>
              <TableHeadRow>Amount</TableHeadRow>
              <TableHeadRow>Type</TableHeadRow>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfNotApprovedVouchers.length > 0 ? (
              listOfNotApprovedVouchers.map((each) => (
                <TableRow
                  key={each._id}
                  sx={{ cursor: "pointer" }}
                  // onClick={() =>
                  //   handleRowClick(
                  //     each?.id,
                  //     each?.user?.kycDetails,
                  //     each?.subscriberDetails?.fullName
                  //   )
                  // }
                >
                  <RowValues sx={{ minWidth: "110px" }}>
                    {each?.subscriberDetails?.fullName ?? "-"}
                  </RowValues>
                  {/* <RowValues>
                              {each?.subscriberDetails?.age ?? "-"}
                            </RowValues> */}
                  <RowValues>
                    {each?.subscriberDetails?.occupation ?? "-"}
                  </RowValues>
                  <RowValues sx={{ minWidth: "90px" }}>
                    {each.chitValue !== null &&
                    each.chitValue !== undefined &&
                    each.chitValue !== "" ? (
                      <Box display="flex">
                        <LuIndianRupee
                          style={{
                            marginRight: 4,
                            marginTop: 4,
                            fontSize: "13px", // Optional: Adjust icon size if needed
                          }}
                        />
                        <span>{each?.chitValue ?? "-"}</span>
                      </Box>
                    ) : (
                      <span>-</span>
                    )}
                    {/* {each?.chitValue ?? "-"} */}
                  </RowValues>
                  <RowValues>{each?.tenure ?? "-"}</RowValues>
                  <RowValues>{each?.combinedAddress ?? "-"}</RowValues>
                  <RowValues sx={{ minWidth: "189px" }}></RowValues>
                  <RowValues sx={{ color: "#212890", minWidth: "80px" }}>
                    View More
                  </RowValues>
                  {/* <RowValues>
                            <IconButton
                              onClick={(event) => handleMenuClick(event, each.id)}
                            >
                              <img
                                src={MoreIcon}
                                alt="Download-icon"
                                height={"21px"}
                                width={"21px"}
                              />
                            </IconButton>
                          </RowValues> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#5f6368",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}
