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
import { useCRM } from "../../Context/CRMContext.jsx";
import {
  GettingEmployeeTypes,
  AddingSubscriber,
  GettingCourtVoucherNumber,
  GettingSubscriber,
  GettingDebitHeads,
  GettingBank,
  GettingCreditHeads,
  DecreeAndCourtCost,
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
  VoucherInnerHeadingContainer,
  VoucherInnerHeading,
  TableDeleteBtn,
  TableContainerWithBorder,
  VoucherTableHeadRow,
  TableHeadCell,
  VoucherTableBodyRow,
  TableBodyCell,
} from "../../StyledElement.jsx";
import { CustomDatePicker, RupeeInput } from "../Reusable/Reusable.jsx";

import { WinnerDetailsApprovalConfirmModal } from "../Modals/ApprovalModals.jsx";
import { set } from "date-fns";

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

export default function DecreeAndCourtDebit() {
  const { showToast, showErrorToast } = useCRM();
  const [voucherDetails, setVoucherDetails] = useState({
    type: "debit",
    series: "DECREE",
    date: new Date().toISOString(), // today's date in ISO format
  });
  const [transactions, setTransactions] = useState([]);
  const [fieldDetails, setFieldDetails] = useState({});
  const [debitHeadList, setDebitHeadList] = useState([]);

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
      const response = await GettingCourtVoucherNumber();
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
    fetchVoucherNumber();
    fetchingDebitHeads();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["number", "amount"];

    if (name === "series" || name === "by") {
      setVoucherDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value, // keep this fallback if needed
      }));
    } else if (numericFields.includes(name)) {
      setFieldDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else {
      setFieldDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value, // keep this fallback if needed
      }));
    }
  };

  const handleSubmit = async () => {
    const payload = {
      ...voucherDetails,
      transactions,
    };
    try {
      const response = await DecreeAndCourtCost(payload);
      if (response.success) {
        setVoucherDetails({ type: "debit" });
        setTransactions([]);
        showToast(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAddTransaction = () => {
    const { head, amount, ccNumber, number, description } = fieldDetails || {};

    const isValid = amount && ccNumber && number && description;
    if (isValid) {
      setTransactions((prev) => [...prev, fieldDetails]);
      setFieldDetails({});
    } else {
      showErrorToast("Please fill all the fields before adding a transaction.");
      // optionally show UI error message
    }
  };

  const handleDeleteTransaction = (idx) => {
    setTransactions((prev) => prev.filter((_, i) => i !== idx));
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
            <InputLabelLead>Series</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="series"
              value={voucherDetails.series || ""}
              //   onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"21%"}>
            <InputLabelLead>Voucher number</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="voucher"
              value={voucherDetails.voucher || ""}
              //   onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>By</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="by"
              value={voucherDetails.by || ""}
              onChange={handleInputChange}
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
          <VoucherInnerHeading>Debit transactions</VoucherInnerHeading>
          <WhiteBtn onClick={handleAddTransaction}>Add</WhiteBtn>
        </VoucherInnerHeadingContainer>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Head</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="head"
              value={fieldDetails.head}
              onChange={handleInputChange}
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
              value={fieldDetails.amount}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>CC number</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="ccNumber"
              value={fieldDetails.ccNumber || ""}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"32.4%"}>
            <InputLabelLead>Number</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="number"
              value={fieldDetails.number || ""}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"32.4%"}>
            <InputLabelLead>Description</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="description"
              value={fieldDetails.description || ""}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
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
                    "Sr.No",
                    "Heads",
                    "Amount",
                    "CC Number",
                    "Number",
                    "Description",
                    "Action",
                  ].map((header) => (
                    <TableHeadCell key={header}>{header}</TableHeadCell>
                  ))}
                </VoucherTableHeadRow>
              </TableHead>
              <TableBody>
                {transactions.map((row, idx) => (
                  <VoucherTableBodyRow key={idx}>
                    <TableBodyCell>{idx + 1}</TableBodyCell>
                    <TableBodyCell>
                      {row?.head
                        ? debitHeadList.find((head) => head.id === row.head)
                            ?.name
                        : "-"}
                    </TableBodyCell>
                    <TableBodyCell>
                      {" "}
                      ₹ {Number(row?.amount).toLocaleString("en-IN")}
                    </TableBodyCell>
                    <TableBodyCell>{row?.ccNumber || "-"}</TableBodyCell>
                    <TableBodyCell>{row?.number || "-"}</TableBodyCell>
                    <TableBodyCell>{row?.description || "-"}</TableBodyCell>
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
          <FilledButton sx={{ width: "180px" }} onClick={handleSubmit}>
            Generate
          </FilledButton>
        </Box>
      </VioletContainer>
    </FullContainer>
  );
}
