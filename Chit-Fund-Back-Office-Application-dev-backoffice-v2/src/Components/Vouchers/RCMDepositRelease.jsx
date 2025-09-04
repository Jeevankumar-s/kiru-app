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
import { CustomDatePicker, RupeeInput } from "../Reusable/Reusable.jsx";

import {
  GettingEmployeeTypes,
  AddingSubscriber,
  GettingSubscriber,
  GettingDebitHeads,
  GettingBank,
  getAllActiveGroups,
  RCMDepositRelease,
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

export default function RCMDepositReleaseComponent() {
  const { showToast, showErrorToast } = useCRM();
  const [voucherDetails, setVoucherDetails] = useState({});
  const [groupList, setGroupList] = useState([]);
  const [bankList, setBankList] = useState([]);

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

  useEffect(() => {
    fetchingGroup();
    fetchingBank();
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
      const response = await RCMDepositRelease(voucherDetails);
      if (response.success) {
        showToast(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FullContainer>
      <Box>
        <Grid container spacing={2} display={"flex"} width={"100%"}>
          <Grid item xs={12} sm={4} width={"31%"} flexShrink={1}>
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
          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
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
          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
            <CustomDatePicker
              label="Release date"
              value={
                voucherDetails?.releaseDate
                  ? new Date(voucherDetails.releaseDate)
                  : null
              }
              onChange={(newValue) =>
                setVoucherDetails((prev) => ({
                  ...prev,
                  releaseDate:
                    newValue instanceof Date && !isNaN(newValue)
                      ? newValue.toISOString()
                      : "", // or format however you want
                }))
              }
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
            <InputLabelLead>Bank</InputLabelLead>
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

          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
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

          <Grid item xs={12} sm={4} width={"49%"}>
            <InputLabelLead>Narration</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="narration"
              value={voucherDetails.narration}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <FilledButton sx={{ width: "180px" }} onClick={handleSubmit}>
            Add
          </FilledButton>
        </Box>
      </VioletContainer>
    </FullContainer>
  );
}
