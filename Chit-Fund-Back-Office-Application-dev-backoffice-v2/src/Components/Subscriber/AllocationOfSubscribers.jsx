import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
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
  Chip,
  RadioGroup,
} from "@mui/material";
import { useCRM } from "../../Context/CRMContext.jsx";
import Trophy from "../../assets/Trophy.png";
import { getAllActiveGroups, GettingSubscriber } from "../API/Api.jsx";
import SortIcon from "../../assets/SortTable.svg";
import PdfImage from "../../assets/PDFImage.png";
import {
  TopContainerForAllPages,
  OutlineButton,
  RowValues,
  FilledButton,
  TableHeadRow,
  StatusChip,
  StyledAvatar,
  CommonSearchInput,
  EmployeeDetailsPageInput,
  InputLabelLead,
  StyledTab,
  StyledTabs,
  StyledSelect,
  StyledOutlinedInput,
  LeadDataInput,
  ModalOutlineBtn,
  ReceiptOutlineBtn,
  BlueRadio,
  CustomFormControlLabel,
  StyledTableContainer,
  StyledSortImage,
} from "../../StyledElement.jsx";
import { WinnerDetailsApprovalConfirmModal } from "../Modals/ApprovalModals.jsx";
import { AddingNominee } from "../Modals/CreatingNewModals.jsx";
import CalenderIcon from "../../assets/calender.svg";

// const uploadedDocuments = {
//   llp: "llp_document_url",
// };

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

