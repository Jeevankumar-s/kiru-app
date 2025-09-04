"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
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
} from "@mui/material";
import SearchIcon from "../../assets/searchIcon.svg";
import {
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  // Sort as SortIcon,
} from "@mui/icons-material";
import Banks from "./Banks.jsx";
import TrialBalance from "./TrialBalance.jsx";
import Branches from "./Branches.jsx";
import ChitCollectionParticulars from "./ChitCollectionParticulars.jsx";
import CashReceivedRegister from "./CashReceivedRegister.jsx";
import TransferReceivedRegister from "./TransferReceivedRegister.jsx";
import TodayAuctionParticulars from "./TodayAuctionParticulars.jsx";
import Investments from "./Investments.jsx";
import DetailsForDebitInChitAccount from "./DetailsForDebitInChitAccount.jsx";
import DecreeDebtors from "./DecreeDebtors.jsx";
import CompanyChits from "./CompanyChits.jsx";
import OtherItems from "./OtherItems.jsx";
import SundriesAndAdvances from "./SundriesAndAdvances.jsx";
import ProfitAndLossAmount from "./ProfitAndLossAmount.jsx";
import Stamps from "./Stamps.jsx";
import Cash from "./Cash.jsx";

import { CustomDatePicker } from "../Reusable/Reusable.jsx";
import {
  TopContainerForAllPages,
  FilledButton,
  TopModuleName,
  StyledPaper,
  InputLabelLead,
  LeadDataInput,
} from "../../StyledElement";
import { LuIndianRupee } from "react-icons/lu";

// import Notification from "../../assets/CRMNotification.svg";
import { GettingBooklet } from "../API/Api";
import ArrowLeftIcon from "../../assets/paginationLeftArrow.svg";
import ArrowRightIcon from "../../assets/paginationRightArrow.svg";
import FilterIcon from "../../assets/filter.svg";
import SortIcon from "../../assets/SortTable.svg";
import { useCRM } from "../../Context/CRMContext.jsx";

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

