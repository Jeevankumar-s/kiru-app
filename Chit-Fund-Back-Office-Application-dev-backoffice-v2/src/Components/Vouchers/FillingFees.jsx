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
  GettingCreditHeads,
  GettingAllTokens,
  FillingFee,
  GettingSubscriberNameById,
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
import { CustomDatePicker } from "../Reusable/Reusable.jsx";
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

export default function FillingFees({ fetchingCommonDetails }) {
  const { winningDetailsId } = useParams();
  const { showToast, showErrorToast } = useCRM();
  const [voucherDetails, setVoucherDetails] = useState({
    subscriberName: "test",
  });
  const [isOpenApproveConfirmation, setIsOpenApproveConfirmation] =
    useState(false);
  const [groupList, setGroupList] = useState([]);
  const [listOfTokens, setListOfTokens] = useState([]);
  const [subscriberList, setSubscriberList] = useState([]);
  const [creditHeadList, setCreditHeadList] = useState([]);

  const fetchingSubcribers = async () => {
    try {
      const response = await GettingAllTokens();
      if (response.success) {
        setSubscriberList(response.data.results);
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

  const fetchingSubscriberName = async () => {
    const response = await GettingSubscriberNameById(
      voucherDetails?.chitNumber
    );
    if (response.success) {
      setVoucherDetails((prev) => ({
        ...prev,
        subscriberName: response?.data?.name || "",
      }));
    }
  };

  useEffect(() => {
    fetchingCreditHeads();
    fetchingSubcribers();
    fetchingGroup();
  }, []);

  useEffect(() => {
    if (voucherDetails?.chitNumber) {
      fetchingSubscriberName();
    }
  }, [voucherDetails?.chitNumber]);

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
      setVoucherDetails((prevData) => ({
        ...prevData,
        chitPlan: value,
        totalMembers: selectedChit?.durationInMonths || "",
        durationInMonths: selectedChit?.durationInMonths || "",
        chitValue: selectedChit?.chitValue || "", // update chitValue too
      }));
    } else if (numericFields.includes(name)) {
      setVoucherDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else if (dateFields.includes(name)) {
      const isoDate = new Date(value).toISOString(); // Converts "2026-01-10" to "2026-01-10T00:00:00.000Z"
      setVoucherDetails((prevData) => ({
        ...prevData,
        [name]: isoDate,
      }));
    } else if (timeFields.includes(name)) {
      // value will be "13:45" -> convert to "13:45:00.000"
      const timeWithSeconds = `${value}:00.000`;
      setVoucherDetails((prevData) => ({
        ...prevData,
        [name]: timeWithSeconds,
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
      // Add your form submission logic here
      console.log("Form submitted with data:", voucherDetails);
      // Reset form or show success message as needed

      const response = await FillingFee(voucherDetails);
      if (response.success) {
        showToast(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FullContainer>
      {/* Form Section */}
      <VioletContainer>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
            <InputLabelLead>Group name</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="group"
              value={voucherDetails.group}
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
          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
            <InputLabelLead>Subscriber name</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="chitNumber"
              value={voucherDetails.chitNumber}
              onChange={handleInputChange}
              placeholder="Select Subscriber"
              variant="outlined"
              size="small"
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9e9e9e" }}>Select</span>;
                  }

                  const selectedSubscriber = subscriberList?.find(
                    (branch) => branch.id === selected
                  );
                  return selectedSubscriber
                    ? selectedSubscriber.node
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
                <MenuItem key={subscriber.id} value={subscriber.id}>
                  {subscriber?.node}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
            <InputLabelLead>Draw number</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="drawNumber"
              value={voucherDetails.drawNumber}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
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
          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
            <InputLabelLead>Amount</InputLabelLead>
            <LeadDataInput
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
          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
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
          <Grid item xs={12} sm={4} width={"41%"} flexGrow={1}>
            <InputLabelLead>Description</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="description"
              value={voucherDetails.description}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <FilledButton sx={{ width: "180px" }} onClick={handleSubmit}>
            Generate
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
