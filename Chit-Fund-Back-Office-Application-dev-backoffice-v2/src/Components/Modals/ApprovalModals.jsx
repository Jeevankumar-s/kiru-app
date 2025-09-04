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
  TableBody,
  Radio,
  FormControlLabel,
  Box,
  InputAdornment,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  Paper,
  Menu,
} from "@mui/material";
import { useCRM } from "../../Context/CRMContext.jsx";
import PdfImage from "../../assets/PDFImage.png";
import Image from "../../assets/imagePlaceholder.png";
import ExcelIcon from "../../assets/excel.png";
import WordIcon from "../../assets/word.png";
import FileIcon from "../../assets/file.png";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TickIcon from "../../assets/TickIconCRM.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "../../assets/CloseButtonIcon.svg";
import {
  gettingKycDetailsById,
  getAllActiveGroups,
  ChitFormAddingToGroup,
  ApproveReceivedDocuments,
  ApproveGuarantorAndBankDetails,
  gettingExecutiveReport,
} from "../API/Api.jsx";
import {
  InputLabelLead,
  StyledSelect,
  OutlineButton,
  FilledButton,
  LeadDataInput,
  ModalFilledBtn,
  ModalOutlineBtn,
  ActionBtnContainer,
  StyledDialogContent,
  StyledOutlinedInput,
  CommonModalHeading,
  FilterOutlinedButton,
  FilterFilledButton,
  ConfirmationModalLabel,
  ModalStyledTabs,
  ModalStyledTab,
  StyledTabPanel,
  VoucherTableBodyRow,
  VoucherTableHeadRow,
  TableContainerWithBorder,
} from "../../StyledElement.jsx";
import ChitFormApprovalIcon from "../../assets/ApproveConfirmation.svg";

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

