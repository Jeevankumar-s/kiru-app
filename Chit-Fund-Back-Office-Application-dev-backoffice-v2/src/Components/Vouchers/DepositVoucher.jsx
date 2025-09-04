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
  getAllActiveGroups,
  GettingSubscriber,
  GettingDebitHeads,
  GettingBank,
  GettingCreditHeads,
  Deposit,
} from "../API/Api.jsx";
import CalenderIcon from "../../assets/calender.svg";

import PdfImage from "../../assets/PDFImage.png";
import { CustomDatePicker, RupeeInput } from "../Reusable/Reusable.jsx";

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

export default function DepositVoucher() {
  const { showToast, showErrorToast } = useCRM();
  const [voucherDetails, setVoucherDetails] = useState({});

  const [groupList, setGroupList] = useState([]);
  const [subscriberList, setSubscriberList] = useState([]);
  const [debitHeadList, setDebitHeadList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [chitList, setChitList] = useState([]);
  const [creditHeadList, setCreditHeadList] = useState([]);

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
  const fetchingSubcribers = async () => {
    try {
      const response = await GettingSubscriber(voucherDetails?.chitNumber);
      if (response.success) {
        setSubscriberList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingGroup = async () => {
    try {
      const limit = "all";
      const response = await getAllActiveGroups(limit);
      if (response.success) {
        setGroupList(response?.data);
      }
    } catch (error) {
      showErrorToast(error.message);
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
        setChitList(response?.data?.results);
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
    fetchingChit();
    fetchingBank();
    fetchingDebitHeads();
    fetchingCreditHeads();
    fetchingGroup();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["amount"];
    if (numericFields.includes(name)) {
      setVoucherDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else {
      setVoucherDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value, // keep this fallback if needed
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await Deposit(voucherDetails);
      if (response.success) {
        showToast(response.message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <FullContainer>
      <Box>
        <Grid container spacing={2} display={"flex"} width={"100%"}>
          <Grid item xs={12} sm={4} width={"32%"}>
            <InputLabelLead>Bank name</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="bank"
              value={voucherDetails.bank}
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

                  const selectedBank = bankList.find(
                    (bank) => bank.id === selected
                  );
                  return selectedBank ? selectedBank.name : selected;
                },
                MenuProps: {
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                },
              }}
            >
              {bankList.map((bank) => (
                <MenuItem key={bank.id} value={bank.id}>
                  {bank.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"32%"} flexShrink={1}>
            <InputLabelLead>Chit number</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="chitNumber"
              value={voucherDetails.chitNumber || ""}
              onChange={handleInputChange}
              placeholder="Select Chit"
              variant="outlined"
              size="small"
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9e9e9e" }}>Select</span>;
                  }
                  const selectedGroup = groupList.find(
                    (group) => group.id === selected
                  );
                  return selectedGroup ? selectedGroup.name : selected;
                },
                MenuProps: {
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                },
              }}
            >
              {groupList.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
        </Grid>
      </Box>
      {/* Form Section */}
      <VioletContainer>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Member name</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="memberName"
              value={voucherDetails.memberName || ""}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Amount</InputLabelLead>
            <RupeeInput
              fullWidth
              name="amount"
              value={voucherDetails.amount}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Chit agreement number</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="chitAgreementNumber"
              value={voucherDetails.chitAgreementNumber || ""}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Draw number</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="drawNumber"
              value={voucherDetails.drawNumber || ""}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <CustomDatePicker
              label="Draw date"
              value={
                voucherDetails?.drawDate
                  ? new Date(voucherDetails.drawDate)
                  : null
              }
              onChange={(newValue) =>
                setVoucherDetails((prev) => ({
                  ...prev,
                  drawDate:
                    newValue instanceof Date && !isNaN(newValue)
                      ? newValue.toISOString()
                      : "", // or format however you want
                }))
              }
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <CustomDatePicker
              label="Deposit date"
              value={
                voucherDetails?.depositDate
                  ? new Date(voucherDetails.depositDate)
                  : null
              }
              onChange={(newValue) =>
                setVoucherDetails((prev) => ({
                  ...prev,
                  depositDate:
                    newValue instanceof Date && !isNaN(newValue)
                      ? newValue.toISOString()
                      : "", // or format however you want
                }))
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Cheque number</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="chequeNumber"
              value={voucherDetails.chequeNumber}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Credit head</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="creditHead"
              value={voucherDetails.creditHead}
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
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Debit head</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="debitHead"
              value={voucherDetails.debitHead}
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
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <FilledButton sx={{ width: "180px" }} onClick={handleSubmit}>
            Payment
          </FilledButton>
        </Box>
      </VioletContainer>
    </FullContainer>
  );
}
