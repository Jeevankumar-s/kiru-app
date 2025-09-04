"use client";

import { use, useState, useEffect } from "react";
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  DialogActions,
  Modal,
  FormGroup,
} from "@mui/material";
import CloseIcon from "../../assets/CloseButtonIcon.svg";
import FilterIcon from "../../assets/filter.svg";
import { useCRM } from "../../Context/CRMContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "../../assets/searchIcon.svg";
import SortIcon from "../../assets/SortTable.svg";
import MoreIcon from "../../assets/more.svg";
import {
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import {
  ScheduleAuction,
  StartingAuction,
} from "../Modals/CreatingNewModals.jsx";
import {
  TopContainerForAllPages,
  OutlineButton,
  RowValues,
  TableHeadRow,
  CommonSearchInput,
  StyledCheckbox,
  StyledFilterImage,
  FilterFilledButton,
  FilterOutlinedButton,
  FilterModalHeading,
  CustomFormControlLabel,
  FilterModalSpecificContainer,
  FilterModalCommonHeading,
  PageNumberText,
  CurrentPageNumberText,
  FullPageCountCalculation,
  FilledButton,
  StyledSortImage,
  DashboardLabel,
  DashboardValue,
  PaginationContainer,
  StyledTableContainer,
  TopModuleName,
  StyledPaper,
} from "../../StyledElement.jsx";
// import Notification from "../../assets/CRMNotification.svg";
import { gettingAuctions, gettingAuctionDashboardStack } from "../API/Api.jsx";
import ArrowLeftIcon from "../../assets/paginationLeftArrow.svg";
import ArrowRightIcon from "../../assets/paginationRightArrow.svg";
const columnKeyMap = {
  "Chit Group": "chitGroup",
  Status: "status",
  "Chit Amount": "chitAmount",
  "Monthly Payment": "monthlyPayment",
  "Prized Amount": "prizedAmount",
  Dividend: "dividend",
  Commission: "commission",
  Prized: "prized",
  "Auction Date": "auctionDate",
};

const statusMap = {
  upcoming: "Upcoming",
  live: "Live",
  completed: "Completed",
  canceled: "Cancelled",
  disbursementPending: "DisbursementPending",
};

const getChipStyles = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return { bg: "#667085", color: "#fff" }; // Orange
    case "completed":
      return { bg: "#BD7B11", color: "#fff" }; // Yellow
    case "rejected":
      return { bg: "#EF5350", color: "#fff" }; // Red
    case "approved":
      return { bg: "#4CAF50", color: "#fff" }; // Green
    default:
      return { bg: "#E0E0E0", color: "#000" }; // Default gray
  }
};

const getDisbursementChipStatus = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return { disbursementBg: "#667085", disbursementColor: "#fff" }; // Orange
    case "completed":
      return { disbursementBg: "#03C229", disbursementColor: "#fff" }; // Yellow
    case "rejected":
      return { disbursementBg: "#EF5350", disbursementColor: "#fff" }; // Red
    case "approved":
      return { disbursementBg: "#03C229", disbursementColor: "#fff" }; // Green
    default:
      return { disbursementBg: "#E0E0E0", disbursementColor: "#000" }; // Default gray
  }
};