const ChitFormApprovalByKycId = ({
  open,
  onClose,
  kycId,
  setSelectedName,
  setSelectedGroupId,
  setIsOpenConfirmationModal,
  subcriptionId,
  setApprovingSign,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const { showToast, showErrorToast } = useCRM();
  const [selectedGrpId, setSelectedGrpId] = useState(null);
  const [kycDetails, setKycDetails] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [executiveReport, setExecutiveReport] = useState(null);

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

  const fetchKycDetailsById = async () => {
    try {
      const response = await gettingKycDetailsById(kycId); // Replace with your API endpoint
      if (response.statusCode === 200) {
        setKycDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching kyc details:", error);
    }
  };

  const fetchExecutiveReport = async () => {
    try {
      const response = await gettingExecutiveReport(subcriptionId); // Replace with your API endpoint
      if (response.statusCode === 200) {
        setExecutiveReport(response.data);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchingGroup();
    fetchKycDetailsById();
    fetchExecutiveReport();
  }, [open]);

  const handleTabChange = (e, newVal) => {
    setTabValue(newVal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKycDetails((prevData) => ({
      ...prevData,
      [name]: value === "" ? " " : value, // Replace empty string with space
    }));
  };

  const handleApprove = async (status) => {
    try {
      if (status === "Approved") {
        if (!selectedGrpId) {
          showErrorToast("Please select a group before processing.");
          return;
        }
        const selectedGroup = groupList.find(
          (group) => group.id === selectedGrpId
        );
        if (!selectedGroup) {
          showErrorToast("Please select a valid group before approving.");
          return; // 🚫 Stop execution, don't open modal
        }
        setApprovingSign("Add");
        setSelectedName(
          <>
            Are you sure you want to add him in{" "}
            <strong>{selectedGroup.name}</strong> group?
          </>
        ); // Set selected group name
        setSelectedGroupId(selectedGrpId);
      } else {
        setApprovingSign("Reject");
        setSelectedName("Are you sure you want to reject him?");
      }
      setIsOpenConfirmationModal(true);
      onClose();
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleChange = (event) => {
    setSelectedGrpId(event.target.value);
    console.log("event", event);
  };

  const getFileThumbnail = (url) => {
    const ext = url?.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return Image; // show actual image
    }

    if (ext === "pdf") return PdfImage;
    if (["doc", "docx"].includes(ext)) return WordIcon;
    if (["xls", "xlsx"].includes(ext)) return ExcelIcon;
    return FileIcon; // default file icon
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
          px: 4,
          pb: 3,
          pt: 1,
          width: "800px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {kycDetails?.fullName}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => onClose()}
          aria-label="close"
        >
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
            label="Personal Details"
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
            label="Attachments"
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
            label="Field Representative Report"
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

      <StyledDialogContent sx={{ p: 0 }}>
        {tabValue === 0 && (
          <TabContext value={tabValue}>
            <TabPanel value={tabValue} index={0} sx={{ p: 0, mt: 3 }}>
              <Box
                sx={{ p: 2, backgroundColor: "#F9F9FF", borderRadius: "16px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", mr: 1 }}
                  >
                    Aadhar card & PAN card
                  </Typography>
                  <img
                    src={TickIcon}
                    alt="Add-icon"
                    height="14px"
                    width="14px"
                  />

                  {/* <CheckCircleIcon
                  color="success"
                  fontSize="small"
                  sx={{ ml: 1 }}
                /> */}
                </Box>
                {/* <Grid container spacing={2}> */}
                {/* First name */}

                <Grid container spacing={2}>
                  {kycDetails?.userType === "Individual" && (
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Aadhar Card Number </InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="Aadhar Card Number"
                          // name="firstName"
                          value={kycDetails?.aadhaarData?.aadhaarNumber || ""}
                          // onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </FormControl>
                    </Grid>
                  )}
                  {/* Middle name */}
                  <Grid item xs={12} sm={4} width={"31%"}>
                    <InputLabelLead>PAN Card Number </InputLabelLead>
                    <LeadDataInput
                      fullWidth
                      name="middleName"
                      value={kycDetails?.panNumber || ""}
                      // onChange={handleInputChange}
                      placeholder="Middle name"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: {
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                          },
                        },
                      }}
                    />
                  </Grid>
                  {kycDetails?.userType !== "Individual" &&
                    kycDetails?.userType !== "Proprietorship" && (
                      <Grid item xs={12} sm={4} width={"31%"}>
                        <InputLabelLead>GST Number </InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          name="middleName"
                          value={kycDetails?.gstNumber || ""}
                          // onChange={handleInputChange}
                          placeholder="GST Number"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    )}
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    mt: 3,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", mr: 1 }}
                  >
                    {kycDetails?.userType === "Individual" ||
                    kycDetails?.userType === "Proprietorship"
                      ? "Personal Details"
                      : "Office Details"}
                  </Typography>
                  <img
                    src={TickIcon}
                    alt="Add-icon"
                    height="14px"
                    width="14px"
                  />

                  {/* <CheckCircleIcon
                  color="success"
                  fontSize="small"
                  sx={{ ml: 1 }}
                /> */}
                </Box>
                <Grid container spacing={2}>
                  {/* Last name */}
                  {kycDetails?.fullName && (
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Full Name </InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        // name="lastName"
                        value={kycDetails?.fullName || ""}
                        // onChange={handleInputChange}
                        placeholder="Full name"
                        variant="outlined"
                        size="small"
                        InputProps={{
                          sx: {
                            borderRadius: "4px",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e0e0e0",
                            },
                          },
                        }}
                      />
                    </Grid>
                  )}

                  {kycDetails?.companyName && (
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Company Name </InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        name="whatsAppNumber"
                        value={kycDetails?.companyName || ""}
                        // onChange={handleInputChange}
                        placeholder="Company Name"
                        variant="outlined"
                        size="small"
                        InputProps={{
                          sx: {
                            borderRadius: "4px",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e0e0e0",
                            },
                          },
                        }}
                      />
                    </Grid>
                  )}

                  {kycDetails?.proprietorName && (
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Proprietor Name </InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        value={kycDetails?.proprietorName || ""}
                        placeholder="Proprietor Name"
                        variant="outlined"
                        size="small"
                        InputProps={{
                          sx: {
                            borderRadius: "4px",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e0e0e0",
                            },
                          },
                        }}
                      />
                    </Grid>
                  )}

                  {/* User type */}
                  <Grid item xs={12} sm={4} width={"31%"}>
                    <InputLabelLead>User Type </InputLabelLead>
                    <LeadDataInput
                      fullWidth
                      name="userType"
                      value={kycDetails?.userType || ""}
                      // onChange={handleInputChange}
                      placeholder="User Type"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: {
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} width={"31%"}>
                    <InputLabelLead>Email</InputLabelLead>
                    <LeadDataInput
                      fullWidth
                      // name="phoneNumber"
                      value={kycDetails?.email || ""}
                      // onChange={handleInputChange}
                      placeholder="Email"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: {
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                          },
                        },
                      }}
                    />
                  </Grid>

                  {kycDetails?.userType === "Individual" && (
                    <>
                      <Grid item xs={12} sm={4} width={"31%"}>
                        <InputLabelLead>Employee Type </InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          value={kycDetails?.employeeType || ""}
                          placeholder="Employee Type"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4} width={"31%"}>
                        <InputLabelLead>Work Nature/ Job Type </InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          value={kycDetails?.jobType || ""}
                          placeholder="Work Nature/ Job Type"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </>
                  )}

                  {kycDetails?.userType !== "Individual" &&
                    kycDetails?.userType !== "Proprietorship" && (
                      <>
                        <Grid item xs={12} sm={4} width={"31%"}>
                          <InputLabelLead>Contact Person's Name</InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            value={kycDetails?.contactPersonName || ""}
                            placeholder="Contact Person's Name"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4} width={"31%"}>
                          <InputLabelLead>
                            Contact Person's designation
                          </InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            value={kycDetails?.contactPersonDesignation || ""}
                            placeholder="Contact Person's designation"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </>
                    )}

                  {/* Turnover */}
                  <Grid item xs={12} sm={6} width={"31%"}>
                    <InputLabelLead>
                      {kycDetails?.userType !== "Individual"
                        ? "Monthly Turnover"
                        : " Monthly Income"}{" "}
                    </InputLabelLead>
                    <LeadDataInput
                      fullWidth
                      // name=""
                      value={kycDetails?.monthlyIncomeOrTurnover || ""}
                      // onChange={handleInputChange}
                      placeholder="Monthly Income"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: {
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                {(kycDetails?.userType === "Individual" ||
                  kycDetails?.userType === "Proprietorship") && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        mt: 3,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", mr: 1 }}
                      >
                        Residential Address{" "}
                      </Typography>
                      <img
                        src={TickIcon}
                        alt="Add-icon"
                        height="14px"
                        width="14px"
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>Pin Code</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          value={kycDetails?.residentialAddress?.pinCode || ""}
                          placeholder="Pin Code"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                      {/* Lead Source */}
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>State</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.residentialAddress?.state || ""}
                          // onChange={handleInputChange}
                          placeholder="State"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={2}>
                      {/* User Type */}
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>City</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.residentialAddress?.city || ""}
                          // onChange={handleInputChange}
                          placeholder="City"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>Street</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.residentialAddress?.street || ""}
                          // onChange={handleInputChange}
                          placeholder="City"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        mt: 3,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", mr: 1 }}
                      >
                        Permanent Address{" "}
                      </Typography>
                      <img
                        src={TickIcon}
                        alt="Add-icon"
                        height="14px"
                        width="14px"
                      />

                      {/* <CheckCircleIcon
                  color="success"
                  fontSize="small"
                  sx={{ ml: 1 }}
                /> */}
                    </Box>

                    <Grid container spacing={2}>
                      {/* Alternate Email ID */}
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>Pin Code</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.permanentAddress?.pinCode || ""}
                          // onChange={handleInputChange}
                          placeholder="Pin Code"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                      {/* Lead Source */}
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>State</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.permanentAddress?.state || ""}
                          // onChange={handleInputChange}
                          placeholder="State"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                      {/* User Type */}
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>City</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.permanentAddress?.city || ""}
                          // onChange={handleInputChange}
                          placeholder="City"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>Street</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.permanentAddress?.street || ""}
                          // onChange={handleInputChange}
                          placeholder="City"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}

                {kycDetails?.userType !== "Proprietorship" &&
                  (kycDetails?.userType !== "Individual" ||
                    kycDetails?.employeeType === "Salaried") && (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          mt: 3,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "bold", mr: 1 }}
                        >
                          Office Address{" "}
                        </Typography>
                        <img
                          src={TickIcon}
                          alt="Add-icon"
                          height="14px"
                          width="14px"
                        />
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} width={"31%"}>
                          <InputLabelLead>Pin Code</InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            value={kycDetails?.officeAddress?.pinCode || ""}
                            placeholder="Pin Code"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>
                        {/* Lead Source */}
                        <Grid item xs={12} sm={6} width={"31%"}>
                          <InputLabelLead>State</InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            // name="alternateEmail"
                            value={kycDetails?.officeAddress?.state || ""}
                            // onChange={handleInputChange}
                            placeholder="State"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} mt={2}>
                        {/* User Type */}
                        <Grid item xs={12} sm={6} width={"31%"}>
                          <InputLabelLead>City</InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            // name="alternateEmail"
                            value={kycDetails?.officeAddress?.city || ""}
                            // onChange={handleInputChange}
                            placeholder="City"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} width={"31%"}>
                          <InputLabelLead>Street</InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            // name="alternateEmail"
                            value={kycDetails?.officeAddress?.street || ""}
                            // onChange={handleInputChange}
                            placeholder="Street"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </>
                  )}
              </Box>{" "}
            </TabPanel>
          </TabContext>
        )}

        {tabValue === 1 && (
          <TabContext value={tabValue}>
            <TabPanel value={tabValue} index={1} sx={{ p: 0, mt: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "30px",
                  flexWrap: "wrap",
                  p: 2,
                  backgroundColor: "#F9F9FF",
                  borderRadius: "16px",
                }}
              >
                {kycDetails?.uploadedDocuments ? (
                  <>
                    {kycDetails?.uploadedDocuments &&
                      Object.entries(kycDetails.uploadedDocuments).map(
                        ([key, url]) => {
                          const fileName = decodeURIComponent(
                            url.split("/").pop()
                          );

                          return (
                            <Box
                              key={key}
                              sx={{ textAlign: "center", cursor: "pointer" }}
                            >
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <Box
                                  component="img"
                                  src={getFileThumbnail(url)} // PDF icon
                                  alt="PDF Icon"
                                  sx={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: "#ffecec",
                                    borderRadius: 1,
                                    mb: 1,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    maxWidth: 140,
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {fileName}
                                </Typography>
                              </a>
                            </Box>
                          );
                        }
                      )}
                  </>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      py: 5, // match the outer box height
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      No Attachments
                    </Typography>
                  </Box>
                )}
              </Box>
            </TabPanel>
          </TabContext>
        )}

        {tabValue === 2 && (
          <TabContext value={tabValue}>
            <TabPanel value={tabValue} index={2} sx={{ p: 0, mt: 3 }}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "#F9F9FF",
                  borderRadius: "16px",
                }}
              >
                {executiveReport?.executiveUploads?.form ? (
                  <Box sx={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                    {executiveReport?.executiveUploads?.form && (
                      <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                        <a
                          href={executiveReport.executiveUploads.form}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Box
                            component="img"
                            src={getFileThumbnail(
                              executiveReport.executiveUploads.form
                            )}
                            alt="Executive Form"
                            sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: "#ffecec",
                              borderRadius: 1,
                              mb: 1,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ maxWidth: 140, wordBreak: "break-word" }}
                          >
                            {decodeURIComponent(
                              executiveReport.executiveUploads.form
                                .split("/")
                                .pop()
                            )}
                          </Typography>
                        </a>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      No Attachments
                    </Typography>
                  </Box>
                )}
                <Box item xs={12} sm={6} sx={{ mt: 2, width: "41%" }}>
                  <InputLabelLead>Notes</InputLabelLead>
                  <LeadDataInput
                    fullWidth
                    // name="alternateEmail"
                    value={executiveReport?.executiveUploads?.notes || ""}
                    // onChange={handleInputChange}
                    placeholder="Notes"
                    variant="outlined"
                    size="small"
                    rows={2}
                    multiline
                    InputProps={{
                      sx: {
                        borderRadius: "4px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e0e0e0",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        )}

        <Box sx={{ mt: 2, mb: 2, width: "31%" }}>
          <InputLabelLead>Group</InputLabelLead>
          <StyledSelect
            fullWidth
            name="selectedGrpId"
            value={selectedGrpId}
            onChange={handleChange}
            input={<StyledOutlinedInput />}
            displayEmpty
            size="small"
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              borderRadius: "8px",
              "& .MuiSelect-select": {
                padding: "8.5px 14px",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: scrollbarStyles,
              },
            }}
            renderValue={(selected) => {
              if (!selected) return "Select Group";
              const selectedEmployee = groupList.find(
                (emp) => emp.id === selected
              );
              return selectedEmployee?.name || selected;
            }}
          >
            {groupList &&
              groupList.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group?.name}
                </MenuItem>
              ))}
          </StyledSelect>
        </Box>

        <ActionBtnContainer sx={{ mt: 3, mb: 1, pl: 0 }}>
          <ModalOutlineBtn
            disabled={kycDetails?.executiveStatus?.toLowerCase() === "pending"}
            onClick={() => handleApprove("Rejected")}
          >
            Reject
          </ModalOutlineBtn>
          <ModalFilledBtn
            disabled={kycDetails?.executiveStatus?.toLowerCase() === "pending"}
            onClick={() => handleApprove("Approved")}
          >
            Add to Group
          </ModalFilledBtn>
        </ActionBtnContainer>
      </StyledDialogContent>
    </Dialog>
  );
};

