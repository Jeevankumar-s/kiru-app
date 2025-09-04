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
  RadioGroup,
} from "@mui/material";
import { LuIndianRupee } from "react-icons/lu";

import { useCRM } from "../../Context/CRMContext.jsx";
import {
  GettingEmployeeTypes,
  AddingSubscriber,
  getAllActiveGroups,
  GettingSubscriber,
  GettingDebitHeads,
  GettingBank,
  GettingCreditHeads,
  GettingAllCollectors,
  getAllBranches,
} from "../API/Api.jsx";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";

import CalenderIcon from "../../assets/calender.svg";
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
  BlueRadio,
  CustomFormControlLabel,
  FullContainer,
  VioletContainer,
  WhiteBtn,
  VoucherInnerHeading,
  VoucherInnerHeadingContainer,
  TableDeleteBtn,
  TableContainerWithBorder,
  VoucherTableHeadRow,
  TableHeadCell,
  VoucherTableBodyRow,
  TableBodyCell,
} from "../../StyledElement.jsx";
import { WinnerDetailsApprovalConfirmModal } from "../Modals/ApprovalModals.jsx";

// const uploadedDocuments = {
//   llp: "llp_document_url",
// };

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

export default function CRROtherBranch({ fetchingCommonDetails }) {
  const { winningDetailsId } = useParams();
  const { showToast, showErrorToast } = useCRM();
  const [voucherDetails, setVoucherDetails] = useState({});
  const [isOpenApproveConfirmation, setIsOpenApproveConfirmation] =
    useState(false);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [listOfTokens, setListOfTokens] = useState([]);
  const [collectorNameList, setCollectorNameList] = useState([]);
  const [subscriberList, setSubscriberList] = useState([]);
  const [debitHeadList, setDebitHeadList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [chitList, setChitList] = useState([]);
  const [ListOfBranches, setListOfBranches] = useState([]);
  const [creditHeadList, setCreditHeadList] = useState([]);
  const [creditTransactions, setCreditTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchingBank = async () => {
    try {
      const response = await GettingBank();
      if (response.success) {
        setBankList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingCollector = async () => {
    const response = await GettingAllCollectors(winningDetailsId);
    if (response.statusCode === 200) {
      setCollectorNameList(response?.data?.collectors?.results);
    }
  };

  const fetchingBranches = async () => {
    const response = await getAllBranches(winningDetailsId);
    if (response.success) {
      setListOfBranches(response?.data);
    }
  };

  const fetchingSubcribers = async () => {
    try {
      const response = await GettingSubscriber(selectedGroup);
      if (response.success) {
        setSubscriberList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingCreditHeads = async () => {
    try {
      const response = await GettingCreditHeads();
      if (response.success) {
        setCreditHeadList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingChit = async () => {
    try {
      const limit = "all";
      const response = await getAllActiveGroups(limit);
      if (response.success) {
        setChitList(response?.data);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const fetchingDebitHeads = async () => {
    try {
      const response = await GettingDebitHeads();
      if (response.success) {
        setDebitHeadList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingSubcribers();
    fetchingBranches();
    fetchingChit();
    fetchingBank();
    fetchingDebitHeads();
    fetchingCreditHeads();
    fetchingCollector();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const numericFields = ["credit.amount", "debit.amount"];
    const dateFields = ["date"];

    if (name.includes(".")) {
      const [section, field] = name.split(".");
      let newValue = value;

      if (numericFields.includes(name)) {
        newValue = Number(value);
      }

      setVoucherDetails((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newValue === "" ? " " : newValue,
        },
      }));
    } else if (dateFields.includes(name)) {
      const isoDate = new Date(value).toISOString();
      setVoucherDetails((prevData) => ({
        ...prevData,
        [name]: isoDate,
      }));
    } else {
      setVoucherDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Add your form submission logic here
      console.log("Form submitted with data:", voucherDetails);
      // Reset form or show success message as needed

      const response = await AddingSubscriber(voucherDetails);
      if (response.statusCode === 200) {
        setIsOpenApproveConfirmation(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  //   const handleAddTransaction = () => {
  //     if (
  //       ReceiptDetails.branch &&
  //       ReceiptDetails.chitNumber &&
  //       ReceiptDetails.amount &&
  //       ReceiptDetails.miscAmount
  //     ) {
  //       setCreditTransactions((prev) => [...prev, ReceiptDetails]);
  //     }
  //   };

  const handleAddCreditTransaction = () => {
    const { amount, chequeNumber, description } = voucherDetails.credit || {};

    if (amount && chequeNumber && description) {
      setCreditTransactions((prev) => [...prev, voucherDetails.credit]);
    } else {
      // Optional: Show validation error
      console.warn("Missing credit fields");
    }
  };

  const handleAddTransaction = () => {
    const { amount } = voucherDetails || {};

    if (amount) {
      setTransactions((prev) => [...prev, voucherDetails.debit]);
    } else {
      // Optional: Show validation error
      console.warn("Missing debit fields");
    }
  };

  const handleDeleteTransaction = (indexToRemove) => {
    setCreditTransactions((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );
  };

  return (
    <FullContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid container spacing={2} display={"flex"} width={"100%"}>
          <Grid item xs={12} sm={4} width={"22%"}>
            <EmployeeDetailsPageLabel>
              Transaction type
            </EmployeeDetailsPageLabel>
            <LeadDataInput
              select
              fullWidth
              name="transactionType"
              value={voucherDetails.transactionType || ""}
              onChange={handleInputChange}
              placeholder="Select Transaction Type"
              variant="outlined"
              size="small"
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9e9e9e" }}>Select</span>;
                  }

                  const selectedHead = creditHeadList.find(
                    (head) => head.id === selected
                  );
                  return selectedHead ? selectedHead.name : selected;
                },
                MenuProps: {
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                },
              }}
            >
              {/* {creditHeadList.map((head) => (
                <MenuItem key={head.id} value={head.id}>
                  {head.name}
                </MenuItem>
              ))} */}
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="cheque">Cheque</MenuItem>
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"22%"}>
            <EmployeeDetailsPageLabel>Date</EmployeeDetailsPageLabel>

            <CustomDatePicker
              label="Start date"
              value={voucherDetails.date ? new Date(voucherDetails.date) : null}
              onChange={(newValue) =>
                setVoucherDetails((prev) => ({
                  ...prev,
                  date:
                    newValue instanceof Date && !isNaN(newValue)
                      ? newValue.toISOString()
                      : "", // or format however you want
                }))
              }
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"22%"}>
            <EmployeeDetailsPageLabel>Receipt number</EmployeeDetailsPageLabel>
            <LeadDataInput
              fullWidth
              name="receiptNumber"
              value={voucherDetails.receiptNumber || ""}
              //   onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
        <OutlineButton
          sx={{ width: "136px", height: "40px", mt: 2, borderRadius: "4px" }}
          onClick={handleAddCreditTransaction}
        >
          Print Voucher
        </OutlineButton>
      </Box>
      {/* Form Section */}
      <VioletContainer>
        <VoucherInnerHeadingContainer>
          <VoucherInnerHeading>Member/chit details</VoucherInnerHeading>
        </VoucherInnerHeadingContainer>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>
              Cash/cheque received by
            </EmployeeDetailsPageLabel>
            <LeadDataInput
              select
              fullWidth
              name="receivedBy"
              value={voucherDetails.receivedBy}
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
              {collectorNameList?.map((collector) => (
                <MenuItem key={collector.id} value={collector.id}>
                  {collector.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Branch name</EmployeeDetailsPageLabel>
            <LeadDataInput
              select
              fullWidth
              name="branchName"
              value={voucherDetails.branchName}
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

                  const selectedBranch = ListOfBranches.find(
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
              {ListOfBranches?.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Chit number</EmployeeDetailsPageLabel>
            <LeadDataInput
              select
              fullWidth
              name="token"
              value={voucherDetails?.token}
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
              {listOfTokens?.map((token) => (
                <MenuItem key={token.id} value={token.id}>
                  {token.id}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4} width={"32.2%"}>
            <InputLabelLead>Subscriber name</InputLabelLead>
            <LeadDataInput
              fullWidth
              placeholder="subscriber name"
              name="subscriberName"
              value={voucherDetails.subscriber || ""}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>

        <VoucherInnerHeadingContainer>
          <VoucherInnerHeading>Transactions</VoucherInnerHeading>
          <WhiteBtn onClick={handleAddTransaction}>Add Cash</WhiteBtn>
        </VoucherInnerHeadingContainer>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"18%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Chit Amount</EmployeeDetailsPageLabel>
            <LeadDataInput
              fullWidth
              name="chitAmount"
              value={voucherDetails.chitAmount}
              onChange={handleInputChange}
              placeholder="Enter"
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
          <Grid item xs={12} sm={4} width={"18%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Amount type</EmployeeDetailsPageLabel>
            <LeadDataInput
              select
              fullWidth
              name="amountType"
              value={voucherDetails.amountType || ""}
              onChange={handleInputChange}
              placeholder="Select Amount Type"
              variant="outlined"
              size="small"
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9e9e9e" }}>Select</span>;
                  }

                  const selectedHead = debitHeadList.find(
                    (head) => head.id === selected
                  );
                  return selectedHead ? selectedHead.name : selected;
                },
                MenuProps: {
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                },
              }}
            >
              {/* {debitHeadList.map((head) => (
                <MenuItem key={head.id} value={head.id}>
                  {head.name}
                </MenuItem>
              ))} */}
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="cheque">Cheque</MenuItem>
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"18%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Amount</EmployeeDetailsPageLabel>
            <LeadDataInput
              fullWidth
              name="amount"
              value={voucherDetails.amount}
              onChange={handleInputChange}
              placeholder="Enter"
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
          <Grid item xs={12} sm={4} width={"18%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Other amount</EmployeeDetailsPageLabel>
            <LeadDataInput
              fullWidth
              name="otherAmount"
              value={voucherDetails.otherAmount}
              onChange={handleInputChange}
              placeholder="Enter"
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
          <Grid item xs={12} sm={4} width={"18%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Total amount</EmployeeDetailsPageLabel>
            <LeadDataInput
              fullWidth
              name="totalAmount"
              value={voucherDetails.totalAmount}
              onChange={handleInputChange}
              placeholder="Enter"
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
        </Grid>

        {/* Table of transactions */}
        <TableContainerWithBorder>
          <Table
            sx={{
              width: "130%",
              overflowX: "auto",
              boxShadow: "none",
            }}
          >
            <TableHead>
              <VoucherTableHeadRow>
                {[
                  "Receipt number",
                  "Date",
                  "Received by",
                  "Branch name",
                  "Chit no",
                  "Subscriber name",
                  "Subscriber ID",
                  "Chit amount",
                  "Amount type",
                  "Amount",
                  "Other amount",
                  "Total amount",
                ].map((header) => (
                  <TableHeadCell key={header}>{header}</TableHeadCell>
                ))}
              </VoucherTableHeadRow>
            </TableHead>
            <TableBody>
              {transactions.map((row, idx) => (
                <VoucherTableBodyRow key={idx}>
                  <TableBodyCell>{row?.receiptNumber || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.date || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.receivedBy || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.branchName || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.chitNo || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.subscriberName || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.subscriberId || "-"}</TableBodyCell>
                  <TableBodyCell
                    style={{
                      display: "flex",
                      alignItems: "center", // Vertically center the icon and text
                    }}
                  >
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        fontSize: "13px", // Optional: Adjust icon size if needed
                      }}
                    />
                    {Number(row?.chitAmount).toLocaleString("en-IN")}
                  </TableBodyCell>
                  <TableBodyCell>{row?.amountType || "-"}</TableBodyCell>
                  <TableBodyCell>
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        fontSize: "13px", // Optional: Adjust icon size if needed
                      }}
                    />
                    {Number(row?.amount).toLocaleString("en-IN")}
                  </TableBodyCell>
                  <TableBodyCell>
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        fontSize: "13px", // Optional: Adjust icon size if needed
                      }}
                    />
                    {Number(row?.otherAmount).toLocaleString("en-IN")}
                  </TableBodyCell>
                  <TableBodyCell>
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        fontSize: "13px", // Optional: Adjust icon size if needed
                      }}
                    />
                    {Number(row?.totalAmount).toLocaleString("en-IN")}
                  </TableBodyCell>
                  <TableBodyCell sx={{ borderRight: "none" }}>
                    <TableDeleteBtn
                      onClick={() => handleDeleteTransaction(idx)} // ✅ Add this line
                    >
                      Delete
                    </TableDeleteBtn>
                  </TableBodyCell>
                </VoucherTableBodyRow>
              ))}
            </TableBody>
          </Table>
        </TableContainerWithBorder>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <FilledButton sx={{ width: "180px" }} onClick={handleSubmit}>
            Generate
          </FilledButton>
        </Box>
      </VioletContainer>
    </FullContainer>
  );
}
