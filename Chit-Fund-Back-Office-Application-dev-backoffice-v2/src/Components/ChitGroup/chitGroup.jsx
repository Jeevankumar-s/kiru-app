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
import { gettingAllGroups, gettingChitgroupDashboardData } from "../API/Api";
import ArrowLeftIcon from "../../assets/paginationLeftArrow.svg";
import ArrowRightIcon from "../../assets/paginationRightArrow.svg";
import FilterIcon from "../../assets/filter.svg";
import SortIcon from "../../assets/SortTable.svg";
import { useCRM } from "../../Context/CRMContext.jsx";

export default function LeadsDashboard() {
  const navigate = useNavigate();
  const { showToast, showErrorToast, openSidebar } = useCRM();
  const [searchValue, setSearchValue] = useState("");
  const [KycData, setKycData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openAssignTaskModal, setOpenAssignTaskModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [finalSelectedBranches, setFinalSelectedBranches] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [dashboardData, setDashboardData] = useState({});
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState({
    column: "updatedAt",
    direction: "desc",
  });
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [isOpenEditGroup, setIsOpenEditGroup] = useState(false);
  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, totalResults);
  const getSortParam = () => {
    return sortBy.direction === "asc" ? sortBy.column : `${sortBy.column}:desc`;
  };
  const fetchDashboard = async () => {
    try {
      const response = await gettingChitgroupDashboardData();
      setDashboardData(response?.data);
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  const fetchGroup = async (page) => {
    try {
      const response = await gettingAllGroups(
        finalSelectedBranches.length > 0 ? finalSelectedBranches : null,
        getSortParam(),
        filterStatus,
        searchValue,

        page
      );
      setKycData(response?.data?.results);
      setTotalPages(response?.data?.totalPages);
      setTotalResults(response?.data?.totalResults);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  // When filters or search change, reset page to 1
  useEffect(() => {
    setCurrentPage(1);
    fetchDashboard();
    fetchGroup(1);
  }, [searchValue, finalSelectedBranches, filterStatus, sortBy]);
  // Whenever page or sort changes, fetch the data
  useEffect(() => {
    fetchDashboard();
    fetchGroup(currentPage);
  }, [currentPage]);

  const handleCheckboxChange = (leadId) => (event) => {
    if (event.target.checked) {
      setSelectedItems((prev) => [...prev, leadId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== leadId));
    }
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

  const handleMenuClick = (event, groupId) => {
    event.stopPropagation();
    setSelectedGroupId(groupId);
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleRowClick = (groupId) => {
    navigate(`/chitgroup/${groupId}`);
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
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
        <TopContainerForAllPages>
          <TopModuleName>Chit Group</TopModuleName>

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
              />
              <IconButton
                size="small"
                sx={{ ml: 1 }}
                onClick={() => setOpenFilterModal(true)}
              >
                <StyledFilterImage src={FilterIcon} alt="Filter Icon" />{" "}
              </IconButton>
              {/* 
              <IconButton size="small">
                <img src={Options} alt="Options" />
              </IconButton> */}
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Stack direction="row" spacing={4} alignItems="center">
                <StatusIndicator
                  color="#03C229"
                  label="Active"
                  count={dashboardData?.active}
                />
                <StatusIndicator
                  color="#C9C9C9"
                  label="Terminated"
                  count={dashboardData?.terminated}
                />
                <StatusIndicator
                  color="#E2E4FF"
                  label="Vacant"
                  count={dashboardData?.vacant}
                />
              </Stack>
              <FilledButton
                onClick={() => setOpenCreateGroupModal(true)} // ✅ This runs only on click
              >
                Create New Group
              </FilledButton>
              <IconButton
              // onClick={handleMenuClick}
              >
                {/* <MoreVertIcon /> */}
              </IconButton>
            </Box>
          </Box>

          {/* Leads Table */}
          <StyledTableContainer
            sx={{
              minHeight: "calc(100vh - 227px)",
              maxHeight: "calc(100vh - 227px)",
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
                  <TableHeadRow>
                    Chit Group{" "}
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("chitGroup")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow>
                  <TableHeadRow>
                    Total Members{" "}
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("totalMembers")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow>
                  <TableHeadRow>
                    Branch
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("branch")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow>
                  <TableHeadRow>
                    Chit Amount
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("chitAmount")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>{" "}
                  </TableHeadRow>
                  {/* <TableHeadRow>
                    Total Collected
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("totalCollected")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>{" "}
                  </TableHeadRow> */}
                  {/* <TableHeadRow>
                    Remaining
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("remaining")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow> */}
                  <TableHeadRow>
                    Tenure
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("tenure")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow>
                  <TableHeadRow>
                    Status
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("status")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow>
                </TableRow>
              </TableHead>
              <TableBody>
                {KycData &&
                  KycData.map((group) => (
                    <TableRow
                      key={group.id}
                      onClick={() => {
                        handleRowClick(group.id);
                      }}
                    >
                      <RowValues>
                        {/* <StyledCheckbox
                        size="small"
                        checked={selectedItems.includes(group.id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={handleCheckboxChange(group.id)}
                      />{" "} */}
                        {group.chitGroup}
                      </RowValues>
                      <RowValues>{group.totalMembers}</RowValues>
                      <RowValues>{group.branch}</RowValues>
                      <RowValues>
                        <div style={{ display: "flex" }}>
                          {group.chitAmount !== null &&
                          group.chitAmount !== undefined &&
                          group.chitAmount !== "" ? (
                            <Box display="flex">
                              <LuIndianRupee
                                style={{
                                  marginRight: 4,
                                  marginTop: 4,
                                  fontSize: "13px",
                                }}
                              />
                              <span>{group.chitAmount}</span>
                            </Box>
                          ) : (
                            <span>-</span>
                          )}
                        </div>
                      </RowValues>
                      {/* <RowValues>{group.totalCollected}</RowValues> */}
                      {/* <RowValues>{group.remaining}</RowValues> */}
                      <RowValues>{group.tenure}</RowValues>
                      <TableCell
                        sx={{
                          cursor: "pointer",
                          color: "#212890",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}
                      >
                        {group.status}
                      </TableCell>
                      <RowValues>
                        <IconButton
                          onClick={(event) => handleMenuClick(event, group.id)}
                        >
                          <img
                            src={MoreIcon}
                            alt="Download-icon"
                            height={"21px"}
                            width={"21px"}
                          />
                        </IconButton>
                      </RowValues>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </StyledPaper>
        {isOpenEditGroup && (
          <UpdateGroupModal
            open={isOpenEditGroup}
            onClose={() => {
              setIsOpenEditGroup(false);
              setSelectedGroupId(null);
              fetchGroup(currentPage);
              fetchDashboard();
            }}
            selectedGroupId={selectedGroupId}
          />
        )}

        <Menu
          anchorEl={anchorElMenu}
          open={Boolean(anchorElMenu)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: "#F7F6F6",
              borderRadius: "4px", // Rounded corners
              boxShadow: 3, // Subtle shadow
              mt: 1, // Margin from anchor
              minWidth: 200, // Optional: match width
              px: 1, // Optional: horizontal padding
            },
          }}
        >
          <StyledMenuItems
            onClick={() => {
              setIsOpenEditGroup(true);
              handleMenuClose();
            }}
          >
            Edit group
          </StyledMenuItems>
        </Menu>
      </Box>

      <ChitGroupFilterModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        setFinalSelectedBranches={setFinalSelectedBranches}
        setFilterStatus={setFilterStatus}
      />

      <CreatingNewGroup
        open={openCreateGroupModal}
        onClose={() => setOpenCreateGroupModal(false)} // ✅ This runs only on click
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