const FormApprovalConfirmModal = ({
  open,
  onClose,
  formId,
  groupName,
  groupId,
  selectedChitFormOwner,
  approvingSign,
}) => {
  console.log("approvingSign", approvingSign);
  const { showToast, showErrorToast } = useCRM();

  const handleApprove = async (status) => {
    try {
      let payload;
      if (status === "Approved") {
        payload = { chitFormIds: [formId], status, groupId };
      } else {
        payload = { chitFormIds: [formId], status };
      }
      const response = await ChitFormAddingToGroup(payload);
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
            Fullname:&nbsp;
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: "20px" }}>
            {selectedChitFormOwner}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 500, fontSize: "15px" }}>
          {groupName}
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
          <OutlineButton fullWidth onClick={onClose}>
            Cancel
          </OutlineButton>
          <FilledButton
            fullWidth
            onClick={() =>
              handleApprove(approvingSign === "Add" ? "Approved" : "Rejected")
            }
          >
            {approvingSign}
          </FilledButton>
        </Box>
      </Box>
    </Dialog>
  );
};

const WinnerDetailsApprovalConfirmModal = ({
  open,
  onClose,
  winningDetailsId,
  type,
}) => {
  const { showToast, showErrorToast } = useCRM();

  const handleApprove = async (status) => {
    try {
      if (type === "attachments") {
        const payload = {
          status,
        };
        const response = await ApproveReceivedDocuments(
          winningDetailsId,
          payload
        );
        if (response.statusCode === 200) {
          showToast(response.message);
          onClose();
        }
      } else {
        const payload = {
          status: type,
        };
        const response = await ApproveGuarantorAndBankDetails(
          winningDetailsId,
          payload
        );
        if (response.statusCode === 200) {
          showToast(response.message);
          onClose();
        }
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
            Document Verification
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 500, fontSize: "15px" }}>
          Are you sure you want to approved all the necessary documents?{" "}
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
          <OutlineButton
            fullWidth
            onClick={() => handleApprove("Re-Requested")}
          >
            Cancel
          </OutlineButton>
          <FilledButton fullWidth onClick={() => handleApprove("Verified")}>
            Approve
          </FilledButton>
        </Box>
      </Box>
    </Dialog>
  );
};

