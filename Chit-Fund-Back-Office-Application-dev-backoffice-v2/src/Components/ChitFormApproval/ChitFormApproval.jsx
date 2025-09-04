"use client";

import { use, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCRM } from "../../Context/CRMContext.jsx";
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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
// import Options from "../../assets/Options.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import { LuIndianRupee } from "react-icons/lu";

import {
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import {
  ChitFormApprovalByKycId,
  FormApprovalConfirmModal,
} from "../Modals/ApprovalModals.jsx";
import {
  TopContainerForAllPages,
  OutlineButton,
  RowValues,
  TableHeadRow,
  FilledButton,
  CommonSearchInput,
  TopModuleName,
  CurrentPageNumberText,
  PageNumberText,
  FullPageCountCalculation,
  StyledTableContainer,
  PaginationContainer,
  StyledPaper,
} from "../../StyledElement.jsx";
// import Notification from "../../assets/CRMNotification.svg";
import {
  gettingAllChitForms,
  gettingChitFormDashboardStack,
} from "../API/Api.jsx";
import ArrowLeftIcon from "../../assets/paginationLeftArrow.svg";
import ArrowRightIcon from "../../assets/paginationRightArrow.svg";
import MoreIcon from "../../assets/more.svg";

const getChipStyles = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return { bg: "#FB8C00", color: "#fff" }; // Orange
    case "upcoming":
      return { bg: "#FBC02D", color: "#fff" }; // Yellow
    case "rejected":
      return { bg: "#EF5350", color: "#fff" }; // Red
    case "approved":
      return { bg: "#4CAF50", color: "#fff" }; // Green
    default:
      return { bg: "#E0E0E0", color: "#000" }; // Default gray
  }
};

