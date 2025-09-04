"use client";

import { use, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  Modal,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "../../assets/CloseButtonIcon.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import SortIcon from "../../assets/SortTable.svg";
import { useCRM } from "../../Context/CRMContext.jsx";
import { LuIndianRupee } from "react-icons/lu";

import {
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { MemberDetailsById } from "../Modals/SpecificDetailsModal.jsx";
import {
  TopContainerForAllPages,
  CommonSearchInput,
  StyledSortImage,
  FilterFilledButton,
  FilterOutlinedButton,
  StyledCheckbox,
  FilterModalHeading,
  CustomFormControlLabel,
  FilterModalSpecificContainer,
  FilterModalCommonHeading,
  TableHeadRow,
  RowValues,
  FullPageCountCalculation,
  PageNumberText,
  CurrentPageNumberText,
  StyledTableContainer,
  PaginationContainer,
  TopModuleName,
  StyledPaper,
} from "../../StyledElement.jsx";
// import Notification from "../../assets/CRMNotification.svg";
import { gettingAllTheMembersInGroup } from "../API/Api.jsx";
import ArrowLeftIcon from "../../assets/paginationLeftArrow.svg";
import ArrowRightIcon from "../../assets/paginationRightArrow.svg";
import FilterIcon from "../../assets/filter.svg";
import { MemberFilterModal } from "../Modals/FilterModals.jsx";
export default function LeadsDashboard() {
  const { groupId } = useParams();
  const { showToast, showErrorToast, openSidebar } = useCRM();
  const [searchValue, setSearchValue] = useState("");
  const [GoupMemberData, setGroupMemberData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openMemberDetailsModal, setOpenMemberDetailsModal] = useState(false);
  const [selectedKycId, setSelectedKycId] = useState("");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [finalSelectedBranches, setFinalSelectedBranches] = useState([]);
  const [finalPrized, setFinalPrized] = useState(null);
  const [sortBy, setSortBy] = useState({
    column: "updatedAt",
    direction: "desc",
  });
  const [totalResults, setTotalResults] = useState(0);
  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, totalResults);

  const getSortParam = () => {
    return sortBy.direction === "asc" ? sortBy.column : `${sortBy.column}:desc`;
  };

  const fetchGroup = async (page) => {
    try {
      const response = await gettingAllTheMembersInGroup(
        groupId,
        searchValue,
        getSortParam(),
        finalPrized,
        page
      );
      setGroupMemberData(response.data.results);
      setTotalPages(response.data.totalPages);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    const shouldResetPage =
      searchValue || finalSelectedBranches.length > 0 || finalPrized;
    if (shouldResetPage) {
      setCurrentPage(1);
    }
    const page = shouldResetPage ? 1 : currentPage;
    fetchGroup(page);
  }, [searchValue, currentPage, finalSelectedBranches, finalPrized, sortBy]);

  const handleRowClick = async (memberId) => {
    try {
      setOpenMemberDetailsModal(true);
      setSelectedKycId(memberId);
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
          <TopModuleName>Chit Group Members</TopModuleName>

          {/* <IconButton sx={{ color: "white", "&:hover": { color: "#007bff" } }}>
            <img
              src={Notification}
              alt="Notification"
              style={{ size: "20px" }}
            />
          </IconButton> */}
          {/* <NotificationsNoneRoundedIcon sx={{ color: "#8654e0" }} /> */}
        </TopContainerForAllPages>

        {/* Lead Status Cards */}

        {/* New Leads Section */}
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
                placeholder="Search Member"
                size="small"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={SearchIcon} alt="Search-icon" />{" "}
                    </InputAdornment>
                  ),
                }}
              />

              <IconButton
                size="small"
                sx={{ ml: 1 }}
                onClick={() => setOpenFilterModal(true)}
              >
                <img
                  src={FilterIcon}
                  alt="Filter Icon"
                  height="34px"
                  width="34px"
                />
              </IconButton>
            </Box>
            {/* 
            <Box sx={{ display: "flex", gap: 2 }}>
              <OutlineButton> Assign Task</OutlineButton>
            </Box> */}
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
                borderCollapse: "separate",
                borderSpacing: "0 12px", // ← vertical spacing between rows
              }}
            >
              <TableHead>
                <TableRow>
                  <TableHeadRow>
                    Name{" "}
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("name")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>{" "}
                  </TableHeadRow>
                  <TableHeadRow>
                    Phone
                    {/* <>
                      <StyledSortImage
                        onClick={() => toggleSort("phone")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>{" "} */}
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
                  {/* <TableHeadRow>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Last Paid{" "}
                    </Box>
                  </TableHeadRow>
                  <TableHeadRow>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Next Due{" "}
                    </Box>
                  </TableHeadRow> */}
                  <TableHeadRow>
                    Prized
                    {/* <>
                      <StyledSortImage
                        onClick={() => toggleSort("prized")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </> */}
                  </TableHeadRow>

                  {/* <TableHeadRow>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Payment (Monthly){" "}
                    </Box>
                  </TableHeadRow> */}
                  <TableHeadRow>
                    Arrear Payment
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("arrearPayment")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow>
                  <TableHeadRow>
                    Followup Status{" "}
                    <>
                      <StyledSortImage
                        onClick={() => toggleSort("followUpStatus")}
                        src={SortIcon}
                        alt="Sort-icon"
                      />
                    </>
                  </TableHeadRow>
                </TableRow>
              </TableHead>
              <TableBody>
                {GoupMemberData.map((member) => (
                  <TableRow
                    key={member.id}
                    onClick={() => {
                      handleRowClick(member.id);
                    }}
                    sx={{
                      backgroundColor:
                        member.arrearPayment !== 0 ? "#FFF4F4" : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <RowValues>{member.name}</RowValues>
                    <RowValues>{member.phone}</RowValues>
                    <RowValues>{member.branch}</RowValues>
                    {/* <RowValues sx={{ cursor: "pointer" }}>
                      {member.lastPaid}
                    </RowValues> */}
                    {/* <RowValues sx={{ cursor: "pointer" }}>
                      {member.nextDue}
                    </RowValues> */}
                    <RowValues>
                      {member.prized ? "Prized" : "Not Prized"}
                    </RowValues>
                    {/* <RowValues sx={{ cursor: "pointer", color: "#212890" }}>
                      {member.paymentMonthly}
                    </RowValues> */}
                    <RowValues>
                      <div style={{ display: "flex" }}>
                        {member.arrearPayment !== null &&
                        member.arrearPayment !== undefined &&
                        member.arrearPayment !== "" ? (
                          <Box display="flex">
                            <LuIndianRupee
                              style={{
                                marginRight: 4,
                                marginTop: 4,
                                fontSize: "13px",
                              }}
                            />
                            <span>{member.arrearPayment}</span>
                          </Box>
                        ) : (
                          <span>-</span>
                        )}
                      </div>
                    </RowValues>
                    <RowValues>{member.followUpStatus}</RowValues>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </StyledPaper>

        <MemberFilterModal
          open={openFilterModal}
          onClose={() => setOpenFilterModal(false)}
          setOpenFilterModal={setOpenFilterModal}
          setFinalPrized={setFinalPrized}
          setFinalSelectedBranches={setFinalSelectedBranches}
        />
      </Box>

      <MemberDetailsById
        open={openMemberDetailsModal}
        onClose={() => {
          setOpenMemberDetailsModal(false);
          fetchGroup(currentPage);
        }}
        memberId={selectedKycId}
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
          disabled={currentPage === totalPages || GoupMemberData.length === 0}
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