const ReceivedDocumentsApprovalConfirmModal = ({
  open,
  onClose,
  selectedDocId,
  type,
  updateStatusInParent,
  allAttachments,
  winningDetailsId,
  setIsOpenDocument,
}) => {
  const { showToast, showErrorToast } = useCRM();

  const handleApprove = async (status) => {
    try {
      const payload = {
        status,
      };
      const response = await ApproveReceivedDocuments(selectedDocId, payload);
      if (response.statusCode === 200) {
        showToast(response.message);
        updateStatusInParent(winningDetailsId, status);

        onClose();
        // 🔍 Check if all documents are now verified
        const updatedAttachments = allAttachments.map((doc) =>
          doc.id === selectedDocId ? { ...doc, status } : doc
        );
        const allVerified = updatedAttachments.every(
          (doc) => doc.status === "Verified"
        );

        if (allVerified) {
          // ✅ Call next API
          const nextResponse = await ApproveGuarantorAndBankDetails(
            winningDetailsId,
            {
              status: "GuarantorDetails",
            }
          );

          if (nextResponse.statusCode === 200) {
            showToast(
              "All documents verified. Proceeding to GuarantorDetails step."
            );
          }
        }
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
            Document Verification
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 500, fontSize: "15px" }}>
          Are you sure you want to approved all the necessary documents?{" "}
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
          <OutlineButton
            fullWidth
            onClick={() => {
              setIsOpenDocument(true);
              onClose();
            }}
          >
            View
          </OutlineButton>
          <OutlineButton
            fullWidth
            onClick={() => handleApprove("Re-Requested")}
          >
            Re-Request
          </OutlineButton>
          <FilledButton fullWidth onClick={() => handleApprove("Verified")}>
            Verify
          </FilledButton>
        </Box>
      </Box>
    </Dialog>
  );
};

