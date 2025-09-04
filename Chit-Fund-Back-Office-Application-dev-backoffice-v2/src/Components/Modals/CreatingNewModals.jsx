import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  Tabs,
  Tab,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  InputAdornment,
  Divider,
  Chip,
  Modal,
  FormGroup,
  Icon,
  Menu,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CalenderIcon from "../../assets/calender.svg";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";

import { useCRM } from "../../Context/CRMContext.jsx";
import FilterIcon from "../../assets/filter.svg";
import TickIcon from "../../assets/TickIconCRM.svg";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "../../assets/searchIcon.svg";
import CloseIcon from "../../assets/CloseButtonIcon.svg";
import {
  createNewGroup,
  SchedulingAuction,
  getAllActiveGroups,
  getAllChitPlans,
  getAllBranches,
  StartAuction,
} from "../API/Api.jsx"; // adjust import path as needed
import ChitFormApprovalIcon from "../../assets/ApproveConfirmation.svg";
import dropdownIcon from "../../assets/dropdownIcon.svg";

import {
  FilledButton,
  FormContent,
  FormRow,
  LeadDataInput,
  InputLabelLead,
  OutlineButton,
  ModalContainer,
  StyledFilterImage,
  CommonSearchInput,
  StyledCheckbox,
  StyledSelect,
  FilterFilledButton,
  FilterOutlinedButton,
  FilterModalHeading,
  CustomFormControlLabel,
  FilterModalSpecificContainer,
  FilterModalCommonHeading,
  ModalHeader,
  UploadArea,
  UploadButton,
  CommonModalHeading,
  StyledDialogContent,
  ActionBtnContainer,
  ModalFilledBtn,
  ModalOutlineBtn,
  StyledOutlinedInput,
  StyledSubscriberName,
} from "../../StyledElement.jsx";

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

const DropdownIcon = (props) => (
  <img
    src={dropdownIcon}
    alt="dropdown"
    style={{ width: "24px", height: "24px", marginRight: 9, marginTop: "-3px" }}
    {...props}
  />
);

