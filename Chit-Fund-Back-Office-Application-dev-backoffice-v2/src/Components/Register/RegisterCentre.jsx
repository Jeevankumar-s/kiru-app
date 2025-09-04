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

import TRR from "./TRR.jsx";
import CRR from "./CRR.jsx";

import {
  CustomDatePicker,
} from "../Reusable/Reusable.jsx";
import {
  TopContainerForAllPages,
  FilledButton,
  TopModuleName,
  StyledPaper,
  InputLabelLead,
  LeadDataInput,
  CommonSearchInput,
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

export default function RegisterCentre() {
  const { showToast, showErrorToast, openSidebar } = useCRM();
  const [specificDate, setSpecificDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedOne, setSelectedOne] = useState("Cash");
  const [listOfBooklets, setListOfBooklets] = useState([
    { name: "Cash" },
    { name: "Cheque" },
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
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
        <TopContainerForAllPages>
          <TopModuleName>Payment received register</TopModuleName>

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
            <Box
              sx={{
                alignItems: "center",
              }}
            >
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* chit plan */}

                <Grid
                  size={{ xs: 12, sm: 4 }}
                  item
                  width={"14%"}
                  sx={{ alignItems: "center" }}
                >
                  <InputLabelLead> </InputLabelLead>
                  <CommonSearchInput
                    placeholder="Search Group"
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={SearchIcon} alt="Search-icon" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: "100%", mt: "24px" }}
                  />
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 4 }}
                  item
                  width={"14%"}
                  sx={{ alignItems: "center" }}
                >
                  <InputLabelLead>Select payment method</InputLabelLead>
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
                <Grid size={{ xs: 12, sm: 4 }} item width={"14%"}>
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

                  {/* <CustomDateRangePicker
                    label="Date"
                    value={dateRange}
                    onChange={(newValue) => setDateRange(newValue)}
                  /> */}
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

          {selectedOne === "Cash" && <CRR />}
          {selectedOne === "Cheque" && <TRR />}
        </StyledPaper>
      </Box>
    </Box>
  );
}