const MemberApprovalByKycId = ({
  open,
  onClose,
  setIsOpenConfirmationModal,
  kycId,
  setSelectedName,
  setSelectedGroupId,
  subcriptionId,
  setApprovingSign,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const { showToast, showErrorToast } = useCRM();
  const [selectedGrpId, setSelectedGrpId] = useState(null);
  const [kycDetails, setKycDetails] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [executiveReport, setExecutiveReport] = useState(null);

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

  const fetchKycDetailsById = async () => {
    try {
      const response = await gettingKycDetailsById(kycId); // Replace with your API endpoint
      if (response.statusCode === 200) {
        setKycDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching kyc details:", error);
    }
  };

  const fetchExecutiveReport = async () => {
    try {
      const response = await gettingExecutiveReport(subcriptionId); // Replace with your API endpoint
      if (response.statusCode === 200) {
        setExecutiveReport(response.data);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchingGroup();
    fetchKycDetailsById();
    fetchExecutiveReport();
  }, [open]);

  const handleTabChange = (e, newVal) => {
    setTabValue(newVal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKycDetails((prevData) => ({
      ...prevData,
      [name]: value === "" ? " " : value, // Replace empty string with space
    }));
  };

  const handleApprove = async (status) => {
    try {
      if (status === "Approved") {
        if (!selectedGrpId) {
          showErrorToast("Please select a group before processing.");
          return;
        }
        const selectedGroup = groupList.find(
          (group) => group.id === selectedGrpId
        );
        if (!selectedGroup) {
          showErrorToast("Please select a valid group before approving.");
          return; // 🚫 Stop execution, don't open modal
        }
        setApprovingSign("Add");
        setSelectedName(
          <>
            Are you sure you want to add him in{" "}
            <strong>{selectedGroup.name}</strong> group?
          </>
        ); // Set selected group name
        setSelectedGroupId(selectedGrpId);
      } else {
        setApprovingSign("Reject");
        setSelectedName("Are you sure you want to reject him?");
      }
      setIsOpenConfirmationModal(true);
      onClose();
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleChange = (event) => {
    setSelectedGrpId(event.target.value);
    console.log("event", event);
  };

  const getFileThumbnail = (url) => {
    const ext = url?.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return Image; // show actual image
    }

    if (ext === "pdf") return PdfImage;
    if (["doc", "docx"].includes(ext)) return WordIcon;
    if (["xls", "xlsx"].includes(ext)) return ExcelIcon;
    return FileIcon; // default file icon
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
          width: "800px",
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
        <CommonModalHeading>{kycDetails?.fullName}</CommonModalHeading>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => onClose()}
          aria-label="close"
        >
          <img src={CloseIcon} alt="closeIcon" />
        </IconButton>
      </DialogTitle>

      <Box>
        <ModalStyledTabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="profile tabs"
        >
          {[
            "Field Representative Report",
            "Personal Details",
            "Attachments",
          ].map((label, index) => (
            <ModalStyledTab
              key={label}
              label={label}
              isSelected={tabValue === index}
            />
          ))}
        </ModalStyledTabs>
      </Box>

      <StyledDialogContent sx={{ p: 0 }}>
        {tabValue === 0 && (
          <TabContext value={tabValue}>
            <StyledTabPanel value={tabValue} index={2}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "#F9F9FF",
                  borderRadius: "16px",
                }}
              >
                {executiveReport?.executiveUploads?.form ? (
                  <Box sx={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                    {executiveReport?.executiveUploads?.form && (
                      <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                        <a
                          href={executiveReport.executiveUploads.form}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Box
                            component="img"
                            src={getFileThumbnail(
                              executiveReport.executiveUploads.form
                            )}
                            alt="Executive Form"
                            sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: "#ffecec",
                              borderRadius: 1,
                              mb: 1,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ maxWidth: 140, wordBreak: "break-word" }}
                          >
                            {decodeURIComponent(
                              executiveReport.executiveUploads.form
                                .split("/")
                                .pop()
                            )}
                          </Typography>
                        </a>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      No Attachments
                    </Typography>
                  </Box>
                )}
                <Box item xs={12} sm={6} sx={{ mt: 2, width: "41%" }}>
                  <InputLabelLead>Notes</InputLabelLead>
                  <LeadDataInput
                    fullWidth
                    // name="alternateEmail"
                    value={executiveReport?.executiveUploads?.notes || ""}
                    // onChange={handleInputChange}
                    placeholder="Notes"
                    variant="outlined"
                    size="small"
                    rows={2}
                    multiline
                    InputProps={{
                      sx: {
                        borderRadius: "4px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e0e0e0",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </StyledTabPanel>
          </TabContext>
        )}
        {tabValue === 1 && (
          <TabContext value={tabValue}>
            <StyledTabPanel value={tabValue} index={0}>
              <Box
                sx={{ p: 2, backgroundColor: "#F9F9FF", borderRadius: "16px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", mr: 1 }}
                  >
                    Aadhar card & PAN card
                  </Typography>
                  <img
                    src={TickIcon}
                    alt="Add-icon"
                    height="14px"
                    width="14px"
                  />

                  {/* <CheckCircleIcon
                  color="success"
                  fontSize="small"
                  sx={{ ml: 1 }}
                /> */}
                </Box>
                {/* <Grid container spacing={2}> */}
                {/* First name */}

                <Grid container spacing={2}>
                  {kycDetails?.userType === "Individual" && (
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Aadhar Card Number </InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="Aadhar Card Number"
                          // name="firstName"
                          value={kycDetails?.aadhaarData?.aadhaarNumber || ""}
                          // onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                  )}
                  {/* Middle name */}
                  <Grid item xs={12} sm={4} width={"31%"}>
                    <InputLabelLead>PAN Card Number </InputLabelLead>
                    <LeadDataInput
                      fullWidth
                      name="middleName"
                      value={kycDetails?.panNumber || ""}
                      // onChange={handleInputChange}
                      placeholder="Middle name"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: {
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                          },
                        },
                      }}
                    />
                  </Grid>
                  {kycDetails?.userType !== "Individual" &&
                    kycDetails?.userType !== "Proprietorship" && (
                      <Grid item xs={12} sm={4} width={"31%"}>
                        <InputLabelLead>GST Number </InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          name="middleName"
                          value={kycDetails?.gstNumber || ""}
                          // onChange={handleInputChange}
                          placeholder="GST Number"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    )}
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    mt: 3,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", mr: 1 }}
                  >
                    {kycDetails?.userType === "Individual" ||
                    kycDetails?.userType === "Proprietorship"
                      ? "Personal Details"
                      : "Office Details"}
                  </Typography>
                  <img
                    src={TickIcon}
                    alt="Add-icon"
                    height="14px"
                    width="14px"
                  />

                  {/* <CheckCircleIcon
                  color="success"
                  fontSize="small"
                  sx={{ ml: 1 }}
                /> */}
                </Box>
                <Grid container spacing={2}>
                  {/* Last name */}
                  {kycDetails?.fullName && (
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Full Name </InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        // name="lastName"
                        value={kycDetails?.fullName || ""}
                        // onChange={handleInputChange}
                        placeholder="Full name"
                        variant="outlined"
                        size="small"
                        InputProps={{
                          sx: {
                            borderRadius: "4px",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e0e0e0",
                            },
                          },
                        }}
                      />
                    </Grid>
                  )}

                  {kycDetails?.companyName && (
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Company Name </InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        name="whatsAppNumber"
                        value={kycDetails?.companyName || ""}
                        // onChange={handleInputChange}
                        placeholder="Company Name"
                        variant="outlined"
                        size="small"
                        InputProps={{
                          sx: {
                            borderRadius: "4px",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e0e0e0",
                            },
                          },
                        }}
                      />
                    </Grid>
                  )}

                  {kycDetails?.proprietorName && (
                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>Proprietor Name </InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        value={kycDetails?.proprietorName || ""}
                        placeholder="Proprietor Name"
                        variant="outlined"
                        size="small"
                        InputProps={{
                          sx: {
                            borderRadius: "4px",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e0e0e0",
                            },
                          },
                        }}
                      />
                    </Grid>
                  )}

                  {/* User type */}
                  <Grid item xs={12} sm={4} width={"31%"}>
                    <InputLabelLead>User Type </InputLabelLead>
                    <LeadDataInput
                      fullWidth
                      name="userType"
                      value={kycDetails?.userType || ""}
                      // onChange={handleInputChange}
                      placeholder="User Type"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: {
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} width={"31%"}>
                    <InputLabelLead>Email</InputLabelLead>
                    <LeadDataInput
                      fullWidth
                      // name="phoneNumber"
                      value={kycDetails?.email || ""}
                      // onChange={handleInputChange}
                      placeholder="Email"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: {
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                          },
                        },
                      }}
                    />
                  </Grid>

                  {kycDetails?.userType === "Individual" && (
                    <>
                      <Grid item xs={12} sm={4} width={"31%"}>
                        <InputLabelLead>Employee Type </InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          value={kycDetails?.employeeType || ""}
                          placeholder="Employee Type"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4} width={"31%"}>
                        <InputLabelLead>Work Nature/ Job Type </InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          value={kycDetails?.jobType || ""}
                          placeholder="Work Nature/ Job Type"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </>
                  )}

                  {kycDetails?.userType !== "Individual" &&
                    kycDetails?.userType !== "Proprietorship" && (
                      <>
                        <Grid item xs={12} sm={4} width={"31%"}>
                          <InputLabelLead>Contact Person's Name</InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            value={kycDetails?.contactPersonName || ""}
                            placeholder="Contact Person's Name"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4} width={"31%"}>
                          <InputLabelLead>
                            Contact Person's designation
                          </InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            value={kycDetails?.contactPersonDesignation || ""}
                            placeholder="Contact Person's designation"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </>
                    )}

                  {/* Turnover */}
                  <Grid item xs={12} sm={6} width={"31%"}>
                    <InputLabelLead>
                      {kycDetails?.userType !== "Individual"
                        ? "Monthly Turnover"
                        : " Monthly Income"}{" "}
                    </InputLabelLead>
                    <LeadDataInput
                      fullWidth
                      // name=""
                      value={kycDetails?.monthlyIncomeOrTurnover || ""}
                      // onChange={handleInputChange}
                      placeholder="Monthly Income"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: {
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                {(kycDetails?.userType === "Individual" ||
                  kycDetails?.userType === "Proprietorship") && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        mt: 3,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", mr: 1 }}
                      >
                        Residential Address{" "}
                      </Typography>
                      <img
                        src={TickIcon}
                        alt="Add-icon"
                        height="14px"
                        width="14px"
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>Pin Code</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          value={kycDetails?.residentialAddress?.pinCode || ""}
                          placeholder="Pin Code"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                      {/* Lead Source */}
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>State</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.residentialAddress?.state || ""}
                          // onChange={handleInputChange}
                          placeholder="State"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={2}>
                      {/* User Type */}
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>City</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.residentialAddress?.city || ""}
                          // onChange={handleInputChange}
                          placeholder="City"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>Street</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.residentialAddress?.street || ""}
                          // onChange={handleInputChange}
                          placeholder="City"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        mt: 3,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", mr: 1 }}
                      >
                        Permanent Address{" "}
                      </Typography>
                      <img
                        src={TickIcon}
                        alt="Add-icon"
                        height="14px"
                        width="14px"
                      />

                      {/* <CheckCircleIcon
                  color="success"
                  fontSize="small"
                  sx={{ ml: 1 }}
                /> */}
                    </Box>

                    <Grid container spacing={2}>
                      {/* Alternate Email ID */}
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>Pin Code</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.permanentAddress?.pinCode || ""}
                          // onChange={handleInputChange}
                          placeholder="Pin Code"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                      {/* Lead Source */}
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>State</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.permanentAddress?.state || ""}
                          // onChange={handleInputChange}
                          placeholder="State"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                      {/* User Type */}
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>City</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.permanentAddress?.city || ""}
                          // onChange={handleInputChange}
                          placeholder="City"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} width={"31%"}>
                        <InputLabelLead>Street</InputLabelLead>
                        <LeadDataInput
                          fullWidth
                          // name="alternateEmail"
                          value={kycDetails?.permanentAddress?.street || ""}
                          // onChange={handleInputChange}
                          placeholder="City"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            sx: {
                              borderRadius: "4px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e0e0e0",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}

                {kycDetails?.userType !== "Proprietorship" &&
                  (kycDetails?.userType !== "Individual" ||
                    kycDetails?.employeeType === "Salaried") && (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          mt: 3,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "bold", mr: 1 }}
                        >
                          Office Address{" "}
                        </Typography>
                        <img
                          src={TickIcon}
                          alt="Add-icon"
                          height="14px"
                          width="14px"
                        />
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} width={"31%"}>
                          <InputLabelLead>Pin Code</InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            value={kycDetails?.officeAddress?.pinCode || ""}
                            placeholder="Pin Code"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>
                        {/* Lead Source */}
                        <Grid item xs={12} sm={6} width={"31%"}>
                          <InputLabelLead>State</InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            // name="alternateEmail"
                            value={kycDetails?.officeAddress?.state || ""}
                            // onChange={handleInputChange}
                            placeholder="State"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} mt={2}>
                        {/* User Type */}
                        <Grid item xs={12} sm={6} width={"31%"}>
                          <InputLabelLead>City</InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            // name="alternateEmail"
                            value={kycDetails?.officeAddress?.city || ""}
                            // onChange={handleInputChange}
                            placeholder="City"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} width={"31%"}>
                          <InputLabelLead>Street</InputLabelLead>
                          <LeadDataInput
                            fullWidth
                            // name="alternateEmail"
                            value={kycDetails?.officeAddress?.street || ""}
                            // onChange={handleInputChange}
                            placeholder="Street"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: {
                                borderRadius: "4px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </>
                  )}
              </Box>{" "}
            </StyledTabPanel>
          </TabContext>
        )}

        {tabValue === 2 && (
          <TabContext value={tabValue}>
            <StyledTabPanel value={tabValue} index={1}>
              <Box
                sx={{
                  display: "flex",
                  gap: "30px",
                  flexWrap: "wrap",
                  p: 2,
                  backgroundColor: "#F9F9FF",
                  borderRadius: "16px",
                }}
              >
                {kycDetails?.uploadedDocuments ? (
                  <>
                    {kycDetails?.uploadedDocuments &&
                      Object.entries(kycDetails.uploadedDocuments).map(
                        ([key, url]) => {
                          const fileName = decodeURIComponent(
                            url.split("/").pop()
                          );

                          return (
                            <Box
                              key={key}
                              sx={{ textAlign: "center", cursor: "pointer" }}
                            >
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <Box
                                  component="img"
                                  src={getFileThumbnail(url)} // PDF icon
                                  alt="PDF Icon"
                                  sx={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: "#ffecec",
                                    borderRadius: 1,
                                    mb: 1,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    maxWidth: 140,
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {fileName}
                                </Typography>
                              </a>
                            </Box>
                          );
                        }
                      )}
                  </>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      py: 5, // match the outer box height
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      No Attachments
                    </Typography>
                  </Box>
                )}
              </Box>
            </StyledTabPanel>
          </TabContext>
        )}

        <ActionBtnContainer sx={{ mt: 2, mb: 0, pl: 0 }}>
          <ModalOutlineBtn
            disabled={kycDetails?.executiveStatus?.toLowerCase() === "pending"}
            onClick={() => handleApprove("Rejected")}
          >
            Reject
          </ModalOutlineBtn>
          <ModalFilledBtn
            disabled={kycDetails?.executiveStatus?.toLowerCase() === "pending"}
            onClick={() => {
              setIsOpenConfirmationModal(true);
              onClose();
            }}
          >
            Approve
          </ModalFilledBtn>
        </ActionBtnContainer>
      </StyledDialogContent>
    </Dialog>
  );
};

