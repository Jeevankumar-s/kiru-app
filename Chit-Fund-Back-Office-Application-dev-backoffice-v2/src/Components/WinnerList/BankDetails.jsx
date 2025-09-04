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
import Trophy from "../../assets/Trophy.png";
import { gettingWinnerPersonalDetails } from "../API/Api.jsx";
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
} from "../../StyledElement.jsx";
import { WinnerDetailsApprovalConfirmModal } from "../Modals/ApprovalModals.jsx";

export default function BankDetails({ fetchingCommonDetails }) {
  const { auctionId, winningDetailsId } = useParams();
  const [personalDetails, setPersonalDetails] = useState({});
  const [isOpenApproveConfirmation, setIsOpenApproveConfirmation] =
    useState(false);
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
  }, []);
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        padding: "16px ",
        backgroundColor: "#F9F9FF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "16px",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
          Bank Details
        </Typography>
        <FilledButton onClick={() => setIsOpenApproveConfirmation(true)}>
          Approve
        </FilledButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          marginBottom: "16px",
          backgroundColor: "#F9F9FF",
          borderRadius: "16px",
        }}
      >
        <Grid
          container
          spacing={2}
          display={"flex"}
          width={"100%"}
          sx={{ marginBottom: "32px" }}
        >
          <Grid item xs={12} sm={4} width={"31%"}>
            <EmployeeDetailsPageLabel variant="body2">
              Name of account holder
            </EmployeeDetailsPageLabel>
            <EmployeeDetailsPageInput
              fullWidth
              value={personalDetails?.bankDetails?.nameOfAccountHolder}
              // onChange={handleInputChange}
              placeholder="Account holder name"
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
            <EmployeeDetailsPageLabel variant="body2">
              Bank account number
            </EmployeeDetailsPageLabel>
            <EmployeeDetailsPageInput
              fullWidth
              value={personalDetails?.bankDetails?.bankAccountNumber}
              // onChange={handleInputChange}
              placeholder="Bank account number"
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
            <EmployeeDetailsPageLabel variant="body2">
              IFSC code
            </EmployeeDetailsPageLabel>
            <EmployeeDetailsPageInput
              fullWidth
              value={personalDetails?.bankDetails?.ifscCode}
              // onChange={handleInputChange}
              placeholder="IFSC code"
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
      </Box>

      <WinnerDetailsApprovalConfirmModal
        open={isOpenApproveConfirmation}
        onClose={() => {
          setIsOpenApproveConfirmation(false);
          fetchingCommonDetails();
        }}
        winningDetailsId={winningDetailsId}
        type="AmountDisbursal"
      />
    </Box>
  );
}