export default function ChitFormApproval() {
  const { showToast, showErrorToast, openSidebar } = useCRM();
  const navigate = useNavigate();
  const [isOpenAuctionGroupGin, setIsOpenAuctionGroupGin] = useState(false);
  const [selectedAuctionId, setSeletedAuctionId] = useState("");
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElType, setAnchorElType] = useState(null);
  const [anchorElAssign, setAnchorElAssign] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedKycId, setSelectedKycId] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [chitForms, setChitForms] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [dashboardStack, setDashboardStack] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [selectedChitFormOwner, setSelectedChitFormOwner] = useState("");
  const [approvingSign, setApprovingSign] = useState("");
  const [openKycDetailsFormModal, setOpenKycDetailsFormModal] = useState(false);
  const [groupGinData, setGroupGinData] = useState([]);
  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, totalResults);

  const fetchGroup = async (page) => {
    try {
      const response = await gettingAllChitForms(searchValue, status, page);
      setChitForms(response.data.subscriptions.results);
      setTotalPages(response.data.subscriptions.totalPages);
      setTotalResults(response.data.subscriptions.totalResults);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const fetchingDashboardStack = async () => {
    try {
      const response = await gettingChitFormDashboardStack(
        status,
        // selectedType,
        searchValue,
        1
      );
      setDashboardStack(response.data?.stats);
    } catch (error) {
      console.error("Error fetching catalog products:", error);
    }
  };

  useEffect(() => {
    if (currentPage != 1) {
      setCurrentPage(1);
    } else {
      fetchingDashboardStack();
      fetchGroup(1);
    }
  }, [status, selectedType, searchValue]);

  useEffect(() => {
    fetchingDashboardStack();
    fetchGroup(currentPage);
  }, [currentPage]);

  const handleCheckboxChange = (formId) => (event) => {
    if (event.target.checked) {
      setSelectedForm((prev) => [...prev, formId]);
    } else {
      setSelectedForm((prev) => prev.filter((id) => id !== formId));
    }
  };
  const open = Boolean(anchorElType);

  const handleOpen = (event) => {
    setAnchorElType(event.currentTarget);
  };

  const handleClose = (type) => {
    if (type) setSelectedType(type);
    setAnchorElType(null);
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
  const handleDeleteClick = () => {};

  const handleStatusChange = (event, newStatus) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  const handlingChitFormApproval = async (status) => {
    try {
      // const payload = { chitFormIds: selectedForm, status };
      const payload = { chitFormIds: selectedForm, status };
      // const response = await UpdatingChitFormStatus(payload);
      // if (response.statusCode === 200) {
      //   showToast(response.message);
      //   fetchingDashboardStack();
      //   fetchGroup(currentPage);
      //   setAnchorElMenu(null);
      // }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleMenuClick = (event, formId) => {
    event.stopPropagation();

    setSelectedForm(formId);
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleRowClick = (formId, kycId, ownerName) => {
    setSelectedForm(formId);
    setSelectedKycId(kycId);
    setSelectedChitFormOwner(ownerName);
    setOpenKycDetailsFormModal(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
        {/* Header */}

        <TopContainerForAllPages>
          <TopModuleName>Chit Form Approval </TopModuleName>
          <Box sx={{ display: "flex", gap: "30px" }}>
            <Typography
              onClick={() => setStatus("Pending")}
              variant="h6"
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                color: status === "Pending" ? "#212890" : "#817D7D",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -2, // adjust as needed
                  left: 0,
                  height: "3px",
                  width: "38%",
                  backgroundColor: "#212890",
                  borderRadius: "2px",
                  display: status === "Pending" ? "block" : "none",
                },
              }}
            >
              Pending ({dashboardStack.Pending && `${dashboardStack.Pending}`})
            </Typography>
            <Typography
              onClick={() => setStatus("Approved")}
              variant="h6"
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                color: status === "Approved" ? "#212890" : "#817D7D",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -2, // adjust as needed
                  left: 0,
                  height: "3px",
                  width: "38%",
                  backgroundColor: "#212890",
                  borderRadius: "2px",
                  display: status === "Approved" ? "block" : "none",
                },
              }}
            >
              Approved{" "}
              {dashboardStack.Approved && `(${dashboardStack.Approved})`}
            </Typography>
            <Typography
              onClick={() => setStatus("Rejected")}
              variant="h6"
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                color: status === "Rejected" ? "#212890" : "#817D7D",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -2, // adjust as needed
                  left: 0,
                  height: "3px",
                  width: "38%",
                  backgroundColor: "#212890",
                  borderRadius: "2px",
                  display: status === "Rejected" ? "block" : "none",
                },
              }}
            >
              Rejected
              {dashboardStack.Rejected && `(${dashboardStack.Rejected})`}
            </Typography>
          </Box>
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
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Box display="flex" gap={2} alignItems="center">
                {/* Toggle Group */}
                {/* <ToggleButtonGroup
                  value={status}
                  exclusive
                  onChange={handleStatusChange}
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#f5f5fd",
                    "& .MuiToggleButton-root": {
                      border: "none",
                      textTransform: "none",
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontWeight: 500,
                      "&.Mui-selected": {
                        backgroundColor: "#1A237E",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#0f1a5c",
                        },
                      },
                      "&:not(.Mui-selected)": {
                        color: "#333",
                      },
                    },
                  }}
                >
                  <ToggleButton value="Rejected">Rejected</ToggleButton>
                  <ToggleButton value="Active">Approved</ToggleButton>
                </ToggleButtonGroup> */}

                {/* Action Buttons */}
                {/* <OutlineButton
                  variant="outlined"
                  color="primary"
                  onClick={() => handlingChitFormApproval("Rejected")}
                >
                  Reject
                </OutlineButton>
                <FilledButton
                  variant="contained"
                  onClick={() => handlingChitFormApproval("Active")}
                >
                  Approve
                </FilledButton> */}
              </Box>
            </Box>
          </Box>

          {/* Leads Table */}
          <StyledTableContainer
            sx={{
              minHeight: "calc(100vh - 223px)",
              maxHeight: "calc(100vh - 223px)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadRow>Full Name</TableHeadRow>
                  {/* <TableHeadRow>Age </TableHeadRow> */}
                  <TableHeadRow>Occupation</TableHeadRow>
                  <TableHeadRow>Chit Value</TableHeadRow>
                  <TableHeadRow>Tenure</TableHeadRow>
                  <TableHeadRow>Address </TableHeadRow>
                  <TableHeadRow>Representative Status</TableHeadRow>
                  <TableHeadRow></TableHeadRow>
                </TableRow>
              </TableHead>
              <TableBody>
                {chitForms.length > 0 ? (
                  chitForms.map((each) => {
                    const { bg, color } = getChipStyles(each.executiveStatus);
                    return (
                      <TableRow
                        key={each._id}
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          handleRowClick(
                            each?.id,
                            each?.user?.kycDetails,
                            each?.subscriberDetails?.fullName
                          )
                        }
                      >
                        <RowValues sx={{ minWidth: "110px" }}>
                          {each?.subscriberDetails?.fullName ?? "-"}
                        </RowValues>
                        {/* <RowValues>
                        {each?.subscriberDetails?.age ?? "-"}
                      </RowValues> */}
                        <RowValues>
                          {each?.subscriberDetails?.occupation ?? "-"}
                        </RowValues>
                        <RowValues sx={{ minWidth: "90px" }}>
                          {each.chitValue !== null &&
                          each.chitValue !== undefined &&
                          each.chitValue !== "" ? (
                            <Box display="flex">
                              <LuIndianRupee
                                style={{
                                  marginRight: 4,
                                  marginTop: 4,
                                  fontSize: "13px", // Optional: Adjust icon size if needed
                                }}
                              />
                              <span>{each?.chitValue ?? "-"}</span>
                            </Box>
                          ) : (
                            <span>-</span>
                          )}
                          {/* {each?.chitValue ?? "-"} */}
                        </RowValues>
                        <RowValues>{each?.tenure ?? "-"}</RowValues>
                        <RowValues>{each?.combinedAddress ?? "-"}</RowValues>
                        <RowValues sx={{ minWidth: "189px" }}>
                          <Chip
                            label={each.executiveStatus}
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
                        <RowValues sx={{ color: "#212890", minWidth: "80px" }}>
                          View More
                        </RowValues>
                        {/* <RowValues>
                      <IconButton
                        onClick={(event) => handleMenuClick(event, each.id)}
                      >
                        <img
                          src={MoreIcon}
                          alt="Download-icon"
                          height={"21px"}
                          width={"21px"}
                        />
                      </IconButton>
                    </RowValues> */}
                      </TableRow>
                    );
                  })
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
        </StyledPaper>
        <Menu
          anchorEl={anchorElMenu}
          open={Boolean(anchorElMenu)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handlingChitFormApproval("Approved")}>
            Approve Form
          </MenuItem>
          <MenuItem onClick={() => handlingChitFormApproval("Rejected")}>
            Reject Form
          </MenuItem>
        </Menu>
      </Box>

      {openKycDetailsFormModal && (
        <ChitFormApprovalByKycId
          open={openKycDetailsFormModal}
          onClose={() => {
            setOpenKycDetailsFormModal(false);
          }}
          kycId={selectedKycId}
          setSelectedName={setSelectedName}
          setSelectedGroupId={setSelectedGroupId}
          setIsOpenConfirmationModal={setIsOpenConfirmationModal}
          subcriptionId={selectedForm}
          setApprovingSign={setApprovingSign}
        />
      )}

      <FormApprovalConfirmModal
        open={isOpenConfirmationModal}
        onClose={() => {
          setIsOpenConfirmationModal(false);
          fetchingDashboardStack();
          fetchGroup(currentPage);
          setSelectedName("");
        }}
        formId={selectedForm}
        groupName={selectedName}
        groupId={selectedGroupId}
        selectedChitFormOwner={selectedChitFormOwner}
        approvingSign={approvingSign}
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
          disabled={currentPage === totalPages || chitForms.length === 0}
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