const MemberApprovalConfirmationModal = ({ open, onClose, type }) => {
  const [tokens, setTokens] = useState("");
  const [suggestion, setSuggestion] = useState("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          p: 0,
          width: 400,
        },
      }}
    >
      <Box sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #C7C0D0",
            p: 2,
            pb: 1,
          }}
        >
          <CommonModalHeading>Confirmation</CommonModalHeading>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => onClose()}
            aria-label="close"
          >
            <img src={CloseIcon} alt="close" />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, pt: 2 }}>
          {/* Subscriber Section */}
          <Box sx={{ mb: 2 }}>
            <ConfirmationModalLabel>Subscriber</ConfirmationModalLabel>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 18,
                color: "#424242",
              }}
            >
              CR saravanan
            </Typography>
          </Box>

          {/* Tokens Input Section */}

          {type != "removal" && (
            <Box sx={{ mb: 3 }}>
              <ConfirmationModalLabel>
                Please enter no of tokens do you want to approve.
              </ConfirmationModalLabel>
              <LeadDataInput
                value={tokens}
                onChange={(e) => setTokens(e.target.value)}
                fullWidth
                size="small"
              />
            </Box>
          )}

          {/* Suggestion Input Section */}
          <Box>
            <ConfirmationModalLabel>Suggestion (if any)</ConfirmationModalLabel>
            <LeadDataInput
              value={suggestion}
              placeholder="Enter your suggestion"
              onChange={(e) => setSuggestion(e.target.value)}
              fullWidth
              multiline
              minRows={2}
              size="small"
            />
          </Box>
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            px: 3,
            pb: 3,
          }}
        >
          <FilterOutlinedButton onClick={onClose}>Cancel</FilterOutlinedButton>
          <FilterFilledButton>Approve</FilterFilledButton>
        </Box>
      </Box>
    </Dialog>
  );
};