export default function Auction() {
  const navigate = useNavigate();
  const { showToast, showErrorToast, openSidebar } = useCRM();
  const [anchorElType, setAnchorElType] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [KycData, setKycData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [auctionStatus, setAuctionStatus] = useState("Completed");
  const [selectedAuctionId, setSelectedAuctionId] = useState(null);
  const [dashboardStack, setDashboardStack] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedAuctionName, setSelectedAuctionName] = useState("");
  const [sortBy, setSortBy] = useState({
    column: "updatedAt",
    direction: "desc",
  });
  const [openAssignTaskModal, setOpenAssignTaskModal] = useState(false);
  const [openColumnCustomizer, setOpenColumnCustomizer] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openStartAuctionModal, setOpenStartAuctionModal] = useState(false);

  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, totalResults);

  const getSortParam = () => {
    return sortBy.direction === "asc" ? sortBy.column : `${sortBy.column}:desc`;
  };

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const fetchDashboardStack = async () => {
    try {
      const response = await gettingAuctionDashboardStack();
      const formattedStack = Object.entries(response?.data).map(
        ([key, value]) => ({
          value,
          label: formatLabel(key), // Optional formatting of label
          status: statusMap[key] || key, // fallback to key if not mapped
        })
      );

      setDashboardStack(formattedStack);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const fetchGroup = async (page) => {
    setLoading(true);

    try {
      const response = await gettingAuctions(
        searchValue,
        getSortParam(),
        auctionStatus,
        // filterDateFrom,
        // filterDateTo,
        page
      );

      if (response.success) {
        setKycData(response?.data?.results);
        setTotalPages(response?.data?.totalPages);
        setTotalResults(response?.data?.totalResults);
      }
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchDashboardStack();
    fetchGroup(1);
  }, [searchValue, sortBy, auctionStatus]);

  useEffect(() => {
    fetchDashboardStack();
    fetchGroup(currentPage);
  }, [
    currentPage,
    // filterStatus,
    // filterDateFrom,
    // filterDateTo,
    // filterIsPrized,
  ]);

  const handleCheckboxChange = (leadId) => (event) => {
    if (event.target.checked) {
      setSelectedItems((prev) => [...prev, leadId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== leadId));
    }
  };

  const open = Boolean(anchorElType);

  const handleOpen = (event) => {
    setAnchorElType(event.currentTarget);
  };

  const StatusIndicator = ({ color, label, count }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "2px",
          backgroundColor: color,
        }}
      />
      <Typography variant="body2" color="textPrimary">
        {label} ({count})
      </Typography>
    </Stack>
  );

  const handleRowClick = async (auctionId, auctionName) => {
    try {
      if (auctionStatus === "Completed" || auctionStatus === "Live") {
        navigate(`/auction/participants/${auctionId}`);
      } else {
        setSelectedAuctionName(auctionName);
        setSelectedAuctionId(auctionId);
        // setOpenStartAuctionModal(true);
      }
    } catch (error) {
      console.error("Error fetching catalog products:", error);
    }
  };

  const toggleSort = (column) => {
    setSortBy((prev) => {
      if (prev.column === column) {
        // toggle direction
        return {
          column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      } else {
        // new column, default to ascending
        return { column, direction: "asc" };
      }
    });
  };

  const ColumnCustomizer = ({ open, onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedColumns, setSelectedColumns] = useState(["User Name"]);
    const columnOptions = [
      "Chit Group",
      "Status",
      "Chit Amount",
      "Monthly Payment",
      "Prized Amount",
      "Dividend",
      "Commission",
      "Prized",
      "Auction Date",
    ];
    const handleToggle = (label) => {
      setSelectedColumns((prev) =>
        prev.includes(label)
          ? prev.filter((item) => item !== label)
          : [...prev, label]
      );
    };

    const handleClear = () => {
      setSelectedColumns([]);
    };

    const handleSave = () => {
      onClose();
    };

    const filteredOptions = columnOptions.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Dialog open={open} onClose={onClose} maxWidth="xs">
        <Box sx={{ p: 2, borderRadius: "8px", width: 350 }}>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              pb: 1,
              pt: 0,
              pl: 0,
              pr: 0,
            }}
          >
            {/* <IconButton size="small">
              <img src={Options} alt="Options" />
            </IconButton> */}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Configure
            </Typography>
            <IconButton onClick={onClose}>
              <img src={CloseIcon} alt="closeIcon" />
            </IconButton>
          </DialogTitle>

          <Divider />

          <Box
            sx={{
              mt: 2,
              border: "1px solid #C7C0D0",
              p: 2,
              borderRadius: "4px",
            }}
          >
            {" "}
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500, fontSize: "16px" }}
            >
              Customise your table view
            </Typography>
            <TextField
              fullWidth
              placeholder="Search"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  "&.Mui-focused fieldset": {
                    borderColor: "#212890",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={SearchIcon} alt="Search-icon" />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                maxHeight: 150,
                display: "flex",

                flexDirection: "column", // Ensure vertical stacking

                overflowY: "auto",
                pr: 1,
                // Hide scrollbar arrows in WebKit browsers (Chrome, Safari, Edge)
                "&::-webkit-scrollbar-button": {
                  display: "none",
                  height: 0,
                },
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#aaa",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              {filteredOptions.map((label) => (
                <FormControlLabel
                  key={label}
                  control={
                    <StyledCheckbox
                      checked={selectedColumns.includes(label)}
                      onChange={() => handleToggle(label)}
                    />
                  }
                  label={label}
                />
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <FilterOutlinedButton variant="outlined" onClick={handleClear}>
              Clear
            </FilterOutlinedButton>
            <FilterFilledButton variant="contained" onClick={handleSave}>
              Apply
            </FilterFilledButton>
          </Box>
        </Box>
      </Dialog>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
        {/* Header */}

        <TopContainerForAllPages>
          <TopModuleName>Auction </TopModuleName>

          {/* <IconButton sx={{ color: "white", "&:hover": { color: "#007bff" } }}>
            <img
              src={Notification}
              alt="Notification"
              style={{ size: "20px" }}
            />
          </IconButton> */}
          {/* <NotificationsNoneRoundedIcon sx={{ color: "#8654e0" }} /> */}
        </TopContainerForAllPages>

        {/* Auction Status Cards */}
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
          mt={1}
          mb={1.1}
        >
          {" "}
          {dashboardStack.map((item, index) => (
            <Box
              key={index}
              flex="1 1 calc(20% - 16px)" // 5 items per row with gap
              minWidth="200px" // Prevents cards from shrinking too much on smaller screens
            >
              {" "}
              <Card
                onClick={() => setAuctionStatus(item.status)} // Set lead status on click
                sx={{
                  cursor: "pointer",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  // height: "100%",
                  display: "flex",
                  flexDirection: "column",

                  alignItems: "flex-start",
                  // textAlign: "center",
                  padding: "5px 18px",
                  boxShadow: "none",
                }}
              >
                <DashboardValue>{item.value} </DashboardValue>
                <DashboardLabel>{item.label}</DashboardLabel>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Auction Section */}
        <StyledPaper sx={{ paddingTop: "12px" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            {auctionStatus?.charAt(0).toUpperCase() +
              auctionStatus?.slice(1).toLowerCase()}
          </Typography>
          {/* Search and Actions Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <CommonSearchInput
                placeholder="Search user"
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
              />

              <IconButton
                size="small"
                onClick={() => setOpenColumnCustomizer(true)}
              >
                {/* <img src={Options} alt="Options" /> */}
              </IconButton>
            </Box>

            {auctionStatus.toLocaleLowerCase() === "upcoming" && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <FilledButton onClick={() => setOpenAssignTaskModal(true)}>
                  Schedule Auction
                </FilledButton>
                <IconButton
                // onClick={handleMenuClick}
                >
                  {/* <img
                  src={MoreIcon}
                  alt="Download-icon"
                  height={"21px"}
                  width={"21px"}
                />{" "} */}
                </IconButton>
              </Box>
            )}
          </Box>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60vh",
                }}
              >
                <CircularProgress />
              </Box>
            </Box>
          ) : (
            <StyledTableContainer
              sx={{
                minHeight: "calc(100vh - 335px)",
                maxHeight: "calc(100vh - 335px)",
              }}
            >
              <Table
                sx={{
                  width:
                    auctionStatus?.toLowerCase() === "completed"
                      ? "130%"
                      : "100%",
                  overflowX: "auto",
                  boxShadow: "none",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableHeadRow>
                      Chit Group
                      <>
                        <StyledSortImage
                          src={SortIcon}
                          onClick={() => toggleSort("chitGroup")}
                          alt="Sort-icon"
                        />
                      </>
                    </TableHeadRow>
                    {auctionStatus === "Completed" && (
                      <TableHeadRow>
                        Prized
                        <>
                          <StyledSortImage
                            src={SortIcon}
                            onClick={() => toggleSort("prized")}
                            alt="Sort-icon"
                          />
                        </>
                      </TableHeadRow>
                    )}
                    <TableHeadRow>
                      {" "}
                      Chit Amount
                      <>
                        <StyledSortImage
                          src={SortIcon}
                          onClick={() => toggleSort("chitAmount")}
                          alt="Sort-icon"
                        />
                      </>
                    </TableHeadRow>
                    {auctionStatus === "Completed" && (
                      <TableHeadRow>
                        Prized Amount
                        <>
                          <StyledSortImage
                            src={SortIcon}
                            onClick={() => toggleSort("prizedAmount")}
                            alt="Sort-icon"
                          />
                        </>
                      </TableHeadRow>
                    )}
                    {auctionStatus !== "Completed" && (
                      <TableHeadRow>
                        Monthly Payment
                        <>
                          <StyledSortImage
                            src={SortIcon}
                            onClick={() => toggleSort("monthlyPayment")}
                            alt="Sort-icon"
                          />
                        </>
                      </TableHeadRow>
                    )}
                    <TableHeadRow>
                      Participants
                      <>
                        <StyledSortImage
                          src={SortIcon}
                          onClick={() => toggleSort("participants")}
                          alt="Sort-icon"
                        />
                      </>
                    </TableHeadRow>
                    <TableHeadRow>
                      {" "}
                      Auction Date & Time
                      <>
                        <StyledSortImage
                          src={SortIcon}
                          onClick={() => toggleSort("auctionDate")}
                          alt="Sort-icon"
                        />
                      </>
                    </TableHeadRow>
                    {auctionStatus === "Completed" && (
                      <TableHeadRow>
                        Document Status
                        <>
                          <StyledSortImage
                            src={SortIcon}
                            onClick={() => toggleSort("documentStatus")}
                            alt="Sort-icon"
                          />
                        </>
                      </TableHeadRow>
                    )}
                    {auctionStatus === "Completed" && (
                      <TableHeadRow>
                        Disbursement Status
                        <>
                          <StyledSortImage
                            src={SortIcon}
                            onClick={() => toggleSort("disbursementStatus")}
                            alt="Sort-icon"
                          />
                        </>
                      </TableHeadRow>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {KycData &&
                    KycData.map((each) => {
                      const { bg, color } = getChipStyles(each.documentStatus);
                      const { disbursementBg, disbursementColor } =
                        getDisbursementChipStatus(each.disbursementStatus);
                      return (
                        <TableRow
                          key={each.id}
                          onClick={() =>
                            handleRowClick(each?.id, each?.chitGroup)
                          }
                          sx={{ cursor: "pointer" }}
                        >
                          <RowValues>{each.chitGroup || "-"}</RowValues>
                          {auctionStatus === "Completed" && (
                            <RowValues>{each.prized || "-"}</RowValues>
                          )}
                          <RowValues>{each.chitAmount || "-"}</RowValues>
                          {auctionStatus === "Completed" && (
                            <RowValues>{each.prizedAmount || "-"}</RowValues>
                          )}
                          {auctionStatus !== "Completed" && (
                            <RowValues>{each.monthlyPayment || "-"}</RowValues>
                          )}
                          <RowValues>{each.participants || "-"}</RowValues>
                          <RowValues>{each.auctionDateTime || "-"}</RowValues>
                          {auctionStatus === "Completed" && (
                            <RowValues>
                              <Chip
                                label={each.documentStatus}
                                size="small"
                                sx={{
                                  backgroundColor: bg,
                                  color,
                                  fontWeight: "bold",
                                  borderRadius: "16px",
                                  px: "4px",
                                  textTransform: "capitalize",
                                  pt: 0.5,
                                  pb: 0,
                                  minHeight: "26px", // to ensure height like in the image
                                  lineHeight: 1,
                                }}
                              />
                            </RowValues>
                          )}
                          {auctionStatus === "Completed" && (
                            <RowValues>
                              <Chip
                                label={each.disbursementStatus}
                                size="small"
                                sx={{
                                  backgroundColor: disbursementBg,
                                  color: disbursementColor,
                                  fontWeight: "bold",
                                  borderRadius: "16px",
                                  px: "4px",
                                  textTransform: "capitalize",
                                  pt: 0.5,
                                  pb: 0,
                                  minHeight: "26px", // to ensure height like in the image
                                  lineHeight: 1,
                                }}
                              />
                            </RowValues>
                          )}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </StyledTableContainer>
          )}
        </StyledPaper>
        <ColumnCustomizer
          open={openColumnCustomizer}
          onClose={() => setOpenColumnCustomizer(false)}
        />
        {openFilterModal && (
          <FilterModal
            open={openFilterModal}
            onClose={() => setOpenFilterModal(false)}
          />
        )}
      </Box>
      <ScheduleAuction
        open={openAssignTaskModal}
        onClose={() => {
          setOpenAssignTaskModal(false);
        }}
        selectedItems={selectedItems}
      />
      <StartingAuction
        open={openStartAuctionModal}
        onClose={() => setOpenStartAuctionModal(false)}
        selectedAuctionId={selectedAuctionId}
        selectedAuctionName={selectedAuctionName}
      />
      <PaginationContainer openSidebar={openSidebar}>
        <FullPageCountCalculation>
          {startIndex} - {endIndex} of {totalResults}
        </FullPageCountCalculation>
        <Button
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <img src={ArrowLeftIcon} alt="Left-icon" height="14px" width="14px" />
          {/* <ArrowLeftIcon
            sx={{
              fontSize: "30px",
              color: currentPage === 1 ? "#ccc" : "#9971FF",
            }}
          /> */}
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <PageNumberText>Pg</PageNumberText>

          <CurrentPageNumberText>{currentPage}</CurrentPageNumberText>
          <PageNumberText>of {totalPages}</PageNumberText>
        </Box>
        <Button
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          className="next-button-pagination"
          disabled={currentPage === totalPages || KycData?.length === 0}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          <img
            src={ArrowRightIcon}
            alt="Right-icon"
            height="14px"
            width="14px"
          />
          {/* <ArrowRightIcon
            sx={{
              fontSize: "30px",
              color:
                currentPage === totalPages || KycData.length === 0
                  ? "#ccc"
                  : "#9971FF",
            }}
          /> */}
        </Button>
      </PaginationContainer>
    </Box>
  );
}
