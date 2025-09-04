"use client";

import { use, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCRM } from "../../Context/CRMContext.jsx";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";

import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
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
  Chip,
  ToggleButton,
  FormControl,
  RadioGroup,
  ToggleButtonGroup,
} from "@mui/material";
// import Options from "../../assets/Options.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import { LuIndianRupee } from "react-icons/lu";
import CalenderIcon from "../../assets/calender.svg";

import {
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import {
  ChitFormApprovalByKycId,
  FormApprovalConfirmModal,
} from "../Modals/ApprovalModals.jsx";
import {
  TopContainerForAllPages,
  ReceiptOutlineBtn,
  RowValues,
  TableHeadRow,
  FilledButton,
  CommonSearchInput,
  TopModuleName,
  CurrentPageNumberText,
  PageNumberText,
  FullPageCountCalculation,
  StyledTableContainer,
  PaginationContainer,
  StyledPaper,
  BlueRadio,
  VioletContainer,
  LeadDataInput,
  InputLabelLead,
  CustomFormControlLabel,
} from "../../StyledElement.jsx";
// import Notification from "../../assets/CRMNotification.svg";
import {
  gettingAllChitForms,
  gettingChitFormDashboardStack,
} from "../API/Api.jsx";
import ArrowLeftIcon from "../../assets/paginationLeftArrow.svg";
import ArrowRightIcon from "../../assets/paginationRightArrow.svg";
import MoreIcon from "../../assets/more.svg";

const getChipStyles = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return { bg: "#FB8C00", color: "#fff" }; // Orange
    case "upcoming":
      return { bg: "#FBC02D", color: "#fff" }; // Yellow
    case "rejected":
      return { bg: "#EF5350", color: "#fff" }; // Red
    case "approved":
      return { bg: "#4CAF50", color: "#fff" }; // Green
    default:
      return { bg: "#E0E0E0", color: "#000" }; // Default gray
  }
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

