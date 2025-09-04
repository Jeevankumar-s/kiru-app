import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CustomDatePicker, RupeeInput } from "../Reusable/Reusable.jsx";

import { LocalizationProvider } from "@mui/x-date-pickers";

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
  TableContainer,
  Box,
  InputAdornment,
  Divider,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CloseIcon from "../../assets/CloseButtonIcon.svg";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PdfImage from "../../assets/PDFImage.png";
import Image from "../../assets/imagePlaceholder.png";
import ExcelIcon from "../../assets/excel.png";
import WordIcon from "../../assets/word.png";
import FileIcon from "../../assets/file.png";
import {
  getSpecificGroupMemberDetails,
  getTransactionDetails,
  getAllBranches,
  getAllChitPlans,
  UpdateGroup,
  GetSpecificGroupDetails,
} from "../API/Api";
import { CircularProgress } from "@mui/material";
import {
  StyledSelect,
  LeadDataInput,
  InputLabelLead,
  CommonModalHeading,
  StyledDialogContent,
  StyledOutlinedInput,
  FilledButton,
  StyledTableContainer,
  ModalStyledTabs,
  ModalStyledTab,
  SeparateContainerHeading,
} from "../../StyledElement";
import CalenderIcon from "../../assets/calender.svg";
import { useCRM } from "../../Context/CRMContext";
import YearIcon from "../../assets/yearIcon.svg";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Chandigarh",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];
const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Brazil",
  "China",
  "Japan",
  "Russia",
  "Mexico",
  "South Africa",
  "New Zealand",
  "Singapore",
  "United Arab Emirates",
  "Saudi Arabia",
  "Nepal",
  "Bangladesh",
  "Sri Lanka",
  "Pakistan",
  "Malaysia",
  "Indonesia",
  "Thailand",
  "Vietnam",
  "Philippines",
  "Netherlands",
  "Switzerland",
];

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

