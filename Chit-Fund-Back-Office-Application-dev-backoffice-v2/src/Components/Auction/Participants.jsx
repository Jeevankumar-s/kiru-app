"use client";

import { use, useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

import SearchIcon from "../../assets/searchIcon.svg";
import SortIcon from "../../assets/SortTable.svg";
import MoreIcon from "../../assets/more.svg";

import {
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { ScheduleAuction } from "../Modals/CreatingNewModals.jsx";
import {
  TopContainerForAllPages,
  DashboardValue,
  DashboardLabel,
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
  StyledTableContainer,
  PaginationContainer,
  TopModuleName,
  StyledPaper,
} from "../../StyledElement.jsx";
// import Notification from "../../assets/CRMNotification.svg";
import {
  gettingAuctionsDetails,
  gettingAuctionDashboardStack,
} from "../API/Api.jsx";
import ArrowLeftIcon from "../../assets/paginationLeftArrow.svg";
import ArrowRightIcon from "../../assets/paginationRightArrow.svg";

const statusMap = {
  newLeads: "new-lead",
  inFollowUp: "follow-up",
  leadConverted: "lead-converted",
  leadLost: "lead-lost",
};

export default function Auction() {
  const navigate = useNavigate();
  const { auctionId } = useParams(); // Extract productId from route

  const [selectedAuctionId, setSelectedAuctionId] = useState("");
  const { showToast, showErrorToast, openSidebar } = useCRM();
  const [searchValue, setSearchValue] = useState("");
  const [auctionParticipants, setAuctionParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [dashboardStack, setDashboardStack] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState({ column: "", direction: "asc" });
  const [openAssignTaskModal, setOpenAssignTaskModal] = useState(false);
  const [auctionStatus, setAuctionStatus] = useState("completed");
  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, totalResults);
  const [winnerInfo, setWinnerInfo] = useState({});
  const [overviewData, setOverviewData] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null); // To store interval ID

  const getSortParam = () => {
    return sortBy.direction === "asc" ? sortBy.column : `${sortBy.column}:desc`;
  };

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const hasWinner =
      winnerInfo &&
      typeof winnerInfo === "object" &&
      Object.keys(winnerInfo).length > 0;

    const displayKeys = hasWinner
      ? ["bidRange", "lowestBid", "highestBid", "auctionDuration"]
      : ["bidRange", "currentLowestBid", "currentHighestBid"];

    let formattedStack = Object.entries(overviewData || {})
      .filter(([key]) => displayKeys.includes(key))
      .map(([key, value]) => ({
        value,
        label: formatLabel(key),
        status: statusMap[key] || key,
      }));

    if (!hasWinner && timeLeft !== null) {
      formattedStack.push({
        label: "Timer",
        value: timeLeft,
        status: "timer",
      });
    }

    setDashboardStack(formattedStack);
  }, [overviewData, winnerInfo, timeLeft]);
  const startTimer = (endTimeISO) => {
    const end = new Date(endTimeISO).getTime();

    const updateTimeLeft = () => {
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(timerRef.current);
        setTimeLeft("00:00:00");
      } else {
        const hours = String(
          Math.floor((diff / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0");
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
          2,
          "0"
        );
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    };

    // Call immediately
    updateTimeLeft();

    // Then start the interval
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(updateTimeLeft, 1000);
  };

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

  const fetchParticipants = async (page) => {
    try {
      const response = await gettingAuctionsDetails(
        auctionId,
        searchValue,
        getSortParam(),
        page
      );

      const overview = response?.data?.overview || {};
      const winner = response?.data?.winnerInfo;

      const hasWinner =
        winner && typeof winner === "object" && Object.keys(winner).length > 0;

      setOverviewData(overview);
      setWinnerInfo(winner || {});

      if (!hasWinner && overview?.endTime) {
        startTimer(overview.endTime);
      } else {
        setTimeLeft(null);
        if (timerRef.current) clearInterval(timerRef.current);
      }

      setAuctionParticipants(response?.data?.bidHistory);
      setTotalPages(response?.data?.totalPages);
      setTotalResults(response?.data?.totalResults);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    const page = searchValue ? 1 : currentPage; // Reset page to 1 if searchTerm changes
    // fetchDashboardStack();
    fetchParticipants(page);
  }, [searchValue, currentPage, sortBy]);

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

  const handleRowClick = async (auctionId) => {
    try {
      setSelectedAuctionId(auctionId);
    } catch (error) {
      showErrorToast(error.message);
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
                <DashboardValue
                  sx={{
                    color: item.label === "Timer" && "#AE2827",
                  }}
                >
                  {item.value}{" "}
                </DashboardValue>
                <DashboardLabel sx={{ marginTop: "2px" }}>
                  {item.label}
                </DashboardLabel>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Auction Section */}
        <StyledPaper>
          <Typography
            variant="h6"
            sx={{
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            Participants
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
            <Box sx={{ alignItems: "center", display: "flex", gap: 4 }}>
              <CommonSearchInput
                placeholder="Search Participants"
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

              {/* {winnerInfo && winnerInfo.length > 0 && ( */}
              <>
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #1a1a80, #000000)",
                    borderRadius: "0 16px 0px 16px",
                    padding: "3px 24px",
                    display: "inline-block",
                    border: "2px solid #FFB800",
                    color: "#FFD966",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 300,
                    fontSize: "24px",
                    lineHeight: "1.4",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      `/winnerlist/personal-details/${auctionId}/${winnerInfo?.winningDetailsId}/${winnerInfo?.userId}`
                    )
                  }
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#FFD966",
                      fontWeight: 300,
                      fontSize: "14px",
                    }}
                  >
                    Prized:{" "}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      color: "#FFD966",
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {winnerInfo?.name}
                  </Typography>
                </Box>

                {/* Status texts */}
                <Typography fontSize="14px">
                  Document status: <strong>{winnerInfo?.documentStatus}</strong>
                </Typography>
                <Typography fontSize="14px">
                  Disbursement status:{" "}
                  <strong>{winnerInfo?.disbursementStatus}</strong>
                </Typography>
              </>
              {/* )} */}
            </Box>
          </Box>
          <StyledTableContainer
            sx={{
              minHeight: "calc(100vh - 344px)",
              maxHeight: "calc(100vh - 344px)",
            }}
          >
            <Table
              sx={{
                boxShadow: "none",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableHeadRow>
                    Ticket ID
                    <>
                      <StyledSortImage
                        src={SortIcon}
                        onClick={() => toggleSort("ticketId")}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow>
                  <TableHeadRow>
                    {" "}
                    Participant{" "}
                    <>
                      <StyledSortImage
                        src={SortIcon}
                        onClick={() => toggleSort("participant")}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow>
                  <TableHeadRow>
                    Bid Amount{" "}
                    <>
                      <StyledSortImage
                        src={SortIcon}
                        onClick={() => toggleSort("bidAmount")}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow>
                  <TableHeadRow>Time</TableHeadRow>
                </TableRow>
              </TableHead>
              <TableBody>
                {auctionParticipants &&
                  auctionParticipants.map((each) => {
                    return (
                      <TableRow
                        key={each.id}
                        onClick={() => handleRowClick(each.id)}
                        sx={{ cursor: "pointer" }}
                      >
                        <RowValues>{each.ticketId || "-"}</RowValues>
                        <RowValues>{each.participant || "-"}</RowValues>
                        <RowValues>{each.bidAmount || "-"}</RowValues>
                        <RowValues>{each.time || "-"}</RowValues>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </StyledPaper>
      </Box>

      <ScheduleAuction
        open={openAssignTaskModal}
        onClose={() => {
          setOpenAssignTaskModal(false);
        }}
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
          disabled={
            currentPage === totalPages || auctionParticipants?.length === 0
          }
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
                currentPage === totalPages || auctionParticipants.length === 0
                  ? "#ccc"
                  : "#9971FF",
            }}
          /> */}
        </Button>
      </PaginationContainer>
    </Box>
  );
}