export default function CRROtherBranch({ fetchingCommonDetails }) {
  const { winningDetailsId } = useParams();
  const [isOpenApproveConfirmation, setIsOpenApproveConfirmation] =
    useState(false);
  const [isOpenAddNominee, setIsOpenAddNominee] = useState(false);
  const [sortBy, setSortBy] = useState({
    column: "updatedAt",
    direction: "desc",
  });
  const [ReceiptDetails, setReceiptDetails] = useState({});

  const { showToast, showErrorToast } = useCRM();
  const [subscriberList, setSubscriberList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [tokenList, setTokenList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [nomineList, setNomineeList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const fetchingSubcribers = async () => {
    try {
      const response = await GettingSubscriber(selectedGroup);
      if (response.statusCode === 200) {
        setSubscriberList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingGroup = async () => {
    try {
      const limit = "all";
      const response = await getAllActiveGroups(limit);
      if (response.statusCode === 200) {
        setGroupList(response?.data);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  useEffect(() => {
    fetchingGroup();
    fetchingSubcribers();
  }, []);

  useEffect(() => {
    fetchingSubcribers();
  }, [selectedGroup]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["commission", "totalMembers", "durationInMonths"];

    const dateFields = [
      "dueDate",
      "startDate",
      "secondAuctionDate",
      "firstAuctionDate",
      "chitTerminationDate",
      "dateOfAgreement",
      "fdMaturity",
      "fdCommencement",
      "psoOrderDate",
    ];

    const timeFields = ["auctionStartTime", "auctionEndTime"];

    if (name === "chitPlan") {
      const selectedChit = listOfTokens.find((chit) => chit.id === value);
      setReceiptDetails((prevData) => ({
        ...prevData,
        chitPlan: value,
        totalMembers: selectedChit?.durationInMonths || "",
        durationInMonths: selectedChit?.durationInMonths || "",
        chitValue: selectedChit?.chitValue || "", // update chitValue too
      }));
    } else if (numericFields.includes(name)) {
      setReceiptDetails((prevData) => ({
        ...prevData,
        [name]: Number(value), // convert these fields to numbers
      }));
    } else if (dateFields.includes(name)) {
      const isoDate = new Date(value).toISOString(); // Converts "2026-01-10" to "2026-01-10T00:00:00.000Z"
      setReceiptDetails((prevData) => ({
        ...prevData,
        [name]: isoDate,
      }));
    } else if (timeFields.includes(name)) {
      // value will be "13:45" -> convert to "13:45:00.000"
      const timeWithSeconds = `${value}:00.000`;
      setReceiptDetails((prevData) => ({
        ...prevData,
        [name]: timeWithSeconds,
      }));
    } else {
      setReceiptDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value, // keep this fallback if needed
      }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "16px",
        marginLeft: "16px",
        marginBottom: "16px",
        marginRight: "16px",
      }}
    >
      <Grid
        container
        spacing={2}
        display={"flex"}
        width={"100%"}
        sx={{ marginBottom: "32px" }}
      >
        <Grid item xs={12} sm={4} width={"15%"} flexGrow={1}>
          <InputLabelLead>Group name</InputLabelLead>
          <LeadDataInput
            select
            fullWidth
            name="group"
            value={ReceiptDetails.group}
            onChange={handleInputChange}
            placeholder="Select Group"
            variant="outlined"
            size="small"
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return <span style={{ color: "#9e9e9e" }}>Select</span>;
                }

                const selectedGroup = groupList.find(
                  (group) => group.id === selected
                );
                return selectedGroup ? selectedGroup.name : selected;
              },
              MenuProps: {
                PaperProps: {
                  sx: scrollbarStyles,
                },
              },
            }}
          >
            {groupList.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </LeadDataInput>
        </Grid>

        <Grid item xs={12} sm={4} width={"16%"} flexGrow={1}>
          <InputLabelLead>Ticket</InputLabelLead>
          <LeadDataInput
            select
            fullWidth
            name="ticket"
            value={ReceiptDetails.token}
            onChange={handleInputChange}
            placeholder="Select Ticket"
            variant="outlined"
            size="small"
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return <span style={{ color: "#9e9e9e" }}>Select</span>;
                }

                const selectedToken = tokenList.find(
                  (token) => token.id === selected
                );
                return selectedToken ? selectedToken.name : selected;
              },
              MenuProps: {
                PaperProps: {
                  sx: scrollbarStyles,
                },
              },
            }}
          >
            {tokenList.map((token) => (
              <MenuItem key={token.id} value={token.id}>
                {token.name}
              </MenuItem>
            ))}
          </LeadDataInput>
        </Grid>
        <Grid item xs={12} sm={4} width={"15%"} flexGrow={1}>
          <InputLabelLead>Subscriber name</InputLabelLead>
          <LeadDataInput
            select
            fullWidth
            name="subscriber"
            value={ReceiptDetails.branch}
            onChange={handleInputChange}
            placeholder="Select Subscriber"
            variant="outlined"
            size="small"
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return <span style={{ color: "#9e9e9e" }}>Select</span>;
                }

                const selectedSubscriber = subscriberList.find(
                  (branch) => branch.id === selected
                );
                return selectedSubscriber ? selectedSubscriber.name : selected;
              },
              MenuProps: {
                PaperProps: {
                  sx: scrollbarStyles,
                },
              },
            }}
          >
            {subscriberList.map((subscriber) => (
              <MenuItem key={subscriber.id} value={subscriber.id}>
                {subscriber.name}
              </MenuItem>
            ))}
          </LeadDataInput>
        </Grid>

        <Grid sx={{ width: "15%" }} flexGrow={1}>
          <CustomDatePicker
            label="Date of receipt"
            value={
              ReceiptDetails.dueDate ? new Date(ReceiptDetails.dueDate) : null
            }
            onChange={(newValue) =>
              setReceiptDetails((prev) => ({
                ...prev,
                dueDate: newValue?.toISOString() ?? "", // or format however you want
              }))
            }
          />
          ;
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {/* <Grid
          container
          spacing={2}
          display={"flex"}
          width={"100%"}
          sx={{ marginBottom: "32px" }}
        > */}
        <Grid item xs={12} sm={4} width={"28%"} flexShrink={1}>
          <Typography
            sx={{
              fontSize: "21px",
              fontWeight: 600,
            }}
          >
            Nominee details
          </Typography>
        </Grid>
        {/* </Grid> */}

        <Box sx={{ display: "flex", gap: "16px" }}>
          <OutlineButton
            onClick={() => setIsOpenAddNominee(true)} // ✅ This runs only on click
          >
            Add Nominee
          </OutlineButton>
        </Box>
      </Box>

      <StyledTableContainer
        sx={{
          minHeight: "calc(100vh - 313px)",
          maxHeight: "calc(100vh - 313px)",
        }}
      >
        <Table
          sx={{
            // width: "130%",
            // ...(openSidebar && { width: "118%" }),
            overflowX: "auto",
            boxShadow: "none",
          }}
        >
          <TableHead>
            <TableRow>
              <TableHeadRow>Nominee name</TableHeadRow>
              <TableHeadRow>Age</TableHeadRow>
              <TableHeadRow>Relation</TableHeadRow>
              <TableHeadRow>Address</TableHeadRow>
              <TableHeadRow>Mobile no</TableHeadRow>
            </TableRow>
          </TableHead>
          <TableBody>
            {nomineList.length > 0 ? (
              nomineList.map((each) => (
                <TableRow
                  key={each.id}
                  onClick={() => {
                    //   handleRowClick(each.id);
                  }}
                >
                  <RowValues>
                    {/* <StyledCheckbox
                              size="small"
                              checked={selectedItems.includes(each.id)}
                              onClick={(e) => e.stopPropagation()}
                              onChange={handleCheckboxChange(each.id)}
                            />{" "} */}
                    {each.name}
                  </RowValues>
                  <RowValues>{each.age}</RowValues>
                  <RowValues>{each.relation}</RowValues>
                  <RowValues>{each.address}</RowValues>
                  <RowValues>{each.mobile}</RowValues>
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

      <AddingNominee
        open={isOpenAddNominee}
        onClose={() => {
          setIsOpenAddNominee(false);
        }}
        winningDetailsId={winningDetailsId}
        type="Agreement"
      />
    </Box>
  );
}
