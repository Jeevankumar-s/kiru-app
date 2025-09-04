"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, MenuItem, FormControl } from "@mui/material";
import SearchIcon from "../../assets/searchIcon.svg";
import {
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  // Sort as SortIcon,
} from "@mui/icons-material";
import TwelveHeads from "./TwelveHeads";
import TrialBalance from "./TrialBalance";
import GroupWar from "./GroupWar";
import OutstandingAndUnpaid from "./OutstandingAndUnpaid.jsx";
import Investments from "./Investments.jsx";
import TrialBalanceOfBank from "./BankTrialBalance.jsx";
import TrialBalanceOfOtherItems from "./OtherItemsTrialBalance.jsx";
import GroupWarChitControl from "./GroupWarChitControl.jsx";
import GroupWarChitTrial from "./GroupWarChitTrial.jsx";
import ForemanChits from "./ForemanChits.jsx";
import SundriesAndAdvances from "./SundriesAndAdvances.jsx";
import ProfitAndLoss from "./ProfitAndLoss.jsx";
import ParticularsOfChitPrizeMoney from "./ParticularsOfChitPrizeMoney.jsx";
import RegistrationOfPSO from "./RegistrationOfPSO.jsx";
import ChitDrawals from "./ChitDrawals.jsx";
import ParticularsOfAmountAtCredit from "./ParticularsOfAmountAtCredit.jsx";
import FilingDocument from "./FilingDocument.jsx";
import Deposits from "./Deposits.jsx";
import Stamps from "./Stamps.jsx";
import Decree from "./Decree.jsx";
import ParticularsOfEmoluments from "./ParticularsOfEmoluments.jsx";
import ParticularsOfSalary from "./ParticularsOfSalary.jsx";
import BPPForCurrentBranch from "./BPPForCurrentBranch.jsx";
import BPPForMChitsAndOtherBranches from "./BPPForMChitsAndOtherBranches.jsx";
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOne, setSelectedOne] = useState("12 Heads");
  const [listOfBooklets, setListOfBooklets] = useState([
    { name: "12 Heads" },
    { name: "Trial Balance" },
    { name: "Investments" },
    { name: "Trial Balance Of Bank" },
    { name: "Trial Balance Of Other Items" },
    { name: "Group War Chit Control" },
    { name: "Group War Chit Trial" },
    { name: "Group War" },
    { name: "Outstanding And Unpaid" },
    { name: "Foreman Chits" },
    { name: "Sundries And Advances" },
    { name: "Profit And Loss" },
    { name: "Particulars Of Chit Prize Money" },
    { name: "Registration Of PSO" },
    { name: "Chit Drawals" },
    { name: "Particulars of amount at credit" },
    { name: "Filing Document" },
    { name: "Deposits" },
    { name: "Stamps" },
    { name: "Decree" },
    { name: "Particulars of emoluments" },
    { name: "Particulars Of Salary" },
    { name: "BPP for current branch" },
    { name: "BPP for M chits & other branches" },
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
          <TopModuleName>Booklet</TopModuleName>

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
                <Grid size={{ xs: 12, sm: 4 }} sx={{ width: "34%" }}>
                  <InputLabelLead>Select booklet</InputLabelLead>
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
                <Grid size={{ xs: 12, sm: 4 }} sx={{ width: "24%" }}>
                  <CustomDatePicker
                    label="Start date"
                    value={startDate ? new Date(startDate) : null}
                    onChange={(newValue) =>
                      setStartDate(
                        newValue instanceof Date && !isNaN(newValue)
                          ? newValue.toISOString()
                          : ""
                      )
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} sx={{ width: "31%" }}>
                  <CustomDatePicker
                    label="End date"
                    value={endDate ? new Date(endDate) : null}
                    onChange={(newValue) =>
                      setEndDate(
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
            </Box>
          </Box>
          {selectedOne === "12 Heads" && <TwelveHeads />}
          {selectedOne === "Trial Balance" && <TrialBalance />}
          {selectedOne === "Investments" && <Investments />}
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
          )}
        </StyledPaper>
      </Box>
    </Box>
  );
}
