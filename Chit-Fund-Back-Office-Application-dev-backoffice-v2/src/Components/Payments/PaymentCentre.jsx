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
import CurrentBranch from "./CurrentBranch.jsx";
import Redraw from "./RedrawPayment.jsx";
import OtherBranch from "./OtherBranch.jsx";
import Forman from "./Forman.jsx";
import FormanSubstituted from "./FormanSubstituted.jsx"
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
    "Payment (Current branch)",
    "Payment (Other branch)",
    "Forman payment",
    "Forman substituted payment",
    "Undo payment",
    "Redraw payment",
  ];

  return (
    <Box sx={{ display: "flex",  backgroundColor: "red" }}>
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
        {/* Header */}
        <TopContainerForAllPages>
          <TopModuleName>Payments</TopModuleName>

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
            // minHeight: "100vh",
            padding: "20px 18px",
            mb: 3,
            // borderRadius: "16px",
            boxShadow: "none", // <-- explicitly remove shadow
          }}
        >
          {value === 0 && <CurrentBranch />}
          {value === 1 && <OtherBranch />}
          {value === 2 && <Forman />}
          {value === 3 && <FormanSubstituted />}
          {/* {value === 4 && <Redraw />} */}
          {value === 5 && <Redraw />}
        </Paper>
        {/* </Container> */}
      </Box>
    </Box>
  );
}