const CreatingNewGroup = ({ open, onClose }) => {
  const { showToast, showErrorToast } = useCRM();
  const [errorMessage, setErrorMessage] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const [chitPlanList, setChitPlanList] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    branch: "",
    chitPlan: "",
    // collectionDate: "",
    dueDate: "",
    status: "Active",
    chitCategory: "Monthly",
    commission: 5,
    totalMembers: null,
    durationInMonths: null,
    chitValue: "",
    // startDate: "",
    remarks: "",

    // FDR And PSO Info (optional)
    psoOrderNumber: "",
    psoDrOffice: "",
    psoOrderDate: "", // IsoDateFormat
    csBank: "",
    csFdrNumber: "",
    csBankPlace: "",
    fdCommencement: "", // IsoDateFormat
    fdInterest: "",
    fdAmount: "",
    fdMaturity: "", // IsoDateFormat
    fdPeriod: null,

    // Agreement And Auction Info (optional)
    chitAgreementNumber: "",
    dateOfAgreement: "", // IsoDateFormat
    startDate: "", // IsoDateFormat
    chitTerminationDate: "", // IsoDateFormat
    firstAuctionDate: "", // IsoDateFormat
    secondAuctionDate: "", // IsoDateFormat
    auctionStartTime: "",
    auctionEndTime: "",
  });

  const fetchingBranch = async () => {
    try {
      const limit = "all";
      const response = await getAllBranches(limit);
      if (response.statusCode === 200) {
        setBranchList(response.data);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const fetchChitPlans = async () => {
    try {
      const limit = "all";
      const response = await getAllChitPlans(limit);
      if (response.statusCode === 200) {
        setChitPlanList(response.data);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchChitPlans();
    fetchingBranch();
  }, [open]);

  const handleSave = async () => {
    try {
      // Check if any field in userDetails is empty (excluding whitespace)
      const hasEmptyField = Object.entries(userDetails).some(
        ([key, value]) =>
          value === "" || (typeof value === "string" && value.trim() === "")
      );

      // if (hasEmptyField) {
      //   console.log("user details", userDetails);
      //   showErrorToast("Please fill in all the fields before creating.");
      //   return;
      // }

      const response = await createNewGroup(userDetails);
      if (response.success) {
        showToast(response.message);
        setUserDetails({
          name: "",
          branch: "",
          chitPlan: "",
          // collectionDate: "",
          dueDate: "",
          status: "Active",
          chitCategory: "Monthly",
          commission: 5,
          totalMembers: null,
          durationInMonths: null,
          chitValue: "",
          // startDate: "",
          remarks: "",

          // FDR And PSO Info (optional)
          psoOrderNumber: "",
          psoDrOffice: "",
          psoOrderDate: "", // IsoDateFormat
          csBank: "",
          csFdrNumber: "",
          csBankPlace: "",
          fdCommencement: "", // IsoDateFormat
          fdInterest: "",
          fdAmount: "",
          fdMaturity: "", // IsoDateFormat
          fdPeriod: 20,

          // Agreement And Auction Info (optional)
          chitAgreementNumber: "",
          dateOfAgreement: "", // IsoDateFormat
          startDate: "", // IsoDateFormat
          chitTerminationDate: "", // IsoDateFormat
          firstAuctionDate: "", // IsoDateFormat
          secondAuctionDate: "", // IsoDateFormat
          auctionStartTime: "",
          auctionEndTime: "",
        });
        setErrorMessage("");
        onClose();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["commission", "totalMembers", "durationInMonths"];

    const dateFields = [
      "dueDate",
      "startDate",
      "secondAuctionDate",
      "firstAuctionDate",
      "chitTerminationDate",
      "dateOfAgreement",
      "fdMaturity",
      "fdCommencement",
      "psoOrderDate",
    ];

    const timeFields = ["auctionStartTime", "auctionEndTime"];

    if (name === "chitPlan") {
      const selectedChit = chitPlanList.find((chit) => chit.id === value);
      setUserDetails((prevData) => ({
        ...prevData,
        chitPlan: value,
        totalMembers: selectedChit?.durationInMonths || "",
        durationInMonths: selectedChit?.durationInMonths || "",
        chitValue: selectedChit?.chitValue || "", // update chitValue too
      }));
    } else if (numericFields.includes(name)) {
      setUserDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else if (dateFields.includes(name)) {
      const isoDate = new Date(value).toISOString(); // Converts "2026-01-10" to "2026-01-10T00:00:00.000Z"
      setUserDetails((prevData) => ({
        ...prevData,
        [name]: isoDate,
      }));
    } else if (timeFields.includes(name)) {
      // value will be "13:45" -> convert to "13:45:00.000"
      const timeWithSeconds = `${value}:00.000`;
      setUserDetails((prevData) => ({
        ...prevData,
        [name]: timeWithSeconds,
      }));
    } else {
      setUserDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value, // keep this fallback if needed
      }));
    }
  };

  const handleTabChange = (e, newVal) => {
    setTabValue(newVal);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          // px: 2,
          // pb: 2,
          px: 4,
          pb: 3,
          pt: 1,
        },
      }}
    >
      <Box>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
            px: 0,
            borderRadius: "16px 16px 0 0",
          }}
        >
          <CommonModalHeading>Add New Group</CommonModalHeading>
          <IconButton onClick={onClose}>
            <img src={CloseIcon} alt="closeIcon" />
          </IconButton>
        </DialogTitle>

        <Box>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="profile tabs"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#1a237e",
                height: 3,
              },
            }}
          >
            <Tab
              label="Group Details"
              sx={{
                fontSize: "18px",
                fontWeight: tabValue === 0 ? "bold" : "normal",
                color: tabValue === 0 ? "#1a237e" : "inherit",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#1a237e",
                },
              }}
            />
            <Tab
              label="FDR & PSO"
              sx={{
                fontSize: "18px",

                fontWeight: tabValue === 1 ? "bold" : "normal",
                color: tabValue === 1 ? "#1a237e" : "inherit",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#1a237e",
                },
              }}
            />
            <Tab
              label="Agreement and Auction Details"
              sx={{
                fontSize: "18px",
                fontWeight: tabValue === 2 ? "bold" : "normal",
                color: tabValue === 2 ? "#1a237e" : "inherit",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#1a237e",
                },
              }}
            />
          </Tabs>
        </Box>
        <StyledDialogContent>
          {tabValue === 0 && (
            <TabContext value={tabValue}>
              <TabPanel value={tabValue} index={0} sx={{ p: 0 }}>
                <Box
                  sx={{
                    backgroundColor: "#F9F9FF",
                    p: 2,
                    borderRadius: 3,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* First name */}
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Group name</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="Name"
                          name="name"
                          value={userDetails.name}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      </FormControl>
                    </Grid>

                    {/* branch */}
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Branch</InputLabelLead>

                      <LeadDataInput
                        select
                        fullWidth
                        name="branch"
                        value={userDetails.branch}
                        onChange={handleInputChange}
                        placeholder="Select Branch"
                        variant="outlined"
                        size="small"
                        SelectProps={{
                          displayEmpty: true,
                          IconComponent: DropdownIcon, // ✅ works now
                          renderValue: (selected) => {
                            if (!selected) {
                              return (
                                <span style={{ color: "#9e9e9e" }}>
                                  Select Branch
                                </span>
                              );
                            }

                            const selectedBranch = branchList.find(
                              (branch) => branch.id === selected
                            );
                            return selectedBranch
                              ? selectedBranch.name
                              : selected;
                          },
                          MenuProps: {
                            PaperProps: {
                              sx: scrollbarStyles,
                            },
                          },
                        }}
                      >
                        {branchList.map((branch) => (
                          <MenuItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </MenuItem>
                        ))}
                      </LeadDataInput>
                    </Grid>

                    {/* chit plan */}
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Chit plan</InputLabelLead>
                      <FormControl fullWidth size="small">
                        <StyledSelect
                          name="chitPlan"
                          value={userDetails.chitPlan}
                          onChange={handleInputChange}
                          displayEmpty
                          input={<StyledOutlinedInput />}
                          MenuProps={{
                            PaperProps: {
                              sx: scrollbarStyles,
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Chit Plan
                          </MenuItem>
                          {chitPlanList.length > 0 &&
                            chitPlanList.map((chit) => (
                              <MenuItem key={chit.id} value={chit.id}>
                                {chit.name}
                              </MenuItem>
                            ))}
                        </StyledSelect>
                      </FormControl>
                    </Grid>

                    {/* chit value */}
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Chit value</InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        name="chitValue"
                        value={userDetails.chitValue}
                        // onChange={handleInputChange}
                        placeholder="Chit Value"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    {/* 
                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>Collection Date</InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        name="collectionDate"
                        type="date"
                        value={userDetails.collectionDate}
                        size="small"
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box> */}

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>Due Date</InputLabelLead>

                      <CustomDatePicker
                        label="Start date"
                        value={
                          userDetails.dueDate
                            ? new Date(userDetails.dueDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            dueDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                    </Box>

                    <Grid item xs={12} sm={6} width={"31%"}>
                      <InputLabelLead>Chit Category</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <StyledSelect
                          value={userDetails.chitCategory}
                          name="chitCategory"
                          onChange={handleInputChange}
                          input={<StyledOutlinedInput />}
                          // IconComponent={KeyboardArrowDownIcon}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200, // Set fixed height for dropdown
                              },
                            },
                          }}
                          displayEmpty
                        >
                          <MenuItem disabled value="">
                            Select Chit Category
                          </MenuItem>
                          <MenuItem value="Monthly">Monthly</MenuItem>
                          <MenuItem value="Biweekly">Biweekly</MenuItem>
                          <MenuItem value="Trimonthly">Trimonthly</MenuItem>
                          <MenuItem value="Fortnightly">Fortnightly</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>

                    {/* Commission */}
                    <Grid item xs={12} sm={6} width={"31%"}>
                      <InputLabelLead>Commission (In percent)</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <StyledSelect
                          value={userDetails.commission}
                          name="commission"
                          onChange={handleInputChange}
                          input={<StyledOutlinedInput />}
                          // IconComponent={KeyboardArrowDownIcon}

                          displayEmpty
                        >
                          <MenuItem disabled value="">
                            Select Commission
                          </MenuItem>
                          <MenuItem value="5">5 %</MenuItem>
                          <MenuItem value="6">6 %</MenuItem>
                          <MenuItem value="7">7 %</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Total Members</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="Total Members"
                          name="totalMembers"
                          value={userDetails.totalMembers}
                          // onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Duration (In month)</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="Duration"
                          name="durationInMonths"
                          value={userDetails.durationInMonths}
                          // onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                    </Grid>
                    {/* 
                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>Start Date</InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        name="startDate"
                        type="date"
                        value={userDetails.startDate}
                        size="small"
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box> */}

                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Remarks</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="Remarks"
                          name="remarks"
                          value={userDetails.remarks}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  {errorMessage && (
                    <Typography
                      style={{
                        color: "red",
                        fontSize: "14px",
                        marginTop: "15px",
                      }}
                    >
                      {errorMessage}
                    </Typography>
                  )}
                </Box>
              </TabPanel>
            </TabContext>
          )}

          {tabValue === 1 && (
            <TabContext value={tabValue}>
              <TabPanel value={tabValue} index={1} sx={{ p: 0 }}>
                <Box
                  sx={{
                    backgroundColor: "#F9F9FF",
                    p: 2,
                    borderRadius: 3,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* First name */}
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>PSO Order Number</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="PSO Order Number"
                          name="psoOrderNumber"
                          value={
                            userDetails.psoOrderNumber
                              ? new Date(userDetails.psoOrderNumber)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      </FormControl>
                    </Grid>

                    {/* chit value */}
                    

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>PSO Order Date</InputLabelLead>
                      <CustomDatePicker
                        label="Start date"
                        value={
                          userDetails.psoOrderDate
                            ? new Date(userDetails.psoOrderDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            psoOrderDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                    </Box>

                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>PSO DR Office</InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        name="psoDrOffice"
                        value={userDetails.psoDrOffice}
                        onChange={handleInputChange}
                        placeholder="PSO DR Office"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>CS_FDR Number</InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        name="csFdrNumber"
                        value={userDetails.csFdrNumber}
                        onChange={handleInputChange}
                        placeholder="CS_FDR Number"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>CS Bank</InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        name="csBank"
                        value={userDetails.csBank}
                        onChange={handleInputChange}
                        placeholder="CS Bank"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>CS Bank Place</InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        name="csBankPlace"
                        value={userDetails.csBankPlace}
                        onChange={handleInputChange}
                        placeholder="CS Bank Place"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>FD Commencement</InputLabelLead>
                      <CustomDatePicker
                        label="Start date"
                        value={
                          userDetails.fdCommencement
                            ? new Date(userDetails.fdCommencement)
                            : null
                        }
                        onChange={(newValue) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            fdCommencement:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                    </Box>

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>FD Maturity</InputLabelLead>
                      <CustomDatePicker
                        label="Start date"
                        value={
                          userDetails.fdMaturity
                            ? new Date(userDetails.fdMaturity)
                            : null
                        }
                        onChange={(newValue) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            fdMaturity:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                    </Box>

                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>FD Amount</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="FD Amount"
                          name="fdAmount"
                          value={userDetails.fdAmount}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    mt={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>FD Interest</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="FD Interest"
                          name="fdInterest"
                          value={userDetails.fdInterest}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4} ml={2} width={"31%"}>
                      <InputLabelLead>FD Period</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="FD Period"
                          name="fdPeriod"
                          value={userDetails.fdPeriod}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  {errorMessage && (
                    <Typography
                      style={{
                        color: "red",
                        fontSize: "14px",
                        marginTop: "15px",
                      }}
                    >
                      {errorMessage}
                    </Typography>
                  )}
                </Box>
              </TabPanel>
            </TabContext>
          )}

          {tabValue === 2 && (
            <TabContext value={tabValue}>
              <TabPanel value={tabValue} index={2} sx={{ p: 0 }}>
                <Box
                  sx={{
                    backgroundColor: "#F9F9FF",
                    p: 2,
                    borderRadius: 3,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* First name */}
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Chit Agreement Number</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="Chit Agreement Number"
                          name="chitAgreementNumber"
                          value={userDetails.chitAgreementNumber}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      </FormControl>
                    </Grid>

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>Date of Agreement</InputLabelLead>
                      <CustomDatePicker
                        label="Start date"
                        value={
                          userDetails.dateOfAgreement
                            ? new Date(userDetails.dateOfAgreement)
                            : null
                        }
                        onChange={(newValue) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            dateOfAgreement:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                    </Box>

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>Chit Commencement Date</InputLabelLead>
                      <CustomDatePicker
                        label="Start date"
                        value={
                          userDetails.startDate
                            ? new Date(userDetails.startDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            startDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                    </Box>

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>Chit Termination Date</InputLabelLead>
                      <CustomDatePicker
                        label="Start date"
                        value={
                          userDetails.chitTerminationDate
                            ? new Date(userDetails.chitTerminationDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            chitTerminationDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                    </Box>

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>First Auction Date</InputLabelLead>
                      <CustomDatePicker
                        label="Start date"
                        value={
                          userDetails.firstAuctionDate
                            ? new Date(userDetails.firstAuctionDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            firstAuctionDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                    </Box>

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>Second Auction Date</InputLabelLead>
                      <CustomDatePicker
                        label="Start date"
                        value={
                          userDetails.secondAuctionDate
                            ? new Date(userDetails.secondAuctionDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            secondAuctionDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                    </Box>
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    mt={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Grid item xs={6} width={"31%"}>
                      <InputLabelLead>Auction Start Time</InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        type="time"
                        size="small"
                        name="auctionStartTime"
                        value={userDetails.auctionStartTime?.slice(0, 5) || ""}
                        onChange={handleInputChange}
                        // InputProps={{
                        //   endAdornment: <img src={AlarmIcon} alt="alarmIcon" />,
                        // }}
                      />
                    </Grid>

                    <Grid item xs={6} ml={2} width={"31%"}>
                      <InputLabelLead>Auction End Time</InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        type="time"
                        size="small"
                        name="auctionEndTime"
                        value={userDetails.auctionEndTime?.slice(0, 5) || ""}
                        onChange={handleInputChange}
                        // InputProps={{
                        //   endAdornment: <img src={AlarmIcon} alt="alarmIcon" />,
                        // }}
                      />
                    </Grid>
                  </Grid>

                  {errorMessage && (
                    <Typography
                      style={{
                        color: "red",
                        fontSize: "14px",
                        marginTop: "15px",
                      }}
                    >
                      {errorMessage}
                    </Typography>
                  )}
                </Box>
              </TabPanel>
            </TabContext>
          )}

          <Box gap={2} mt={3}>
            <FilledButton
              sx={{ width: "30%" }}
              onClick={handleSave}
              variant="contained"
            >
              Create Group
            </FilledButton>
          </Box>
        </StyledDialogContent>
      </Box>
    </Dialog>
  );
};

const ScheduleAuction = ({ open, onClose }) => {
  const [groupList, setGroupList] = useState([]);
  const { showToast, showErrorToast } = useCRM();
  const [formData, setFormData] = useState({
    group: "",
    startDate: "",
    startTime: "",
    endTime: "",
    lowestBidRange: "",
    highestBidRange: "",
    stepValue1: "",
    stepValue2: "",
    stepValue3: "",
    stepValue4: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const convertToISOString = (dateStr, timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date(dateStr);
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
  };

  const handleCreate = async () => {
    try {
      const payload = {
        startTime: convertToISOString(formData.startDate, formData.startTime),
        endTime: convertToISOString(formData.startDate, formData.endTime),
        bidRange: {
          min: Number(formData.lowestBidRange),
          max: Number(formData.highestBidRange),
        },
        startDate: formData.startDate,
        stepValues: [
          Number(formData.stepValue1),
          Number(formData.stepValue2),
          Number(formData.stepValue3),
          Number(formData.stepValue4),
        ],
        groupId: formData.group,
      };
      const response = await SchedulingAuction(payload);
      // showToast("Task created successfully"); // custom toast handler
      if (response) {
        showToast(response.message);
      }
      setFormData({
        group: "",
        startDate: "",
        startTime: "",
        endTime: "",
        lowestBidRange: "",
        highestBidRange: "",
        stepValue1: "",
        stepValue2: "",
        stepValue3: "",
        stepValue4: "",
      });
      onClose(); // close modal
    } catch (error) {
      showErrorToast(error.message); // optional: error toast
    }
  };

  const fetchingBranch = async () => {
    const response = await getAllActiveGroups();
    setGroupList(response?.data);
  };

  useEffect(() => {
    fetchingBranch();
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          px: 4,
          pb: 3,
          pt: 1,
        },
      }}
      sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: "400px" } }}
    >
      <DialogTitle
        sx={{
          px: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography fontSize={"24px"} fontWeight={600} color="#212890">
            Schedule auction
          </Typography>
        </div>
        <IconButton onClick={onClose}>
          <img src={CloseIcon} alt="closeIcon" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          padding: "16px",
          backgroundColor: "#F9F9FF",
          borderRadius: "12px",
        }}
      >
        <Box gap={2} mt={1}>
          <Box sx={{ width: "100%", marginBottom: "10px" }}>
            <InputLabelLead>Grpup</InputLabelLead>
            <FormControl fullWidth variant="outlined" size="small">
              <StyledSelect
                value={formData.group}
                onChange={(e) => handleChange("group", e.target.value)}
                displayEmpty
                input={<StyledOutlinedInput />}
                MenuProps={{
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                }}
              >
                <MenuItem disabled value="">
                  Select Group
                </MenuItem>
                {groupList &&
                  groupList.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
              </StyledSelect>
            </FormControl>
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputLabelLead>Start Date</InputLabelLead>
            {/* <LeadDataInput
              fullWidth
              name="startDate"
              type="date"
              value={formData.startDate}
              size="small"
              onChange={(e) => handleChange("startDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            /> */}

            <CustomDatePicker
              label="Start date"
              value={formData.startDate ? new Date(formData.startDate) : null}
              onChange={(newValue) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate:
                    newValue instanceof Date && !isNaN(newValue)
                      ? newValue.toISOString()
                      : "", // or format however you want
                }))
              }
            />
          </Box>
        </Box>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6} sx={{ width: "48%" }}>
            <InputLabelLead>Start Time</InputLabelLead>
            <LeadDataInput
              type="time"
              size="small"
              fullWidth
              value={formData.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
              // InputProps={{
              //   endAdornment: <img src={CalenderIcon} alt="calendarIcon" />,
              // }}
            />
          </Grid>

          <Grid item xs={6} flexGrow={1}>
            <InputLabelLead>End Time</InputLabelLead>
            <LeadDataInput
              fullWidth
              type="time"
              size="small"
              value={formData.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
              // InputProps={{
              //   endAdornment: <img src={AlarmIcon} alt="alarmIcon" />,
              // }}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" gap={2} mt={1}>
          <Box sx={{ width: "50%" }}>
            <InputLabelLead>Lowest bid range</InputLabelLead>
            <FormControl fullWidth variant="outlined" size="small">
              <LeadDataInput
                type="text"
                size="small"
                value={formData.lowestBidRange}
                onChange={(e) => handleChange("lowestBidRange", e.target.value)}
                placeholder="Enter lowest bid range"
              />
            </FormControl>
          </Box>
          <Box sx={{ width: "50%" }}>
            <InputLabelLead>Highest bid range</InputLabelLead>
            <FormControl fullWidth variant="outlined" size="small">
              <LeadDataInput
                type="text"
                size="small"
                value={formData.highestBidRange}
                onChange={(e) =>
                  handleChange("highestBidRange", e.target.value)
                }
                placeholder="Enter highest bid range"
              />
            </FormControl>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={2} mt={1}>
          <Box sx={{ width: "50%" }}>
            <InputLabelLead>Step value 1</InputLabelLead>
            <FormControl fullWidth variant="outlined" size="small">
              <LeadDataInput
                type="text"
                size="small"
                value={formData.stepValue1}
                onChange={(e) => handleChange("stepValue1", e.target.value)}
                placeholder="Enter step value 1"
              />
            </FormControl>
          </Box>
          <Box sx={{ width: "50%" }}>
            <InputLabelLead>Step value 2</InputLabelLead>
            <FormControl fullWidth variant="outlined" size="small">
              <LeadDataInput
                type="text"
                size="small"
                value={formData.stepValue2}
                onChange={(e) => handleChange("stepValue2", e.target.value)}
                placeholder="Enter step value 2"
              />
            </FormControl>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={2} mt={1}>
          <Box sx={{ width: "50%" }}>
            <InputLabelLead>Step value 3</InputLabelLead>
            <FormControl fullWidth variant="outlined" size="small">
              <LeadDataInput
                type="text"
                size="small"
                value={formData.stepValue3}
                onChange={(e) => handleChange("stepValue3", e.target.value)}
                placeholder="Enter step value 3"
              />
            </FormControl>
          </Box>
          <Box sx={{ width: "50%" }}>
            <InputLabelLead>Step value 4</InputLabelLead>
            <FormControl fullWidth variant="outlined" size="small">
              <LeadDataInput
                type="text"
                size="small"
                value={formData.stepValue4}
                onChange={(e) => handleChange("stepValue4", e.target.value)}
                placeholder="Enter step value 4"
              />
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      <ActionBtnContainer
        sx={{
          pl: 0,
          pb: 1,
          marginTop: "24px",
          justifyContent: "space-between",
          width: "auto",
        }}
      >
        <ModalOutlineBtn
        // onClick={handleClose}
        >
          Cancel
        </ModalOutlineBtn>
        <ModalFilledBtn onClick={handleCreate}>Schedule</ModalFilledBtn>
      </ActionBtnContainer>
    </Dialog>
  );
};

const StartingAuction = ({
  open,
  onClose,
  selectedAuctionId,
  selectedAuctionName,
}) => {
  const { showToast, showErrorToast } = useCRM();

  const handleApprove = async () => {
    try {
      const payload = {
        status: "Live",
      };
      const response = await StartAuction(selectedAuctionId, payload);
      if (response.statusCode === 200) {
        showToast(response.message);
        onClose();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          py: 3,
          px: 4,
          width: 400, // adjust based on your needs
        },
      }}
    >
      <Box
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <img
          src={ChitFormApprovalIcon}
          alt="Benchmarking-icon"
          height="34px"
          width="40px"
        />
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: "20px", whiteSpace: "nowrap" }}
          >
            Start Auction
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 500, fontSize: "15px" }}>
          Are you sure you want to Start Auction{" "}
          <span style={{ fontWeight: 600 }}>{selectedAuctionName}</span> ?
        </Typography>
        <Box
          sx={{
            marginTop: "6px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: "11px",
          }}
        >
          <OutlineButton fullWidth onClick={() => onClose()}>
            Cancel
          </OutlineButton>
          <FilledButton fullWidth onClick={() => handleApprove()}>
            Start
          </FilledButton>
        </Box>
      </Box>
    </Dialog>
  );
};

const AddingNominee = ({ open, onClose }) => {
  const [nomineeDetails, setNomineeDetails] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNomineeDetails((prevData) => ({
      ...prevData,
      [name]: value === "" ? " " : value, // Replace empty string with space
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          px: 3,
          pb: 2,
          pt: 1,
          width: "700px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 0,
          py: 2,
          pb: 0,
        }}
      >
        <CommonModalHeading>Add nominee</CommonModalHeading>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => onClose()}
          aria-label="close"
        >
          <img src={CloseIcon} alt="closeIcon" />
        </IconButton>
      </DialogTitle>

      <StyledSubscriberName px={2} mb={1}>
        Subscriber: <span style={{ color: "#424242" }}>John Doe</span>
      </StyledSubscriberName>

      <DialogContent
        sx={{
          padding: "16px",
          backgroundColor: "#F9F9FF",
          borderRadius: "12px",
        }}
      >
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Nominee name</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="subscriberName"
              value={nomineeDetails.subscriberName}
              onChange={handleInputChange}
              placeholder="Enter name"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Age</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="age"
              value={nomineeDetails.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Phone number</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="phoneNumber"
              value={nomineeDetails.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Relation</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="relation"
              value={nomineeDetails.relation}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <InputLabelLead>Address</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="address"
              value={nomineeDetails.address}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <ActionBtnContainer
        sx={{
          pl: 0,
          pb: 1,
          marginTop: "24px",
          // width: "auto",
        }}
      >
        <ModalOutlineBtn
        // onClick={handleClose}
        >
          Cancel
        </ModalOutlineBtn>
        <ModalFilledBtn>Add</ModalFilledBtn>
      </ActionBtnContainer>
    </Dialog>
  );
};

export { CreatingNewGroup, ScheduleAuction, StartingAuction, AddingNominee };