const MemberAuditModal = ({ open, onClose }) => {
  const [tokens, setTokens] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [ticketDetails, setTicketDetails] = useState([]);

  const header = ["Token", "Arrear amount", "Status"];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          p: 0,
          width: 400,
        },
      }}
    >
      <Box sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #C7C0D0",
            p: 2,
            pb: 1,
          }}
        >
          <CommonModalHeading>Audit</CommonModalHeading>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => onClose()}
            aria-label="close"
          >
            <img src={CloseIcon} alt="close" />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, pt: 2 }}>
          {/* Subscriber Section */}
          <Box sx={{ mb: 2 }}>
            <ConfirmationModalLabel>Subscriber</ConfirmationModalLabel>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 18,
                color: "#424242",
              }}
            >
              CR saravanan
            </Typography>
          </Box>

          {/* Tokens Input Section */}
          <TableContainerWithBorder component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <VoucherTableHeadRow>
                  {header?.map((item, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{ fontWeight: 500, fontSize: "14px" }}
                    >
                      {item}
                    </TableCell>
                  ))}
                </VoucherTableHeadRow>
              </TableHead>
              <TableBody>
                <VoucherTableBodyRow>
                  {/* <TableCell>
                    <strong>Token</strong>
                  </TableCell> */}
                  {ticketDetails?.map((item, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{ width: "150px" }}
                    >
                      {item.amount ?? "-"}
                    </TableCell>
                  ))}
                </VoucherTableBodyRow>

                <TableRow>
                  {/* <TableCell>
                    <strong>Status</strong>
                  </TableCell> */}
                  {ticketDetails?.map((item, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{
                        backgroundColor:
                          item.status === "Not-paid"
                            ? "#fdeaea"
                            : "transparent",
                        color:
                          item.status === "Not-paid" ? "#d32f2f" : "inherit",
                        fontWeight:
                          item.status === "Not-paid" ? "bold" : "normal",
                      }}
                    >
                      {item.status}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainerWithBorder>
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            px: 3,
            pb: 3,
          }}
        >
          <FilterFilledButton onClick={onClose}>Ok</FilterFilledButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export {
  ChitFormApprovalByKycId,
  FormApprovalConfirmModal,
  WinnerDetailsApprovalConfirmModal,
  ReceivedDocumentsApprovalConfirmModal,
  MemberApprovalByKycId,
  MemberApprovalConfirmationModal,
  MemberAuditModal,
};
