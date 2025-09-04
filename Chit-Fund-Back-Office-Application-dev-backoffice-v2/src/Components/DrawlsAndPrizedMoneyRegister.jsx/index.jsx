import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SmallSideBar from "../../Components/PermanentContent/SmallSidebar";
import SideBar from "../../Components/PermanentContent/Sidebar";
import { useCRM } from "../../Context/CRMContext.jsx";
import SearchIcon from "../../assets/searchIcon.svg";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";
import DrawlsAndPrizedMoneyRegister from "./DrawlsAndPrizedMoneyRegister.jsx";

import {
  Box,
  Grid,
  MenuItem,
  InputAdornment,
  FormControl,
} from "@mui/material";
import {
  TopContainerForAllPages,
  FilledButton,
  TopModuleName,
  StyledPaper,
  InputLabelLead,
  LeadDataInput,
  CommonSearchInput,
} from "../../StyledElement";

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

const App = () => {
  const { openSidebar, showErrorToast } = useCRM();
  console.log("openSidebar", openSidebar);
  const location = useLocation();
  const { groupId } = useParams(); // Extract productId from route
  const [groupList, setGroupList] = useState([]);
  const [specificDate, setSpecificDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOne, setSelectedOne] = useState("Cash");

  const fetchBooklet = async () => {
    try {
      const response = await GettingBooklet();
      setGroupList(response?.data);
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F6FF" }}>
      {/* <Navbar /> */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          position: "relative",
          // top: "80px",
        }}
      >
        {openSidebar ? <SideBar /> : <SmallSideBar />}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            marginLeft: openSidebar ? "214px" : "114px",
            minHeight: "calc(100vh - 10px)",
            position: "relative",
            gap: "7px",
            marginTop: "7px",
            borderRadius: "16px",
            overflow: "hidden",
            borderRight: "9px solid #F5F6FF",
          }}
        >
          <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
            <TopContainerForAllPages>
              <TopModuleName>Drawls & prized money register</TopModuleName>
              {/* <IconButton sx={{ color: "white", "&:hover": { color: "#007bff" } }}>
                    <img
                      src={Notification}
                      alt="Notification"
                      style={{ size: "20px" }}
                    />
                  </IconButton> */}
              {/* <NotificationsNoneRoundedIcon sx={{ color: "#8654e0" }} /> */}
            </TopContainerForAllPages>
            <StyledPaper sx={{ minHeight: "calc(100vh - 113px)" }}>
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
                    display: "flex",
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
                      <InputLabelLead>Chit group</InputLabelLead>
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
                                  <span style={{ color: "#9e9e9e" }}>
                                    Select
                                  </span>
                                );
                              }
                              const selectedSeries = groupList?.find(
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
                          {groupList?.map((each) => (
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
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ gap: 2, alignItems: "flex-end", ml: "auto" }}>
                  <FilledButton sx={{ alignItems: "flex-end" }}>
                    Export
                  </FilledButton>
                </Box>
              </Box>
              <DrawlsAndPrizedMoneyRegister />
            </StyledPaper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
