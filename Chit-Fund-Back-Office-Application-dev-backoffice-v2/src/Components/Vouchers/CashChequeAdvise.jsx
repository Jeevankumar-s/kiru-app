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
  GettingCashChequeAdviceVoucherNumber,
  GettingSubscriber,
  GettingDebitHeads,
  GettingBank,
  GettingCreditHeads,
  CashChequeAdviceVoucher,
} from "../API/Api.jsx";
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
  InputLabelLead,
  StyledTab,
  StyledTabs,
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
import { CustomDatePicker, RupeeInput } from "../Reusable/Reusable.jsx";

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

export default function CashChequeAdvise() {
  const { showToast, showErrorToast } = useCRM();
  const [voucherDetails, setVoucherDetails] = useState({
    date: new Date().toISOString(), // today's date in ISO format
  });
  const [debitFieldDetails, setDebitFieldDetails] = useState({});
  const [creditFieldDetails, setCreditFieldDetails] = useState({});
  const [debitHeadList, setDebitHeadList] = useState([]);
  const [creditHeadList, setCreditHeadList] = useState([]);
  const [creditTransactions, setCreditTransactions] = useState([]);
  const [debitTransactions, setDebitTransactions] = useState([]);

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

  const fetchVoucherNumber = async () => {
    try {
      const response = await GettingCashChequeAdviceVoucherNumber();
      if (response.success) {
        setVoucherDetails((prevData) => ({
          ...prevData,
          voucher: response?.data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingDebitHeads();
    fetchingCreditHeads();
    fetchVoucherNumber();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["number", "amount"];

    if (numericFields.includes(name)) {
      setCreditFieldDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else {
      setCreditFieldDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value, // keep this fallback if needed
      }));
    }
  };

  const handleDebitInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["amount"];

    if (numericFields.includes(name)) {
      setDebitFieldDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else {
      setDebitFieldDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value, // keep this fallback if needed
      }));
    }
  };

  const handleSubmit = async () => {
    const payload = {
      ...voucherDetails,
      creditTransactions,
      debitTransactions,
    };
    try {
      const response = await CashChequeAdviceVoucher(payload);
      if (response.success) {
        showToast(response.message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleAddCreditTransaction = () => {
    const { amount, chequeNumber, description } = creditFieldDetails || {};

    if (amount && chequeNumber && description) {
      setCreditTransactions((prev) => [...prev, creditFieldDetails]);
    } else {
      // Optional: Show validation error
      showErrorToast("Missing credit fields");
    }
  };

  const handleAddDebitTransaction = () => {
    const { amount, description } = debitFieldDetails || {};

    if (amount && description) {
      setDebitTransactions((prev) => [...prev, debitFieldDetails]);
    } else {
      // Optional: Show validation error
      showErrorToast("Missing debit fields");
    }
  };

  const handleDeleteTransaction = (indexToRemove) => {
    setCreditTransactions((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleDeleteDebitTransaction = (indexToRemove) => {
    setDebitTransactions((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );
  };

  return (
    <FullContainer>
      <Box>
        <Grid container spacing={2} display={"flex"} width={"100%"}>
          <Grid item xs={12} sm={4} width={"21%"}>
            <CustomDatePicker
              label="Date"
              value={
                voucherDetails?.date ? new Date(voucherDetails.date) : null
              }
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

          <Grid item xs={12} sm={4} width={"21%"}>
            <InputLabelLead>Voucher number</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="voucher"
              value={voucherDetails.voucher || ""}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
      {/* Form Section */}
      <VioletContainer>
        <VoucherInnerHeadingContainer>
          <VoucherInnerHeading>Credit transactions</VoucherInnerHeading>
          <WhiteBtn onClick={handleAddCreditTransaction}>Add</WhiteBtn>
        </VoucherInnerHeadingContainer>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Heads</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="head"
              value={creditFieldDetails.head}
              onChange={handleInputChange}
              placeholder="Select Credit Head"
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
                  return selectedHead ? selectedHead.node : selected;
                },
                MenuProps: {
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                },
              }}
            >
              {creditHeadList.map((head) => (
                <MenuItem
                  key={head.id}
                  value={head.id}
                  sx={{
                    maxWidth: "400px",
                    whiteSpace: "normal", // Allow wrapping
                    wordBreak: "break-word", // Optional: break long words if needed
                  }}
                >
                  {head.node}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"22%"} flexGrow={1}>
            <InputLabelLead>Amount</InputLabelLead>
            <RupeeInput
              fullWidth
              name="amount"
              value={creditFieldDetails.amount}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"22%"} flexGrow={1}>
            <InputLabelLead>Cheque number</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="chequeNumber"
              value={creditFieldDetails.chequeNumber || ""}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"22%"} flexGrow={1}>
            <InputLabelLead>Description</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="description"
              value={creditFieldDetails.description || ""}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>

        {/* Table of credit transactions */}

        {creditTransactions.length > 0 && (
          <TableContainerWithBorder>
            <Table>
              <TableHead>
                <VoucherTableHeadRow>
                  {[
                    "Sr. No.",
                    "Heads",
                    "Amount",
                    "Description",
                    "Cheque number",
                    "Action",
                  ].map((header) => (
                    <TableHeadCell key={header}>{header}</TableHeadCell>
                  ))}
                </VoucherTableHeadRow>
              </TableHead>
              <TableBody>
                {creditTransactions.map((row, idx) => (
                  <VoucherTableBodyRow key={idx}>
                    <TableBodyCell>{idx + 1}</TableBodyCell>
                    <TableBodyCell>
                      {row?.head
                        ? creditHeadList.find((head) => head.id === row.head)
                            ?.node
                        : "-"}
                    </TableBodyCell>
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
                      <span>{Number(row.amount).toLocaleString("en-IN")}</span>
                    </TableBodyCell>
                    <TableBodyCell>{row.description || "-"}</TableBodyCell>
                    <TableBodyCell>{row.chequeNumber || "-"}</TableBodyCell>
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
        )}

        <VoucherInnerHeadingContainer>
          <VoucherInnerHeading>Debit transactions</VoucherInnerHeading>
          <WhiteBtn onClick={handleAddDebitTransaction}>Add</WhiteBtn>
        </VoucherInnerHeadingContainer>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Heads</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="head"
              value={debitFieldDetails?.head}
              onChange={handleDebitInputChange}
              placeholder="Select Debit Head"
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
              {debitHeadList.map((head) => (
                <MenuItem key={head.id} value={head.id}>
                  {head.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Amount</InputLabelLead>
            <RupeeInput
              fullWidth
              name="amount"
              value={debitFieldDetails?.amount}
              onChange={handleDebitInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Description</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="description"
              value={debitFieldDetails?.description || ""}
              onChange={handleDebitInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>

        {/* Table of debit transactions */}
        {debitTransactions.length > 0 && (
          <TableContainerWithBorder>
            <Table>
              <TableHead>
                <VoucherTableHeadRow>
                  {[
                    "Sr. No.",
                    "DbHeads",
                    "DbAmount",
                    "DbDescription",
                    "Action",
                  ].map((header) => (
                    <TableHeadCell key={header}>{header}</TableHeadCell>
                  ))}
                </VoucherTableHeadRow>
              </TableHead>
              <TableBody>
                {debitTransactions.map((row, idx) => (
                  <VoucherTableBodyRow key={idx}>
                    <TableBodyCell>{idx + 1}</TableBodyCell>
                    <TableBodyCell>
                      {row?.head
                        ? debitHeadList.find((head) => head.id === row.head)
                            ?.node
                        : "-"}
                    </TableBodyCell>
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
                      {Number(row.amount).toLocaleString("en-IN")}
                    </TableBodyCell>
                    <TableBodyCell>{row.description || "-"}</TableBodyCell>
                    <TableBodyCell sx={{ borderRight: "none" }}>
                      <TableDeleteBtn
                        onClick={() => handleDeleteDebitTransaction(idx)} // ✅ Add this line
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
          <FilledButton sx={{ width: "180px" }} onClick={handleSubmit}>
            Generate
          </FilledButton>
        </Box>
      </VioletContainer>
    </FullContainer>
  );
}