const MemberDetailsById = ({ open, onClose, memberId }) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(dayjs());
  const [transaction, setTransaction] = useState([]);

  const [memberDetails, setMemberDetails] = useState({});
  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const fetchingMemberDetails = async () => {
    setLoading(true);

    try {
      const response = await getSpecificGroupMemberDetails(memberId);
      // setLeadData(response.data.lead);
      setMemberDetails(response.data);
    } catch (error) {
      console.error("Error fetching catalog products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionDetails = async () => {
    setLoading(true);
    try {
      const payload = {
        year: year.format("YYYY"),
      };

      const response = await getTransactionDetails(memberId, payload);
      // setLeadData(response.data.lead);

      setTransaction(response.data.transactions);
    } catch (error) {
      console.error("Error fetching catalog products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingMemberDetails();
    fetchTransactionDetails();
  }, [open, year]);
  const handleClose = () => {
    onClose();
  };
  const handleTabChange = (e, newVal) => {
    setTabValue(newVal);
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
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 1,
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Profile Details
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <img src={CloseIcon} alt="closeIcon" />
            </IconButton>
          </DialogTitle>

          <Box sx={{ px: 2 }}>
            <ModalStyledTabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile tabs"
              scrollButtons="auto"
              variant="scrollable"
              sx={{
                "& .MuiTabScrollButton-root": {
                  display: "flex",
                  height: "40px",
                  alignItems: "end", // ensures arrow is centered
                },
              }}
            >
              {[
                "Personal Details",
                "Address Details",
                "Guarantor Details",
                "Bank Details",
                "Transactions",
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
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="310px" // 👈 set your desired min height here
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <DialogContent sx={{ p: 0 }}>
                {tabValue === 0 && (
                  <TabContext value={tabValue}>
                    <TabPanel value={tabValue} index={0} sx={{ p: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "#F9F9FF",
                          p: 2,
                          borderRadius: 3,
                        }}
                      >
                        <Grid container spacing={2}>
                          {/* First name */}
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>Member name</InputLabelLead>
                            <FormControl
                              fullWidth
                              variant="outlined"
                              size="small"
                            >
                              <LeadDataInput
                                fullWidth
                                placeholder="First name"
                                name="firstName"
                                value={
                                  memberDetails?.personalDetails?.name || ""
                                }
                                // onChange={handleInputChange}
                                variant="outlined"
                                size="small"
                              />
                            </FormControl>
                          </Grid>

                          {/* Phone number */}
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>Phone number</InputLabelLead>

                            <LeadDataInput
                              name="phoneNumber"
                              value={
                                memberDetails?.personalDetails?.phoneNumber ||
                                ""
                              }
                              // onChange={handleInputChange}
                              placeholder="55500 00000"
                              variant="outlined"
                              size="small"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    +91
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          {/* WhatsApp number */}
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>Whats app number</InputLabelLead>
                            <LeadDataInput
                              name="phoneNumber"
                              value={
                                memberDetails?.personalDetails
                                  ?.whatsAppNumber || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="55500 00000"
                              variant="outlined"
                              size="small"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    +91
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          {/* Email ID */}
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Email ID</InputLabelLead>
                            <LeadDataInput
                              fullWidth
                              name="email"
                              value={
                                memberDetails?.personalDetails?.email || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="you@company.com"
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

                          {/* Alternate Email ID */}
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Alternate Email ID</InputLabelLead>
                            <LeadDataInput
                              fullWidth
                              name="alternateEmail"
                              value={
                                memberDetails?.personalDetails
                                  ?.alternateEmail || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="you@company.com"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} mt={3} fullWidth>
                          {/* Lead Source */}
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>Lead Source</InputLabelLead>
                            {/* <FormControl
                              fullWidth
                              variant="outlined"
                              size="small"
                            >
                              <StyledSelect
                                value={
                                  memberDetails?.personalDetails?.leadSource ||
                                  ""
                                }
                                name="leadSource"
                                // onChange={handleInputChange}
                                // IconComponent={KeyboardArrowDownIcon}
                                sx={{
                                  borderRadius: "4px",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e0e0e0",
                                  },
                                }}
                              >
                                <MenuItem value="Facebook">Facebook</MenuItem>
                                <MenuItem value="Whatsapp">Whatsapp</MenuItem>
                                <MenuItem value="Website">Website</MenuItem>
                                <MenuItem value="Direct Call">
                                  Direct Call
                                </MenuItem>
                              </StyledSelect>
                            </FormControl> */}
                            <LeadDataInput
                              fullWidth
                              name="leadSource"
                              value={
                                memberDetails?.personalDetails?.leadSource || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Lead Source"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>

                          {/* Lead Status */}
                          {/* <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>Lead Status</InputLabelLead>
                            <FormControl
                              fullWidth
                              variant="outlined"
                              size="small"
                            >
                              <StyledSelect
                                value={
                                  memberDetails?.personalDetails?.leadStatus ||
                                  ""
                                }
                                // IconComponent={KeyboardArrowDownIcon}
                                sx={{
                                  borderRadius: "4px",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e0e0e0",
                                  },
                                }}
                              >
                                <MenuItem value="follow-up">Follow-up</MenuItem>
                                <MenuItem value="lead-lost">Lead-Lost</MenuItem>
                                <MenuItem value="lead-converted">
                                  Lead-converted
                                </MenuItem>
                                <MenuItem value="new-lead">New-lead</MenuItem>
                              </StyledSelect>
                            </FormControl>
                          </Grid> */}

                          {/* User Type */}
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>User Type</InputLabelLead>
                            {/* <FormControl
                              fullWidth
                              variant="outlined"
                              size="small"
                            >
                              <StyledSelect
                                value={
                                  memberDetails?.personalDetails?.userType || ""
                                }
                                name="userType"
                                // onChange={handleInputChange}
                                // IconComponent={KeyboardArrowDownIcon}
                                sx={{
                                  borderRadius: "4px",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e0e0e0",
                                  },
                                }}
                              >
                                <MenuItem value="Individual">
                                  Individual
                                </MenuItem>
                                <MenuItem value="Company">Company</MenuItem>
                                <MenuItem value="Partnership">
                                  Partnership
                                </MenuItem>
                                <MenuItem value="Proprietorship">
                                  Proprietorship
                                </MenuItem>
                                <MenuItem value="LLP">LLP</MenuItem>
                              </StyledSelect>
                            </FormControl> */}
                            <LeadDataInput
                              fullWidth
                              name="userType"
                              value={
                                memberDetails?.personalDetails?.userType || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="User Type"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </TabPanel>
                  </TabContext>
                )}

                {tabValue === 1 && (
                  <>
                    {/* <FormContent> */}
                    <TabContext value={tabValue}>
                      <TabPanel value={tabValue} index={0} sx={{ p: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: "#F9F9FF",
                            p: 2,
                            borderRadius: 3,
                          }}
                        >
                          <Grid container spacing={2}>
                            {/* <FormRow> */}
                            <Grid item xs={12} sm={6} width={"31%"}>
                              <InputLabelLead>Pin Code</InputLabelLead>
                              <LeadDataInput
                                name="pinCode"
                                value={
                                  memberDetails?.addressDetails?.pinCode || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="Pin code"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} width={"31%"}>
                              <InputLabelLead>Building No</InputLabelLead>
                              <LeadDataInput
                                name="building"
                                value={
                                  memberDetails?.addressDetails?.building || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="Building No"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} width={"31%"}>
                              <InputLabelLead>State </InputLabelLead>{" "}
                              <LeadDataInput
                                name="state"
                                value={
                                  memberDetails?.addressDetails?.state || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="State"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                          </Grid>

                          {/* </FormRow> */}

                          {/* <FormRow> */}
                          <Grid container spacing={2} mt={2}>
                            <Grid item xs={12} sm={6} width={"31%"}>
                              <InputLabelLead>City </InputLabelLead>
                              <LeadDataInput
                                name="city"
                                value={
                                  memberDetails?.addressDetails?.city || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="City"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} width={"31%"}>
                              <InputLabelLead>Street</InputLabelLead>
                              <LeadDataInput
                                name="street"
                                value={
                                  memberDetails?.addressDetails?.street || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="Street"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            {/* </FormRow> */}

                            {/* </FormRow> */}
                          </Grid>
                        </Box>
                      </TabPanel>
                    </TabContext>
                    {/* </FormContent> */}
                  </>
                )}

                {tabValue === 2 && (
                  <TabContext value={tabValue}>
                    <TabPanel value={tabValue} index={0} sx={{ p: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "#F9F9FF",
                          p: 2,
                          borderRadius: 3,
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Guarantor Name</InputLabelLead>
                            <LeadDataInput
                              name="guarantorName"
                              value={
                                memberDetails?.guarantorDetails?.name || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Guarantor Name"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Guarantor Relation</InputLabelLead>
                            <LeadDataInput
                              name="guarantorRelation"
                              value={
                                memberDetails?.guarantorDetails?.relationship ||
                                ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Guarantor Relation"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Verification Status</InputLabelLead>
                            <LeadDataInput
                              name="status"
                              value={
                                memberDetails?.guarantorDetails?.status || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Guarantor Verification Status"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={2}>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Guarantor Mobile</InputLabelLead>
                            <LeadDataInput
                              name="guarantorMobile"
                              value={
                                memberDetails?.guarantorDetails?.phoneNumber ||
                                ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Guarantor Mobile"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Whatsapp Number</InputLabelLead>
                            <LeadDataInput
                              name="whatsAppNumber"
                              value={
                                memberDetails?.guarantorDetails
                                  ?.whatsAppNumber || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Whatsapp Number"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Guarantor Email</InputLabelLead>
                            <LeadDataInput
                              name="guarantorEmail"
                              value={
                                memberDetails?.guarantorDetails?.emailId || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Guarantor Email"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </TabPanel>
                  </TabContext>
                )}
                {tabValue === 3 && (
                  <TabContext value={tabValue}>
                    <TabPanel value={tabValue} index={0} sx={{ p: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "#F9F9FF",
                          p: 2,
                          borderRadius: 3,
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Beneficiary name</InputLabelLead>
                            <LeadDataInput
                              name="beneficiaryName"
                              value={
                                memberDetails?.bankDetails?.beneficiaryName ||
                                ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Beneficiary name"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Bank Name</InputLabelLead>
                            <LeadDataInput
                              name="bankName"
                              value={memberDetails?.bankDetails?.bankName || ""}
                              // onChange={handleInputChange}
                              placeholder="Bank Name"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Branch Name</InputLabelLead>
                            <LeadDataInput
                              name="branchName"
                              value={
                                memberDetails?.bankDetails?.branchName || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Branch Name"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={2}>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Account Number</InputLabelLead>
                            <LeadDataInput
                              name="accountNumber"
                              value={
                                memberDetails?.bankDetails?.accountNumber || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Account Number"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>IFSC Code</InputLabelLead>
                            <LeadDataInput
                              name="ifscCode"
                              value={memberDetails?.bankDetails?.ifscCode || ""}
                              // onChange={handleInputChange}
                              placeholder="IFSC Code"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Account Type</InputLabelLead>
                            <LeadDataInput
                              name="accountType"
                              value={
                                memberDetails?.bankDetails?.accountType || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Account Type"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={2}>
                          <Grid item xs={12} sm={6} width={"51%"}>
                            <InputLabelLead>Branch Address</InputLabelLead>
                            <LeadDataInput
                              name="branchAddress"
                              value={
                                memberDetails?.bankDetails?.branchAddress || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Branch Address"
                              fullWidth
                              variant="outlined"
                              rows={4}
                              multiline
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </TabPanel>
                  </TabContext>
                )}

                {tabValue === 4 && (
                  <TabContext value={tabValue}>
                    <TabPanel value={tabValue} index={0} sx={{ p: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "#f7f7ff",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <InputLabelLead>Select Year</InputLabelLead>
                        <FormControl sx={{ mb: 2, minWidth: 200 }} size="small">
                          <DatePicker
                            views={["year"]}
                            value={year}
                            onChange={(newValue) => {
                              setYear(newValue);
                              handleChange("dueDate", newValue?.format("YYYY"));
                            }}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{
                              openPickerIcon: () => (
                                <img
                                  src={YearIcon}
                                  alt="CalendarIcon"
                                  style={{
                                    width: 20,
                                    height: 20,
                                    cursor: "pointer",
                                  }}
                                />
                              ),
                              textField: LeadDataInput,
                            }}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                size: "small",
                              },
                            }}
                          />
                        </FormControl>

                        <StyledTableContainer component={Paper} elevation={0}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <strong>Month</strong>
                                </TableCell>
                                {transaction.map((item, index) => (
                                  <TableCell key={index} align="center">
                                    {item.month}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <strong>Amount</strong>
                                </TableCell>
                                {transaction.map((item, index) => (
                                  <TableCell
                                    key={index}
                                    align="center"
                                    sx={{
                                      // minWidth: 30, // increase this until ₹ and 10,000 fit
                                      whiteSpace: "nowrap", // prevent wrapping
                                    }}
                                  >
                                    {item.amount ?? "-"}
                                  </TableCell>
                                ))}
                              </TableRow>

                              <TableRow>
                                <TableCell>
                                  <strong>Status</strong>
                                </TableCell>
                                {transaction.map((item, index) => (
                                  <TableCell
                                    key={index}
                                    align="center"
                                    sx={{
                                      backgroundColor:
                                        item.status === "Not-paid"
                                          ? "#fdeaea"
                                          : "transparent",
                                      color:
                                        item.status === "Not-paid"
                                          ? "#d32f2f"
                                          : "inherit",
                                      fontWeight:
                                        item.status === "Not-paid"
                                          ? "bold"
                                          : "normal",
                                    }}
                                  >
                                    {item.status}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableBody>
                          </Table>
                        </StyledTableContainer>
                      </Box>
                    </TabPanel>
                  </TabContext>
                )}

                {tabValue === 5 && (
                  <TabContext value={tabValue}>
                    <TabPanel value={tabValue} index={5} sx={{ p: 0, mt: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "#F9F9FF",
                          borderRadius: "16px",
                        }}
                      >
                        {memberDetails?.executiveUploads?.form ? (
                          <Box
                            sx={{
                              display: "flex",
                              gap: "30px",
                              flexWrap: "wrap",
                            }}
                          >
                            {memberDetails?.executiveUploads?.form && (
                              <Box
                                sx={{ textAlign: "center", cursor: "pointer" }}
                              >
                                <a
                                  href={memberDetails.executiveUploads.form}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={getFileThumbnail(
                                      memberDetails.executiveUploads.form
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
                                    sx={{
                                      maxWidth: 140,
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {decodeURIComponent(
                                      memberDetails.executiveUploads.form
                                        .split("/")
                                        .pop()
                                    )}
                                  </Typography>
                                </a>
                              </Box>
                            )}
                          </Box>
                        ) : (
                          <Box sx={{ textAlign: "center", py: 5 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              No Attachments
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </TabPanel>
                  </TabContext>
                )}
              </DialogContent>
            </>
          )}
        </LocalizationProvider>
      </Dialog>
    </>
  );
};

const UpdateGroupModal = ({ open, onClose, selectedGroupId }) => {
  const { showToast, showErrorToast } = useCRM();
  const [errorMessage, setErrorMessage] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const [chitPlanList, setChitPlanList] = useState([]);
  const [groupDetails, setGroupDetails] = useState({
    name: "",
    branch: "",
    chitPlan: "",
    dueDate: "",
    status: "Active",
    chitCategory: "Monthly",
    commission: 5,
    totalMembers: null,
    durationInMonths: null,
    chitValue: "",
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

  const fetchingSpecificGroupDetails = async () => {
    try {
      const response = await GetSpecificGroupDetails(selectedGroupId);
      if (response.statusCode === 200) {
        setGroupDetails({
          name: response.data.name,
          branch: response.data.branch.name ?? "",
          chitPlan: response.data.chitPlan.id ?? "",
          dueDate: response.data.dueDate ?? "",
          status: response.data.status ?? "",
          chitCategory: response.data.chitCategory ?? "",
          commission: response.data.commission ?? "",
          totalMembers: response.data.totalMembers ?? "",
          durationInMonths: response.data.durationInMonths ?? "",
          chitValue: response.data.chitValue ?? "",
          remarks: response.data.remarks ?? "",

          // FDR And PSO Info (optional)
          psoOrderNumber: response.data.psoOrderNumber ?? "",
          psoDrOffice: response.data.psoDrOffice ?? "",
          psoOrderDate: response.data.psoOrderDate ?? "",
          csBank: response.data.csBank ?? "",
          csFdrNumber: response.data.csFdrNumber ?? "",
          csBankPlace: response.data.csBankPlace ?? "",
          fdCommencement: response.data.fdCommencement ?? "",
          fdInterest: response.data.fdInterest ?? "",
          fdAmount: response.data.fdAmount ?? "",
          fdMaturity: response.data.fdMaturity ?? "",
          fdPeriod: response.data.fdPeriod ?? "",

          // Agreement And Auction Info (optional)
          chitAgreementNumber: response.data.chitAgreementNumber ?? "",
          dateOfAgreement: response.data.dateOfAgreement ?? "",
          startDate: response.data.startDate ?? "",
          chitTerminationDate: response.data.chitTerminationDate ?? "",
          firstAuctionDate: response.data.firstAuctionDate ?? "",
          secondAuctionDate: response.data.secondAuctionDate ?? "",
          auctionStartTime: response.data.auctionStartTime ?? "",
          auctionEndTime: response.data.auctionEndTime ?? "",
        });
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchingSpecificGroupDetails();
    fetchChitPlans();
    fetchingBranch();
  }, [open]);

  const handleSave = async () => {
    try {
      // Check if any field in userDetails is empty (excluding whitespace)
      const hasEmptyField = Object.entries(groupDetails).some(
        ([key, value]) =>
          value === "" || (typeof value === "string" && value.trim() === "")
      );

      // if (hasEmptyField) {
      //   console.log("user details", userDetails);
      //   showErrorToast("Please fill in all the fields before creating.");
      //   return;
      // }

      const response = await UpdateGroup(selectedGroupId, groupDetails);
      if (response.success) {
        showToast(response.message);
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
      setGroupDetails((prevData) => ({
        ...prevData,
        chitPlan: value,
        totalMembers: selectedChit?.durationInMonths || "",
        durationInMonths: selectedChit?.durationInMonths || "",
        chitValue: selectedChit?.chitValue || "", // update chitValue too
      }));
    } else if (numericFields.includes(name)) {
      setGroupDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else if (dateFields.includes(name)) {
      const isoDate = new Date(value).toISOString(); // Converts "2026-01-10" to "2026-01-10T00:00:00.000Z"
      setGroupDetails((prevData) => ({
        ...prevData,
        [name]: isoDate,
      }));
    } else if (timeFields.includes(name)) {
      // value will be "13:45" -> convert to "13:45:00.000"
      const timeWithSeconds = `${value}:00.000`;
      setGroupDetails((prevData) => ({
        ...prevData,
        [name]: timeWithSeconds,
      }));
    } else {
      setGroupDetails((prevData) => ({
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
              <TabPanel value={tabValue} index={0} sx={{ p: 0, mt: 3 }}>
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
                          value={groupDetails.name}
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
                        value={groupDetails.branch}
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
                          value={groupDetails.chitPlan}
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
                        value={groupDetails.chitValue}
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
                        label="Due Date"
                        value={
                          groupDetails.dueDate
                            ? new Date(groupDetails.dueDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setGroupDetails((prev) => ({
                            ...prev,
                            dueDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                      ;
                    </Box>

                    <Grid item xs={12} sm={6} width={"31%"}>
                      <InputLabelLead>Chit Category</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <StyledSelect
                          value={groupDetails.chitCategory}
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
                          value={groupDetails.commission}
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
                          value={groupDetails.totalMembers}
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
                          value={groupDetails.durationInMonths}
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
                          value={groupDetails.remarks}
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
              <TabPanel value={tabValue} index={1} sx={{ p: 0, mt: 3 }}>
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
                          value={groupDetails?.psoOrderNumber ?? ""}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      </FormControl>
                    </Grid>

                    {/* chit value */}

                    <Box sx={{ width: "31%" }}>
                      <CustomDatePicker
                        label="PSO Order Date"
                        value={
                          groupDetails.psoOrderDate
                            ? new Date(groupDetails.psoOrderDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setGroupDetails((prev) => ({
                            ...prev,
                            psoOrderDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                      ;
                    </Box>

                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>PSO DR Office</InputLabelLead>
                      <LeadDataInput
                        fullWidth
                        name="psoDrOffice"
                        value={groupDetails.psoDrOffice}
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
                        value={groupDetails.csFdrNumber}
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
                        value={groupDetails.csBank}
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
                        value={groupDetails.csBankPlace}
                        onChange={handleInputChange}
                        placeholder="CS Bank Place"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>FD Commencement</InputLabelLead>
                      <CustomDatePicker
                        label="FD Commencement"
                        value={
                          groupDetails.fdCommencement
                            ? new Date(groupDetails.fdCommencement)
                            : null
                        }
                        onChange={(newValue) =>
                          setGroupDetails((prev) => ({
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
                      <CustomDatePicker
                        label="FD Maturity"
                        value={
                          groupDetails.fdMaturity
                            ? new Date(groupDetails.fdMaturity)
                            : null
                        }
                        onChange={(newValue) =>
                          setGroupDetails((prev) => ({
                            ...prev,
                            fdMaturity:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                      ;
                    </Box>

                    <Grid item xs={12} sm={4} width={"31%"}>
                      <InputLabelLead>FD Amount</InputLabelLead>
                      <FormControl fullWidth variant="outlined" size="small">
                        <LeadDataInput
                          fullWidth
                          placeholder="FD Amount"
                          name="fdAmount"
                          value={groupDetails.fdAmount}
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
                          value={groupDetails.fdInterest}
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
                          value={groupDetails.fdPeriod}
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
              <TabPanel value={tabValue} index={2} sx={{ p: 0, mt: 3 }}>
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
                          value={groupDetails.chitAgreementNumber}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      </FormControl>
                    </Grid>

                    <Box sx={{ width: "31%" }}>
                      <CustomDatePicker
                        label="Date of Agreement"
                        value={
                          groupDetails.dateOfAgreement
                            ? new Date(groupDetails.dateOfAgreement)
                            : null
                        }
                        onChange={(newValue) =>
                          setGroupDetails((prev) => ({
                            ...prev,
                            dateOfAgreement:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                      ;
                    </Box>

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>Chit Commencement Date</InputLabelLead>
                      <CustomDatePicker
                        label="Chit Commencement Date"
                        value={
                          groupDetails.startDate
                            ? new Date(groupDetails.startDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setGroupDetails((prev) => ({
                            ...prev,
                            startDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                      ;
                    </Box>

                    <Box sx={{ width: "31%" }}>
                      <InputLabelLead>Chit Termination Date</InputLabelLead>
                      <CustomDatePicker
                        label="Chit Termination Date"
                        value={
                          groupDetails.chitTerminationDate
                            ? new Date(groupDetails.chitTerminationDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setGroupDetails((prev) => ({
                            ...prev,
                            chitTerminationDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                      ;
                    </Box>

                    <Box sx={{ width: "31%" }}>
                      <CustomDatePicker
                        label="First Auction Date"
                        value={
                          groupDetails.firstAuctionDate
                            ? new Date(groupDetails.firstAuctionDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setGroupDetails((prev) => ({
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
                        label="Second Auction Date"
                        value={
                          groupDetails.secondAuctionDate
                            ? new Date(groupDetails.secondAuctionDate)
                            : null
                        }
                        onChange={(newValue) =>
                          setGroupDetails((prev) => ({
                            ...prev,
                            secondAuctionDate:
                              newValue instanceof Date && !isNaN(newValue)
                                ? newValue.toISOString()
                                : "", // or format however you want
                          }))
                        }
                      />
                      ;
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
                        value={groupDetails.auctionStartTime?.slice(0, 5) || ""}
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
                        value={groupDetails.auctionEndTime?.slice(0, 5) || ""}
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
              Update Group
            </FilledButton>
          </Box>
        </StyledDialogContent>
      </Box>
    </Dialog>
  );
};

const ManagerAddedMemberDetails = ({ open, onClose, memberId }) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(dayjs());
  const [transaction, setTransaction] = useState([]);
  const [memberDetails, setMemberDetails] = useState({});

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const fetchingMemberDetails = async () => {
    setLoading(true);

    try {
      const response = await getSpecificGroupMemberDetails(memberId);
      // setLeadData(response.data.lead);
      setMemberDetails(response.data);
    } catch (error) {
      console.error("Error fetching catalog products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionDetails = async () => {
    setLoading(true);
    try {
      const payload = {
        year: year.format("YYYY"),
      };

      const response = await getTransactionDetails(memberId, payload);
      // setLeadData(response.data.lead);

      setTransaction(response.data.transactions);
    } catch (error) {
      console.error("Error fetching catalog products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingMemberDetails();
    fetchTransactionDetails();
  }, []);
  const handleClose = () => {
    onClose();
  };
  const handleTabChange = (e, newVal) => {
    setTabValue(newVal);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["income", "totalMembers", "durationInMonths"];

    const dateFields = ["dob"];

    if (numericFields.includes(name)) {
      setMemberDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else if (dateFields.includes(name)) {
      const isoDate = new Date(value).toISOString(); // Converts "2026-01-10" to "2026-01-10T00:00:00.000Z"
      setMemberDetails((prevData) => ({
        ...prevData,
        [name]: isoDate,
      }));
    } else {
      setMemberDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value, // keep this fallback if needed
      }));
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 1,
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Profile Details
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <img src={CloseIcon} alt="closeIcon" />
            </IconButton>
          </DialogTitle>

          <Box sx={{ px: 2 }}>
            <ModalStyledTabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile tabs"
              scrollButtons="auto"
              variant="scrollable"
              sx={{
                "& .MuiTabScrollButton-root": {
                  display: "flex",
                  height: "40px",
                  alignItems: "end", // ensures arrow is centered
                },
              }}
            >
              {[
                "Personal Details",
                "Address Details",
                "Nominee details",
                "Chit history",
                "Bank Details",
                "Transactions",
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
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="310px" // 👈 set your desired min height here
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <DialogContent sx={{ p: 0 }}>
                {tabValue === 0 && (
                  <TabContext value={tabValue}>
                    <TabPanel value={tabValue} index={0} sx={{ p: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "#F9F9FF",
                          p: 2,
                          borderRadius: 3,
                        }}
                      >
                        <Grid container spacing={2}>
                          {/* First name */}

                          {/* User Type */}
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>User Type</InputLabelLead>
                            <FormControl
                              fullWidth
                              variant="outlined"
                              size="small"
                            >
                              <StyledSelect
                                value={memberDetails.userType}
                                name="userType"
                                onChange={(e) =>
                                  handleInputChange({
                                    target: {
                                      name: "userType",
                                      value: e.target.value,
                                    },
                                  })
                                } // IconComponent={KeyboardArrowDownIcon}
                                input={<StyledOutlinedInput />}
                                displayEmpty
                              >
                                <MenuItem disabled value="">
                                  Select
                                </MenuItem>
                                <MenuItem value="Individual">
                                  Individual
                                </MenuItem>
                                <MenuItem value="Company">Company</MenuItem>
                                <MenuItem value="Partnership">
                                  Partnership
                                </MenuItem>
                                <MenuItem value="Proprietorship">
                                  Proprietorship
                                </MenuItem>
                                <MenuItem value="LLP">LLP</MenuItem>
                              </StyledSelect>
                            </FormControl>
                          </Grid>

                          {/* Gender*/}
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>Gender</InputLabelLead>
                            <LeadDataInput
                              select
                              fullWidth
                              name="gender"
                              value={memberDetails.gender}
                              onChange={(e) =>
                                handleInputChange(
                                  {
                                    target: {
                                      name: "gender",
                                      value: e.target.value,
                                    },
                                  } // ✅ manually pass name/value
                                )
                              }
                              variant="outlined"
                              size="small"
                              displayEmpty
                              SelectProps={{
                                displayEmpty: true,
                                renderValue: (selected) => {
                                  if (!selected) {
                                    return (
                                      <span style={{ color: "#9e9e9e" }}>
                                        Select Gender
                                      </span>
                                    );
                                  }
                                  return selected;
                                },
                              }}
                            >
                              <MenuItem disabled value="">
                                Select Gender
                              </MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                              <MenuItem value="Male">Male</MenuItem>
                            </LeadDataInput>
                          </Grid>

                          <Grid item xs={12} sm={4} width={"21%"} flexGrow={1}>
                            <CustomDatePicker
                              label="DOB"
                              value={
                                memberDetails?.date
                                  ? new Date(memberDetails.date)
                                  : null
                              }
                              onChange={(newValue) =>
                                setMemberDetails((prev) => ({
                                  ...prev,
                                  date:
                                    newValue instanceof Date && !isNaN(newValue)
                                      ? newValue.toISOString()
                                      : "", // or format however you want
                                }))
                              }
                            />
                          </Grid>

                          {/* Phone number */}
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>Phone number</InputLabelLead>

                            <LeadDataInput
                              name="phoneNumber"
                              value={
                                memberDetails?.personalDetails?.phoneNumber ||
                                ""
                              }
                              // onChange={handleInputChange}
                              placeholder="55500 00000"
                              variant="outlined"
                              size="small"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    +91
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          {/* Email ID */}
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Email ID</InputLabelLead>
                            <LeadDataInput
                              fullWidth
                              name="email"
                              value={
                                memberDetails?.personalDetails?.email || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="you@company.com"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Profession</InputLabelLead>
                            <LeadDataInput
                              fullWidth
                              name="profession"
                              value={
                                memberDetails?.personalDetails?.profession || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="profession"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Aadhar number</InputLabelLead>
                            <LeadDataInput
                              fullWidth
                              name="aadharNumber"
                              value={
                                memberDetails?.personalDetails?.aadharNumber ||
                                ""
                              }
                              // onChange={handleInputChange}
                              placeholder="0000 0000 0000"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>PAN number</InputLabelLead>
                            <LeadDataInput
                              fullWidth
                              name="panNumber"
                              value={
                                memberDetails?.personalDetails?.panNumber || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="AAAAA1111A"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>

                          {/* WhatsApp number */}
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Company name</InputLabelLead>
                            <LeadDataInput
                              name="companyName"
                              value={
                                memberDetails?.personalDetails?.companyName ||
                                ""
                              }
                              // onChange={handleInputChange}
                              placeholder="company name"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>

                          {/* Alternate Email ID */}
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Designation</InputLabelLead>
                            <LeadDataInput
                              fullWidth
                              name="designation"
                              value={
                                memberDetails?.personalDetails?.designation ||
                                ""
                              }
                              // onChange={handleInputChange}
                              placeholder="designation"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} mt={3} fullWidth>
                          {/* Lead Source */}
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>Income (monthly)</InputLabelLead>

                            <LeadDataInput
                              fullWidth
                              name="income"
                              value={
                                memberDetails?.personalDetails?.income || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Income"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>
                              Sales Tax Reg. No.(TNGST)
                            </InputLabelLead>

                            <LeadDataInput
                              fullWidth
                              name="tngst"
                              value={
                                memberDetails?.personalDetails?.tngst || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Income"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>C.S.T.Reg. No.</InputLabelLead>

                            <LeadDataInput
                              fullWidth
                              name="cstRegistration"
                              value={
                                memberDetails?.personalDetails
                                  ?.cstRegistration || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="C.S.T.Reg. No."
                              variant="outlined"
                              size="small"
                            />
                          </Grid>{" "}
                          <Grid item xs={12} sm={4} width={"31%"}>
                            <InputLabelLead>Income Tax P.A.No.</InputLabelLead>

                            <LeadDataInput
                              fullWidth
                              name="incomeTax"
                              value={
                                memberDetails?.personalDetails?.incomeTax || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Income Tax P.A.No."
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          {/* User Type */}
                        </Grid>
                      </Box>
                    </TabPanel>
                  </TabContext>
                )}

                {tabValue === 1 && (
                  <>
                    {/* <FormContent> */}
                    <TabContext value={tabValue}>
                      <TabPanel value={tabValue} index={0} sx={{ p: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: "#F9F9FF",
                            p: 2,
                            borderRadius: 3,
                          }}
                        >
                          <SeparateContainerHeading>
                            Residential address
                          </SeparateContainerHeading>
                          <Grid container spacing={2}>
                            {/* <FormRow> */}
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>Pin Code</InputLabelLead>
                              <LeadDataInput
                                name="pinCode"
                                value={
                                  memberDetails?.addressDetails?.pinCode || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="Pin code"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>City </InputLabelLead>
                              <LeadDataInput
                                name="city"
                                value={
                                  memberDetails?.addressDetails?.city || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="City"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>Street</InputLabelLead>
                              <LeadDataInput
                                name="street"
                                value={
                                  memberDetails?.addressDetails?.street || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="Street"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>State </InputLabelLead>{" "}
                              <LeadDataInput
                                name="state"
                                value={
                                  memberDetails?.addressDetails?.state || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="State"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                          </Grid>
                          <SeparateContainerHeading mt="24px">
                            Permeant address
                          </SeparateContainerHeading>
                          <Grid container spacing={2}>
                            {/* <FormRow> */}
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>Pin Code</InputLabelLead>
                              <LeadDataInput
                                name="pinCode"
                                value={
                                  memberDetails?.addressDetails?.pinCode || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="Pin code"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>City </InputLabelLead>
                              <LeadDataInput
                                name="city"
                                value={
                                  memberDetails?.addressDetails?.city || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="City"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>Street</InputLabelLead>
                              <LeadDataInput
                                name="street"
                                value={
                                  memberDetails?.addressDetails?.street || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="Street"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>State </InputLabelLead>{" "}
                              <LeadDataInput
                                name="state"
                                value={
                                  memberDetails?.addressDetails?.state || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="State"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                          </Grid>
                          <SeparateContainerHeading mt="24px">
                            Company Address
                          </SeparateContainerHeading>
                          <Grid container spacing={2}>
                            {/* <FormRow> */}
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>Pin Code</InputLabelLead>
                              <LeadDataInput
                                name="pinCode"
                                value={
                                  memberDetails?.addressDetails?.pinCode || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="Pin code"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>City </InputLabelLead>
                              <LeadDataInput
                                name="city"
                                value={
                                  memberDetails?.addressDetails?.city || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="City"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>Street</InputLabelLead>
                              <LeadDataInput
                                name="street"
                                value={
                                  memberDetails?.addressDetails?.street || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="Street"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              sm={6}
                              width={"21%"}
                              flexGrow={1}
                            >
                              <InputLabelLead>State </InputLabelLead>{" "}
                              <LeadDataInput
                                name="state"
                                value={
                                  memberDetails?.addressDetails?.state || ""
                                }
                                // onChange={handleInputChange}
                                placeholder="State"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </TabPanel>
                    </TabContext>
                    {/* </FormContent> */}
                  </>
                )}

                {tabValue === 2 && (
                  <TabContext value={tabValue}>
                    <TabPanel value={tabValue} index={0} sx={{ p: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "#F9F9FF",
                          p: 2,
                          borderRadius: 3,
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} width={"31%"} flexGrow={1}>
                            <InputLabelLead>Nominee Name</InputLabelLead>
                            <LeadDataInput
                              name="nomineeName"
                              value={memberDetails?.nomineeDetails?.name || ""}
                              // onChange={handleInputChange}
                              placeholder="Nominee Name"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"} flexGrow={1}>
                            <InputLabelLead>Age</InputLabelLead>
                            <LeadDataInput
                              name="age"
                              value={memberDetails?.nomineeDetails?.age || ""}
                              // onChange={handleInputChange}
                              placeholder="Age"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
                            <InputLabelLead>Phone number</InputLabelLead>
                            <LeadDataInput
                              fullWidth
                              name="phoneNumber"
                              value={memberDetails?.nomineeDetails?.phoneNumber}
                              onChange={handleInputChange}
                              placeholder="Enter"
                              variant="outlined"
                              size="small"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    +91
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6} width={"31%"} flexGrow={1}>
                            <InputLabelLead>Relation</InputLabelLead>
                            <LeadDataInput
                              name="relation"
                              value={
                                memberDetails?.nomineeDetails?.relation || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Relation"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"} flexGrow={1}>
                            <InputLabelLead>Pin Code</InputLabelLead>
                            <LeadDataInput
                              name="pinCode"
                              value={
                                memberDetails?.nomineeDetails?.pinCode || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Pin code"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"} flexGrow={1}>
                            <InputLabelLead>City </InputLabelLead>
                            <LeadDataInput
                              name="city"
                              value={memberDetails?.nomineeDetails?.city || ""}
                              // onChange={handleInputChange}
                              placeholder="City"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} mt={2}>
                          <Grid item xs={12} sm={6} width={"32%"}>
                            <InputLabelLead>Street</InputLabelLead>
                            <LeadDataInput
                              name="street"
                              value={
                                memberDetails?.nomineeDetails?.street || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Street"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12} sm={6} width={"32%"}>
                            <InputLabelLead>State </InputLabelLead>{" "}
                            <LeadDataInput
                              name="state"
                              value={memberDetails?.nomineeDetails?.state || ""}
                              // onChange={handleInputChange}
                              placeholder="State"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </TabPanel>
                  </TabContext>
                )}
                {tabValue === 4 && (
                  <TabContext value={tabValue}>
                    <TabPanel value={tabValue} index={0} sx={{ p: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "#F9F9FF",
                          p: 2,
                          borderRadius: 3,
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Beneficiary name</InputLabelLead>
                            <LeadDataInput
                              name="beneficiaryName"
                              value={
                                memberDetails?.bankDetails?.beneficiaryName ||
                                ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Beneficiary name"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Bank Name</InputLabelLead>
                            <LeadDataInput
                              name="bankName"
                              value={memberDetails?.bankDetails?.bankName || ""}
                              // onChange={handleInputChange}
                              placeholder="Bank Name"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Branch Name</InputLabelLead>
                            <LeadDataInput
                              name="branchName"
                              value={
                                memberDetails?.bankDetails?.branchName || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Branch Name"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={2}>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Account Number</InputLabelLead>
                            <LeadDataInput
                              name="accountNumber"
                              value={
                                memberDetails?.bankDetails?.accountNumber || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Account Number"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>IFSC Code</InputLabelLead>
                            <LeadDataInput
                              name="ifscCode"
                              value={memberDetails?.bankDetails?.ifscCode || ""}
                              // onChange={handleInputChange}
                              placeholder="IFSC Code"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} width={"31%"}>
                            <InputLabelLead>Account Type</InputLabelLead>
                            <LeadDataInput
                              name="accountType"
                              value={
                                memberDetails?.bankDetails?.accountType || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Account Type"
                              fullWidth
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={2}>
                          <Grid item xs={12} sm={6} width={"51%"}>
                            <InputLabelLead>Branch Address</InputLabelLead>
                            <LeadDataInput
                              name="branchAddress"
                              value={
                                memberDetails?.bankDetails?.branchAddress || ""
                              }
                              // onChange={handleInputChange}
                              placeholder="Branch Address"
                              fullWidth
                              variant="outlined"
                              rows={4}
                              multiline
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </TabPanel>
                  </TabContext>
                )}

                {tabValue === 5 && (
                  <TabContext value={tabValue}>
                    <TabPanel value={tabValue} index={0} sx={{ p: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "#f7f7ff",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <InputLabelLead>Select Year</InputLabelLead>
                        <FormControl sx={{ mb: 2, minWidth: 200 }} size="small">
                          <DatePicker
                            views={["year"]}
                            value={year}
                            onChange={(newValue) => {
                              setYear(newValue);
                              handleChange("dueDate", newValue?.format("YYYY"));
                            }}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{
                              openPickerIcon: () => (
                                <img
                                  src={YearIcon}
                                  alt="CalendarIcon"
                                  style={{
                                    width: 20,
                                    height: 20,
                                    cursor: "pointer",
                                  }}
                                />
                              ),
                              textField: LeadDataInput,
                            }}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                size: "small",
                              },
                            }}
                          />
                        </FormControl>

                        <StyledTableContainer component={Paper} elevation={0}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <strong>Month</strong>
                                </TableCell>
                                {transaction.map((item, index) => (
                                  <TableCell key={index} align="center">
                                    {item.month}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <strong>Amount</strong>
                                </TableCell>
                                {transaction.map((item, index) => (
                                  <TableCell
                                    key={index}
                                    align="center"
                                    sx={{
                                      // minWidth: 30, // increase this until ₹ and 10,000 fit
                                      whiteSpace: "nowrap", // prevent wrapping
                                    }}
                                  >
                                    {item.amount ?? "-"}
                                  </TableCell>
                                ))}
                              </TableRow>

                              <TableRow>
                                <TableCell>
                                  <strong>Status</strong>
                                </TableCell>
                                {transaction.map((item, index) => (
                                  <TableCell
                                    key={index}
                                    align="center"
                                    sx={{
                                      backgroundColor:
                                        item.status === "Not-paid"
                                          ? "#fdeaea"
                                          : "transparent",
                                      color:
                                        item.status === "Not-paid"
                                          ? "#d32f2f"
                                          : "inherit",
                                      fontWeight:
                                        item.status === "Not-paid"
                                          ? "bold"
                                          : "normal",
                                    }}
                                  >
                                    {item.status}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableBody>
                          </Table>
                        </StyledTableContainer>
                      </Box>
                    </TabPanel>
                  </TabContext>
                )}

                {tabValue === 6 && (
                  <TabContext value={tabValue}>
                    <TabPanel value={tabValue} index={5} sx={{ p: 0, mt: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "#F9F9FF",
                          borderRadius: "16px",
                        }}
                      >
                        {memberDetails?.executiveUploads?.form ? (
                          <Box
                            sx={{
                              display: "flex",
                              gap: "30px",
                              flexWrap: "wrap",
                            }}
                          >
                            {memberDetails?.executiveUploads?.form && (
                              <Box
                                sx={{ textAlign: "center", cursor: "pointer" }}
                              >
                                <a
                                  href={memberDetails.executiveUploads.form}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={getFileThumbnail(
                                      memberDetails.executiveUploads.form
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
                                    sx={{
                                      maxWidth: 140,
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {decodeURIComponent(
                                      memberDetails.executiveUploads.form
                                        .split("/")
                                        .pop()
                                    )}
                                  </Typography>
                                </a>
                              </Box>
                            )}
                          </Box>
                        ) : (
                          <Box sx={{ textAlign: "center", py: 5 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              No Attachments
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </TabPanel>
                  </TabContext>
                )}
              </DialogContent>
            </>
          )}
        </LocalizationProvider>
      </Dialog>
    </>
  );
};

export { MemberDetailsById, UpdateGroupModal, ManagerAddedMemberDetails };