export default function AddingSubscriber() {
  const { showToast, showErrorToast, openSidebar } = useCRM();
  const [subscriberDetails, setSubscriberDetails] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["commission", "totalMembers", "durationInMonths"];

    if (numericFields.includes(name)) {
      setSubscriberDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else {
      setSubscriberDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value, // keep this fallback if needed
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSubscriberDetails((prev) => ({
        ...prev,
        image: file, // Store the file object
      }));
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
        {/* Header */}

        <TopContainerForAllPages>
          <TopModuleName>Subscriber addition</TopModuleName>

          {/* <IconButton sx={{ color: "white", "&:hover": { color: "#007bff" } }}>
            <img
              src={Notification}
              alt="Notification"
              style={{ size: "20px" }}
            />
          </IconButton> */}
          {/* <NotificationsNoneRoundedIcon sx={{ color: "#8654e0" }} /> */}
        </TopContainerForAllPages>

        {/* Lead Status Cards */}

        {/* New Leads Section */}
        <StyledPaper>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              {/* Show text only if no image */}
              {!subscriberDetails?.image ? (
                <InputLabelLead sx={{ fontSize: "18px" }}>
                  Subscriber photo
                </InputLabelLead>
              ) : (
                <Box
                  component="img"
                  src={URL.createObjectURL(subscriberDetails.image)}
                  alt="Subscriber"
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              )}
              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="subscriber-image-upload"
                onChange={handleFileChange}
              />

              {/* Trigger Button */}
              <label htmlFor="subscriber-image-upload">
                <ReceiptOutlineBtn
                  component="span"
                  sx={{ minHeight: "32px", px: 3 }}
                >
                  Choose file
                </ReceiptOutlineBtn>
              </label>
            </Box>
            <Grid container spacing={2} display={"flex"}>
              <Grid item xs={12} sm={4} width={"35%"} flexShrink={1}>
                <InputLabelLead sx={{ fontSize: "18px" }}>
                  Subscriber type
                </InputLabelLead>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    name="status"
                    value={subscriberDetails.status}
                    // onChange={handleChange}
                    sx={{
                      gap: 2, // spacing between options
                      flexWrap: "nowrap", // optional: prevents wrapping to next line
                    }}
                  >
                    <CustomFormControlLabel
                      value="individual"
                      control={<BlueRadio color="primary" />}
                      label="Individual"
                    />
                    <CustomFormControlLabel
                      value="company"
                      control={<BlueRadio color="primary" />}
                      label="Company"
                    />
                    <CustomFormControlLabel
                      value="partnership"
                      control={<BlueRadio color="primary" />}
                      label="Partnership"
                    />
                    <CustomFormControlLabel
                      value="proprietorship"
                      control={<BlueRadio color="primary" />}
                      label="Proprietorship"
                    />
                    <CustomFormControlLabel
                      value="llp"
                      control={<BlueRadio color="primary" />}
                      label="LLP"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <VioletContainer sx={{ mt: 2 }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Subscriber name</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="subscriberName"
                  value={subscriberDetails.subscriberName}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Subscriber name</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="subscriberName"
                  value={subscriberDetails.subscriberName}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Phone number</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="phoneNumber"
                  value={subscriberDetails.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="55500 00000"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Email ID</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="email"
                  value={subscriberDetails.email}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>PAN number</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="panNumber"
                  value={subscriberDetails.panNumber}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Aadhar number</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="aadharNumber"
                  value={subscriberDetails.aadharNumber}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <CustomDatePicker
                  label="DOB"
                  value={
                    subscriberDetails.dob
                      ? new Date(subscriberDetails.dob)
                      : null
                  }
                  onChange={(newValue) =>
                    setSubscriberDetails((prev) => ({
                      ...prev,
                      dob:
                        newValue instanceof Date && !isNaN(newValue)
                          ? newValue.toISOString()
                          : "", // or format however you want
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Profession</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="profession"
                  value={subscriberDetails.profession}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Employee type</InputLabelLead>
                <LeadDataInput
                  select
                  fullWidth
                  name="employeeType"
                  value={subscriberDetails.employeeType}
                  onChange={handleInputChange}
                  placeholder="Select Employee Type"
                  variant="outlined"
                  size="small"
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#9e9e9e" }}>
                            Select Employee Type
                          </span>
                        );
                      }

                      // const selectedNumber = listOfTokens.find(
                      //   (token) => token.id === selected
                      // );
                      // return selectedNumber ? selectedNumber.name : selected;
                    },
                    MenuProps: {
                      PaperProps: {
                        sx: scrollbarStyles,
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Employee Type
                  </MenuItem>
                  <MenuItem value="Salaried">Salaried</MenuItem>
                  <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                </LeadDataInput>
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Company name</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="companyName"
                  value={subscriberDetails.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Designation</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="designation"
                  value={subscriberDetails.designation}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Income (monthly)</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="income"
                  value={subscriberDetails.income}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"27%"}>
                <InputLabelLead>Residential address</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="residentialAddress"
                  value={subscriberDetails.residentialAddress}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                  rows={3}
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"27%"}>
                <InputLabelLead>Permanent address</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="permanentAddress"
                  value={subscriberDetails.permanentAddress}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                  rows={3}
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"27%"}>
                <InputLabelLead>Company address</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="permanentAddress"
                  value={subscriberDetails.permanentAddress}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                  rows={3}
                  multiline
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Sales Tax Reg. No.(TNGST)</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="salesTaxRegNo"
                  value={subscriberDetails.salesTaxRegNo}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>C.S.T.Reg. No.</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="cstRegNo"
                  value={subscriberDetails.cstRegNo}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Income Tax P.A.No.</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="incomeTaxPANo"
                  value={subscriberDetails.incomeTaxPANo}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                <InputLabelLead>Bank</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="bank"
                  value={subscriberDetails.bank}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={4} width={"24%"}>
                <InputLabelLead>Branch of bank</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="branchOfBank"
                  value={subscriberDetails.branchOfBank}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"24%"}>
                <InputLabelLead>Saving/current account number</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="savingAccountNo"
                  value={subscriberDetails.savingAccountNo}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <FilledButton sx={{ width: "180px" }}>
                Add Subscriber
              </FilledButton>
            </Box>
          </VioletContainer>
        </StyledPaper>
      </Box>
    </Box>
  );
}