export default function LeadsDashboard() {
  const { showToast, showErrorToast, openSidebar } = useCRM();
  const [specificDate, setSpecificDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOne, setSelectedOne] = useState("Banks");
  const [listOfBooklets, setListOfBooklets] = useState([
    { name: "Banks" },
    { name: "Trial Balance" },
    { name: "Branches" },
    { name: "Chit collection particulars (credit part of 5)" },
    { name: "Cash received register" },
    { name: "Transfer received register" },
    { name: "Today auction particulars" },
    { name: "Investments" },
    { name: "Details for debit in chit account(Debit part of 5)" },
    { name: "Decree debtors" },
    { name: "Company chits" },
    { name: "Other items" },
    { name: "Sundries & advances" },
    { name: "Profit & loss amount" },
    { name: "Stamps" },
    { name: "Cash" },
  ]);

  const fetchBooklet = async () => {
    try {
      const response = await GettingBooklet();
      setListOfBooklets(response?.data);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  // When filters or search change, reset page to 1
  useEffect(() => {
    fetchBooklet();
  }, []);
  // Whenever page or sort changes, fetch the data

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF", width: "100%" }}>
        <TopContainerForAllPages>
          <TopModuleName>Diary</TopModuleName>

          {/* <IconButton sx={{ color: "white", "&:hover": { color: "#007bff" } }}>
            <img
              src={Notification}
              alt="Notification"
              style={{ size: "20px" }}
            />
          </IconButton> */}
          {/* <NotificationsNoneRoundedIcon sx={{ color: "#8654e0" }} /> */}
        </TopContainerForAllPages>

        <StyledPaper>
          {/* Search and Actions Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              px: 2,
            }}
          >
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* chit plan */}
                <Grid
                  size={{ xs: 12, sm: 6 }}
                  item
                  width={"34%"}
                  flexGrow={1}
                  sx={{ width: "34%" }}
                >
                  <InputLabelLead>Select diary</InputLabelLead>
                  <FormControl fullWidth size="small">
                    <LeadDataInput
                      select
                      fullWidth
                      value={selectedOne}
                      onChange={(e) => setSelectedOne(e.target.value)}
                      placeholder="Select Series"
                      variant="outlined"
                      size="small"
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (!selected) {
                            return (
                              <span style={{ color: "#9e9e9e" }}>Select</span>
                            );
                          }

                          const selectedSeries = listOfBooklets?.find(
                            (series) => series.id === selected
                          );
                          return selectedSeries
                            ? selectedSeries.name
                            : selected;
                        },
                        MenuProps: {
                          PaperProps: {
                            sx: scrollbarStyles,
                          },
                        },
                      }}
                    >
                      {listOfBooklets?.map((each) => (
                        <MenuItem key={each.id} value={each.name}>
                          {each.name}
                        </MenuItem>
                      ))}
                    </LeadDataInput>
                  </FormControl>
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 6 }}
                  item
                  width={"34%"}
                  flexGrow={1}
                  sx={{ width: "24%" }}
                >
                  <CustomDatePicker
                    label="Date"
                    value={specificDate ? new Date(specificDate) : null}
                    onChange={(newValue) =>
                      setSpecificDate(
                        newValue instanceof Date && !isNaN(newValue)
                          ? newValue.toISOString()
                          : ""
                      )
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ gap: 2, alignItems: "flex-end", ml: "auto" }}>
              <FilledButton
                sx={{ alignItems: "flex-end" }}
                onClick={() => setOpenCreateGroupModal(true)} // ✅ This runs only on click
              >
                Export
              </FilledButton>
              <IconButton
              // onClick={handleMenuClick}
              >
                {/* <MoreVertIcon /> */}
              </IconButton>
            </Box>
          </Box>
          {selectedOne === "Banks" && <Banks />}
          {selectedOne === "Trial Balance" && <TrialBalance />}
          {selectedOne === "Branches" && <Branches />}
          {selectedOne === "Chit collection particulars (credit part of 5)" && (
            <ChitCollectionParticulars />
          )}
          {selectedOne === "Cash received register" && <CashReceivedRegister />}
          {selectedOne === "Transfer received register" && (
            <TransferReceivedRegister />
          )}
          {selectedOne === "Today auction particulars" && (
            <TodayAuctionParticulars />
          )}
          {selectedOne === "Investments" && <Investments />}
          {selectedOne ===
            "Details for debit in chit account(Debit part of 5)" && (
            <DetailsForDebitInChitAccount />
          )}
          {selectedOne === "Decree debtors" && <DecreeDebtors />}
          {selectedOne === "Company chits" && <CompanyChits />}
          {selectedOne === "Other items" && <OtherItems />}
          {selectedOne === "Sundries & advances" && <SundriesAndAdvances />}
          {selectedOne === "Profit & loss amount" && <ProfitAndLossAmount />}
          {selectedOne === "Stamps" && <Stamps />}

          {selectedOne === "Cash" && <Cash />}
          {/* {selectedOne === "Investments" && <Investments />}
          {selectedOne === "Trial Balance Of Bank" && <TrialBalanceOfBank />}
          {selectedOne === "Trial Balance Of Other Items" && (
            <TrialBalanceOfOtherItems />
          )}
          {selectedOne == "Group War Chit Control" && <GroupWarChitControl />}
          {selectedOne === "Group War Chit Trial" && <GroupWarChitTrial />}
          {selectedOne === "Group War" && <GroupWar />}
          {selectedOne === "Outstanding And Unpaid" && <OutstandingAndUnpaid />}
          {selectedOne === "Foreman Chits" && <ForemanChits />}
          {selectedOne === "Sundries And Advances" && <SundriesAndAdvances />}
          {selectedOne === "Profit And Loss" && <ProfitAndLoss />}
          {selectedOne === "Particulars Of Chit Prize Money" && (
            <ParticularsOfChitPrizeMoney />
          )}
          {selectedOne === "Registration Of PSO" && <RegistrationOfPSO />}
          {selectedOne === "Chit Drawals" && <ChitDrawals />}
          {selectedOne === "Particulars of amount at credit" && (
            <ParticularsOfAmountAtCredit />
          )}
          {selectedOne === "Filing Document" && <FilingDocument />}
          {selectedOne === "Deposits" && <Deposits />}
          {selectedOne === "Stamps" && <Stamps />}
          {selectedOne === "Decree" && <Decree />}

          {selectedOne === "Particulars of emoluments" && (
            <ParticularsOfEmoluments />
          )}
          {selectedOne === "Particulars Of Salary" && <ParticularsOfSalary />}
          {selectedOne === "BPP for current branch" && <BPPForCurrentBranch />}
          {selectedOne === "BPP for M chits & other branches" && (
            <BPPForMChitsAndOtherBranches />
          )} */}
        </StyledPaper>
      </Box>
    </Box>
  );
}
