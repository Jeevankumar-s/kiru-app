"use client";

import { use, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCRM } from "../../Context/CRMContext.jsx";

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
  getAllActiveGroups,
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
  const [groupList, setGroupList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [moneyCollectorList, setMoneyCollectorList] = useState([]);
  const [subscriberList, setSubscriberList] = useState([]);
  const fetchingGroup = async () => {
    try {
      const limit = "all";
      const response = await getAllActiveGroups(limit);
      if (response.statusCode === 200) {
        setGroupList(response?.data);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchingGroup();
  }, []);
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
          <TopModuleName>Suggestion for new group</TopModuleName>

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
            <Grid container spacing={2} display={"flex"} width={"100%"}>
              <Grid item xs={12} sm={4} width={"31%"} flexShrink={1}>
                <InputLabelLead>Group name</InputLabelLead>
                <LeadDataInput
                  select
                  fullWidth
                  name="group"
                  value={subscriberDetails.group}
                  onChange={handleInputChange}
                  placeholder="Select Group"
                  variant="outlined"
                  size="small"
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return <span style={{ color: "#9e9e9e" }}>Select</span>;
                      }

                      const selectedGroup = groupList?.find(
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
                  {groupList?.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </LeadDataInput>
              </Grid>
            </Grid>
          </Box>
          <VioletContainer sx={{ mt: 2 }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
                <InputLabelLead>No of tokens</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="noOfTokens"
                  value={subscriberDetails.noOfTokens}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
                <InputLabelLead>Branch name</InputLabelLead>
                <LeadDataInput
                  select
                  fullWidth
                  name="branchName"
                  value={subscriberDetails.branchName}
                  onChange={handleInputChange}
                  placeholder="Select Branch"
                  variant="outlined"
                  size="small"
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#9e9e9e" }}>
                            Select Branch
                          </span>
                        );
                      }

                      const selectedSubscriber = branchList?.find(
                        (subscriber) => subscriber.id === selected
                      );
                      return selectedSubscriber
                        ? selectedSubscriber.name
                        : selected;
                    },
                    MenuProps: {
                      PaperProps: {
                        sx: scrollbarStyles,
                      },
                    },
                  }}
                >
                  {branchList?.map((subscriber) => (
                    <MenuItem key={subscriber.id} value={subscriber.name}>
                      {subscriber.name}
                    </MenuItem>
                  ))}
                </LeadDataInput>
              </Grid>
              <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
                <InputLabelLead>Subscriber name</InputLabelLead>
                <LeadDataInput
                  select
                  fullWidth
                  name="subscriberName"
                  value={subscriberDetails.subscriberName}
                  onChange={handleInputChange}
                  placeholder="Select Subscriber"
                  variant="outlined"
                  size="small"
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#9e9e9e" }}>
                            Select Subscriber
                          </span>
                        );
                      }

                      const selectedSubscriber = subscriberList?.find(
                        (subscriber) => subscriber.id === selected
                      );
                      return selectedSubscriber
                        ? selectedSubscriber.name
                        : selected;
                    },
                    MenuProps: {
                      PaperProps: {
                        sx: scrollbarStyles,
                      },
                    },
                  }}
                >
                  {subscriberList?.map((subscriber) => (
                    <MenuItem key={subscriber.id} value={subscriber.name}>
                      {subscriber.name}
                    </MenuItem>
                  ))}
                </LeadDataInput>
              </Grid>

              <Grid item xs={12} sm={4} width={"32%"}>
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
              <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
                <InputLabelLead>Money collector</InputLabelLead>
                <LeadDataInput
                  select
                  fullWidth
                  name="collectorName"
                  value={subscriberDetails.collectorName}
                  onChange={handleInputChange}
                  placeholder="Select Subscriber"
                  variant="outlined"
                  size="small"
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#9e9e9e" }}>
                            Select Money Collector
                          </span>
                        );
                      }

                      const selectedCollector = moneyCollectorList.find(
                        (collector) => collector.id === selected
                      );
                      return selectedCollector
                        ? selectedCollector.name
                        : selected;
                    },
                    MenuProps: {
                      PaperProps: {
                        sx: scrollbarStyles,
                      },
                    },
                  }}
                >
                  {moneyCollectorList.map((collector) => (
                    <MenuItem key={collector.id} value={collector.name}>
                      {collector.name}
                    </MenuItem>
                  ))}
                </LeadDataInput>
              </Grid>

              <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
                <InputLabelLead>Est. call no of auction</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="estimatedCallNoOfAuction"
                  value={subscriberDetails.estimatedCallNoOfAuction}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={4} width={"32%"}>
                <InputLabelLead>Est. surety document </InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="suretyDocument"
                  value={subscriberDetails.suretyDocument}
                  onChange={handleInputChange}
                  placeholder="Enter document name"
                  variant="outlined"
                  size="small"
                  rows={3}
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={4} width={"32%"}>
                <InputLabelLead>Description</InputLabelLead>
                <LeadDataInput
                  fullWidth
                  name="description"
                  value={subscriberDetails.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  variant="outlined"
                  size="small"
                  rows={3}
                  multiline
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <FilledButton sx={{ width: "180px" }}>Suggest</FilledButton>
            </Box>
          </VioletContainer>
        </StyledPaper>
      </Box>
    </Box>
  );
}
