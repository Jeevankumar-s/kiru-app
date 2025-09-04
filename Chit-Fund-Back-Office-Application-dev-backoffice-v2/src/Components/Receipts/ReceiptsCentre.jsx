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
  Chip,
} from "@mui/material";
import TickIcon from "../../assets/TabTick.svg";
import Trophy from "../../assets/Trophy.png";
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
  StyledPriceTab,
  StyledReceiptsTabs,
  TopModuleName,
} from "../../StyledElement.jsx";
import CRRCurrentBranch from "./CRR(currentBranch).jsx";
import CRROtherBranch from "./CRR(OtherBranch).jsx";
import TRRCurrentBranch from "./TRR(CurrentBranch).jsx";
import TRROtherBranch from "./TRR(OtherBranch).jsx";
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
  const { auctionId } = useParams();
  const [personalDetails, setPersonalDetails] = useState({});
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    "CRR (Current branch)",
    "CRR (Other branch)",
    "TRR (Current branch)",
    "TRR (Other branch)",
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "red" }}>
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
        {/* Header */}
        <TopContainerForAllPages>
          <TopModuleName>Winner List/ details </TopModuleName>

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

        <Box sx={{ width: "100%", p: 0, mt: 1 }}>
          <StyledReceiptsTabs
            value={value}
            onChange={handleChange}
            variant="standard"
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            {tabs.map((tab, index) => (
              <StyledPriceTab
                key={index}
                label={
                  <Box display="flex" alignItems="center" gap="5px">
                    {tab}
                    {status === "approved" && (
                      <img src={TickIcon} alt="tick" height="14" width="14" />
                    )}
                  </Box>
                }
                $status={status}
                $isFirst={index === 0}
                $isLast={index === tabs.length - 1}
              />
            ))}
          </StyledReceiptsTabs>
        </Box>
        <Paper
          elevation={1}
          sx={{
            minHeight: "100vh",
            padding: "20px 18px",
            mb: 3,
            // borderRadius: "16px",
            boxShadow: "none", // <-- explicitly remove shadow
          }}
        >
          {value === 0 && <CRRCurrentBranch />}
          {value === 1 && <CRROtherBranch />}
          {value === 2 && <TRRCurrentBranch />}
          {value === 3 && <TRROtherBranch />}
        </Paper>
        {/* </Container> */}
      </Box>
    </Box>
  );
}
