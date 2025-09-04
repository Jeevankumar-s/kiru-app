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
import {
  GettingEmployeeTypes,
  AddingSubscriber,
  GettingSubscriber,
  GettingMoneyCollectorList,
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

export default function CRROtherBranch({ fetchingCommonDetails }) {
  const { winningDetailsId } = useParams();
  const [subscriberDetails, setSubscriberDetails] = useState({});
  const [isOpenApproveConfirmation, setIsOpenApproveConfirmation] =
    useState(false);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [listOfTokens, setListOfTokens] = useState([]);
  const [collectorNameList, setCollectorNameList] = useState([]);
  const [subscriberList, setSubscriberList] = useState([]);
  const [moneyCollectorList, setMoneyCollectorList] = useState([]);

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

  const fetchingMoneyCollectorList = async () => {
    try {
      const response = await GettingMoneyCollectorList();
      if (response.statusCode === 200) {
        setMoneyCollectorList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingSubscriberList = async () => {
    try {
      const response = await GettingSubscriber();
      if (response.statusCode === 200) {
        setSubscriberList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingSubscriberList();
    fetchingEmployeeTypes();
    fetchingMoneyCollectorList;
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

                  const selectedGroup = collectorNameList.find(
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
              {collectorNameList.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
        </Grid>
      </Box>
      {/* Transactions Section */}
      <VioletContainer>
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
                      <span style={{ color: "#9e9e9e" }}>Select Branch</span>
                    );
                  }

                  const selectedSubscriber = listOfTokens.find(
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
              {subscriberList.map((subscriber) => (
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

                  const selectedSubscriber = listOfTokens.find(
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
              {subscriberList.map((subscriber) => (
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
                  return selectedCollector ? selectedCollector.name : selected;
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
          <FilledButton sx={{ width: "180px" }} onClick={handleSubmit}>
            Suggest
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
