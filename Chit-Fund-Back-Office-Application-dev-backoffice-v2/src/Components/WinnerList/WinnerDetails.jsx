import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCRM } from "../../Context/CRMContext.jsx";
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
  Chip,
} from "@mui/material";
import TickIcon from "../../assets/TabTick.svg";
import Trophy from "../../assets/Trophy.png";
import { gettingWinnerPersonalDetails } from "../API/Api.jsx";
import PdfImage from "../../assets/PDFImage.png";
import PersonalDetails from "./PersonalDetails.jsx";
import GuarantorDetails from "./GuarantorDetails.jsx";
import BankDetails from "./BankDetails.jsx";
import AttachmentsReceived from "./AttachmentsReceived.jsx";
import AttachmentsAndDeducations from "./AttachmentsAndDeduction.jsx";
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
} from "../../StyledElement.jsx";

const uploadedDocuments = {
  llp: "llp_document_url",
};

const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export default function WinnerListDetails() {
  const { showToast, showErrorToast } = useCRM();
  const { auctionId } = useParams();
  const [personalDetails, setPersonalDetails] = useState({});
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    // Allow going back
    if (newValue <= value) {
      setValue(newValue);
      return;
    }

    // Special case: from Personal Details (index 0)
    if (value === 0 && getApprovalStatus(tabs[0]) !== "approved") {
      if (newValue === 1) {
        setValue(newValue); // allow 1 step to Attachments & Deductions
      } else {
        showErrorToast(
          `"Personal Details" is not approved. You can only go to "Attachments & Deductions".`
        );
      }
      return;
    }

    // For tabs > 0: ensure previous tab is approved
    const previousTabStatus = getApprovalStatus(tabs[newValue - 1]);
    if (previousTabStatus === "approved") {
      setValue(newValue);
    } else {
      showErrorToast(
        `You can't go to "${tabs[newValue]}" until "${
          tabs[newValue - 1]
        }" is approved.`
      );
    }
  };

  const tabs = [
    "Personal Details",
    "Attachments & Deductions",
    "Attachments Received",
    "Guarantor",
    "Bank Details",
    "Amount Disbursal",
  ];

  const fetchingEmployeeDetails = async () => {
    try {
      const response = await gettingWinnerPersonalDetails(auctionId);
      if (response.statusCode === 200) {
        setPersonalDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingEmployeeDetails();
  }, [value]);

  const getApprovalStatus = (tabName) => {
    const approved = personalDetails?.approvalInfo?.[tabName];
    return approved === true ? "approved" : "rejected";
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "red" }}>
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
        {/* Header */}
        <TopContainerForAllPages>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#212890", cursor: "pointer" }}
          >
            Winner List/ details{" "}
          </Typography>

          <IconButton sx={{ color: "white", "&:hover": { color: "#007bff" } }}>
            {/* <img
              src={Notification}
              alt="Notification"
              style={{ size: "20px" }}
            /> */}
          </IconButton>
          {/* <NotificationsNoneRoundedIcon sx={{ color: "#8654e0" }} /> */}
        </TopContainerForAllPages>

        {/* Lead Status Cards */}

        {/* New Leads Section */}
        {/* <Container maxWidth="lg" sx={{ py: 4 }}> */}
        <Paper
          elevation={1}
          sx={{
            // minHeight: "100vh",
            padding: "20px 18px",
            mb: 3,
            mt: 1,
            borderRadius: "16px",
            boxShadow: "none", // <-- explicitly remove shadow
          }}
        >
          <Box sx={{ width: "100%", backgroundColor: "#fff", p: 1 }}>
            <StyledTabs
              value={value}
              onChange={handleChange}
              variant="standard"
            >
              {tabs.map((tab, index) => {
                const status = getApprovalStatus(tab);
                return (
                  <StyledTab
                    key={index}
                    label={
                      <Box display="flex" alignItems="center" gap="5px">
                        {tab}
                        {status === "approved" && (
                          <img
                            src={TickIcon}
                            alt="tick"
                            height="14"
                            width="14"
                          />
                        )}
                      </Box>
                    }
                    $status={status}
                    $isFirst={index === 0}
                    $isLast={index === tabs.length - 1}
                  />
                );
              })}
            </StyledTabs>
          </Box>

          {value === 0 && (
            <PersonalDetails fetchingCommonDetails={fetchingEmployeeDetails} />
          )}
          {value === 1 && (
            <AttachmentsAndDeducations
              fetchingCommonDetails={fetchingEmployeeDetails}
            />
          )}
          {value === 3 && (
            <GuarantorDetails fetchingCommonDetails={fetchingEmployeeDetails} />
          )}
          {value === 4 && (
            <BankDetails fetchingCommonDetails={fetchingEmployeeDetails} />
          )}
          {value === 2 && (
            <AttachmentsReceived
              fetchingCommonDetails={fetchingEmployeeDetails}
            />
          )}
        </Paper>
        {/* </Container> */}
      </Box>
    </Box>
  );
}
