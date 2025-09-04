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
} from "@mui/material";
import SearchIcon from "../../assets/searchIcon.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { ManagerAddedMemberDetails } from "../Modals/SpecificDetailsModal.jsx";
import {
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  // Sort as SortIcon,
} from "@mui/icons-material";
import MoreIcon from "../../assets/more.svg";
import { UpdateGroupModal } from "../Modals/SpecificDetailsModal.jsx";
import { ChitGroupFilterModal } from "../Modals/FilterModals";
import { CreatingNewGroup } from "../Modals/CreatingNewModals";
import {
  TopContainerForAllPages,
  FilledButton,
  RowValues,
  CommonSearchInput,
  StyledFilterImage,
  StyledSortImage,
  PageNumberText,
  CurrentPageNumberText,
  TableHeadRow,
  FullPageCountCalculation,
  PaginationContainer,
  TopModuleName,
  StyledTableContainer,
  StyledPaper,
  StyledMenuItems,
} from "../../StyledElement";
import { LuIndianRupee } from "react-icons/lu";

// import Notification from "../../assets/CRMNotification.svg";
import {
  GettingAllSubscribers,
  gettingChitgroupDashboardData,
} from "../API/Api";
import ArrowLeftIcon from "../../assets/paginationLeftArrow.svg";
import ArrowRightIcon from "../../assets/paginationRightArrow.svg";
import FilterIcon from "../../assets/filter.svg";
import SortIcon from "../../assets/SortTable.svg";
import { useCRM } from "../../Context/CRMContext.jsx";

export default function LeadsDashboard() {
  const navigate = useNavigate();
  const { showErrorToast, openSidebar } = useCRM();
  const [searchValue, setSearchValue] = useState("");
  const [subscriberData, setSubscriberData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openMemberDetailsModal, setOpenMemberDetailsModal] = useState(true);
  const [finalSelectedBranches, setFinalSelectedBranches] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState({
    column: "updatedAt",
    direction: "desc",
  });
  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, totalResults);

  const fetchSubscriber = async (page) => {
    setLoading(true);

    try {
      const response = await GettingAllSubscribers(searchValue, page);
      setSubscriberData(response?.data?.results);
      setTotalPages(response?.data?.totalPages);
      setTotalResults(response?.data?.totalResults);
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  // When filters or search change, reset page to 1
  useEffect(() => {
    setCurrentPage(1);
    fetchSubscriber(1);
  }, [searchValue, finalSelectedBranches, filterStatus, sortBy]);
  // Whenever page or sort changes, fetch the data
  useEffect(() => {
    fetchSubscriber(currentPage);
  }, [currentPage]);

  const handleRowClick = (groupId) => {
    navigate(`/chitgroup/${groupId}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
        <TopContainerForAllPages>
          <TopModuleName>Subscriber</TopModuleName>

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
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <CommonSearchInput
                placeholder="Search Subscriber"
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
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <FilledButton
                onClick={() => navigate("/adding-new-subscriber")} // ✅ This runs only on click
              >
                Add Subscriber
              </FilledButton>
              <IconButton
              // onClick={handleMenuClick}
              >
                {/* <MoreVertIcon /> */}
              </IconButton>
            </Box>
          </Box>

          {/* subscriber Table */}

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
                minHeight: "calc(100vh - 223px)",
                maxHeight: "calc(100vh - 223px)",
              }}
            >
              <Table
                sx={{
                  // ...(openSidebar && { width: "118%" }),
                  overflowX: "auto",
                  boxShadow: "none",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableHeadRow>Subscriber</TableHeadRow>
                    <TableHeadRow>Sub ID</TableHeadRow>
                    <TableHeadRow>Name</TableHeadRow>
                    <TableHeadRow>Father/husband</TableHeadRow>
                    <TableHeadRow>Address</TableHeadRow>
                    <TableHeadRow>Aadhar no</TableHeadRow>
                    <TableHeadRow>Mobile no</TableHeadRow>
                    <TableHeadRow>Token</TableHeadRow>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subscriberData.length > 0 ? (
                    subscriberData.map((each) => (
                      <TableRow
                        key={each.id}
                        onClick={() => {
                          handleRowClick(each.id);
                        }}
                      >
                        <RowValues>{each.subId || "-"}</RowValues>
                        <RowValues>{each.name || "-"}</RowValues>
                        <RowValues>
                          {each.fatherName || each.husbandName || "-"}
                        </RowValues>
                        <RowValues>{each.address || "-"}</RowValues>
                        <RowValues>{each.aadharNo || "-"}</RowValues>
                        <RowValues>{each.mobileNo || "-"}</RowValues>
                        <RowValues>{each.token || "-"}</RowValues>
                        <TableCell
                          sx={{
                            cursor: "pointer",
                            color: "#212890",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          {each.status}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#5f6368",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          No data found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </StyledTableContainer>
          )}
        </StyledPaper>

        <ManagerAddedMemberDetails
        open={openMemberDetailsModal}
        

        
         />
      </Box>

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
          disabled={currentPage === totalPages || subscriberData?.length === 0}
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
