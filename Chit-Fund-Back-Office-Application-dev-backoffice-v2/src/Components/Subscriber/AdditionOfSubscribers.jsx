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
import Trophy from "../../assets/Trophy.png";
import { GettingEmployeeTypes, AddingSubscriber } from "../API/Api.jsx";
import CalenderIcon from "../../assets/calender.svg";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";
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
  const [subscriberDetails, setSubscriberDetails] = useState({});
  const [isOpenApproveConfirmation, setIsOpenApproveConfirmation] =
    useState(false);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [listOfTokens, setListOfTokens] = useState([]);
  const [collectorNameList, setCollectorNameList] = useState([]);

  const fetchingEmployeeTypes = async () => {
    try {
      const response = await GettingEmployeeTypes();
      if (response.statusCode === 200) {
        setEmployeeTypes(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingEmployeeTypes();
  }, []);

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
      const selectedChit = listOfTokens.find((chit) => chit.id === value);
      setSubscriberDetails((prevData) => ({
        ...prevData,
        chitPlan: value,
        totalMembers: selectedChit?.durationInMonths || "",
        durationInMonths: selectedChit?.durationInMonths || "",
        chitValue: selectedChit?.chitValue || "", // update chitValue too
      }));
    } else if (numericFields.includes(name)) {
      setSubscriberDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else if (dateFields.includes(name)) {
      const isoDate = new Date(value).toISOString(); // Converts "2026-01-10" to "2026-01-10T00:00:00.000Z"
      setSubscriberDetails((prevData) => ({
        ...prevData,
        [name]: isoDate,
      }));
    } else if (timeFields.includes(name)) {
      // value will be "13:45" -> convert to "13:45:00.000"
      const timeWithSeconds = `${value}:00.000`;
      setSubscriberDetails((prevData) => ({
        ...prevData,
        [name]: timeWithSeconds,
      }));
    } else {
      setSubscriberDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value, // keep this fallback if needed
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Add your form submission logic here
      console.log("Form submitted with data:", subscriberDetails);
      // Reset form or show success message as needed

      const response = await AddingSubscriber(subscriberDetails);
      if (response.statusCode === 200) {
        setIsOpenApproveConfirmation(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FullContainer>
      <Box>
        <Grid container spacing={2} display={"flex"} width={"100%"}>
          <Grid item xs={12} sm={4} width={"15%"} flexShrink={1}>
            <EmployeeDetailsPageLabel>Subscriber type</EmployeeDetailsPageLabel>
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
      {/* Transactions Section */}
      <VioletContainer>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Subscriber name</EmployeeDetailsPageLabel>
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
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Phone number</EmployeeDetailsPageLabel>
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
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Email ID</EmployeeDetailsPageLabel>
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
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>PAN number</EmployeeDetailsPageLabel>
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
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Aadhar number</EmployeeDetailsPageLabel>
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
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <CustomDatePicker
              label="DOB"
              value={
                subscriberDetails.dob ? new Date(subscriberDetails.dob) : null
              }
              onChange={(newValue) =>
                setSubscriberDetails((prev) => ({
                  ...prev,
                  dob: newValue?.toISOString() ?? "", // or format however you want
                }))
              }
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"32%"}>
            <EmployeeDetailsPageLabel>
              Residential address
            </EmployeeDetailsPageLabel>
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
          <Grid item xs={12} sm={4} width={"32%"}>
            <EmployeeDetailsPageLabel>
              Permanent address
            </EmployeeDetailsPageLabel>
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
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Company name</EmployeeDetailsPageLabel>
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
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Employee type</EmployeeDetailsPageLabel>
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

                  const selectedNumber = listOfTokens.find(
                    (token) => token.id === selected
                  );
                  return selectedNumber ? selectedNumber.name : selected;
                },
                MenuProps: {
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                },
              }}
            >
              {listOfTokens.map((token) => (
                <MenuItem key={token.id} value={token.name}>
                  {token.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"} flexGrow={1}>
            <EmployeeDetailsPageLabel>Designation</EmployeeDetailsPageLabel>
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
          <Grid item xs={12} sm={4} width={"32%"}>
            <EmployeeDetailsPageLabel>
              Income (monthly)
            </EmployeeDetailsPageLabel>
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
          <Grid item xs={12} sm={4} width={"32%"}>
            <EmployeeDetailsPageLabel>Company address</EmployeeDetailsPageLabel>
            <LeadDataInput
              fullWidth
              name="companyAddress"
              value={subscriberDetails.companyAddress}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
              rows={3}
              multiline
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <FilledButton sx={{ width: "180px" }} onClick={handleSubmit}>
            Add Subscriber
          </FilledButton>
        </Box>
      </VioletContainer>

      <WinnerDetailsApprovalConfirmModal
        open={isOpenApproveConfirmation}
        onClose={() => {
          setIsOpenApproveConfirmation(false);
          fetchingCommonDetails();
        }}
        winningDetailsId={winningDetailsId}
        type="Agreement"
      />
    </FullContainer>
  );
}
