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
  EmployeeDetailsPageLabel,
  StyledTab,
  StyledTabs,
  InputLabelLead,
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
import {
  MemberApprovalByKycId,
  MemberApprovalConfirmationModal,
} from "../Modals/ApprovalModals.jsx";
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
  const [isOpenApproveModal, setIsOpenApproveModal] = useState(true);
  const [sortBy, setSortBy] = useState({
    column: "updatedAt",
    direction: "desc",
  });
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const { showToast, showErrorToast } = useCRM();
  const [subscriberData, setSubscriberData] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const fetchingSubcribers = async () => {
    try {
      const response = await GettingSubscriber(selectedGroup);
      if (response.statusCode === 200) {
        setSubscriberData(response.data);
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
        flexShrink: 1,
      }}
    >
      <Box>
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
            <EmployeeDetailsPageLabel>Group name</EmployeeDetailsPageLabel>
            <LeadDataInput
              select
              fullWidth
              name="group"
              value={selectedGroup}
              onChange={(event) => setSelectedGroup(event.target.value)} // ✅ Inline update
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
          {/* </Grid> */}

          {/* <Box sx={{ display: "flex", gap: "16px" }}>
            <OutlineButton
            // onClick={() => setOpenCreateGroupModal(true)} // ✅ This runs only on click
            >
              Reject
            </OutlineButton>
            <FilledButton
            // onClick={() => setOpenCreateGroupModal(true)} // ✅ This runs only on click
            >
              Approve
            </FilledButton>
          </Box> */}
        </Box>

        <StyledTableContainer
          sx={{
            minHeight: "calc(100vh - 221px)",
            maxHeight: "calc(100vh - 227px)",
          }}
        >
          <Table
            sx={{
              minWidth: "140%",
              overflowX: "auto",
              boxShadow: "none",
            }}
          >
            <TableHead>
              <TableRow>
                <TableHeadRow>Subscriber name</TableHeadRow>
                <TableHeadRow>Suggested branch</TableHeadRow>
                <TableHeadRow>Branch name</TableHeadRow>
                <TableHeadRow>Group</TableHeadRow>
                <TableHeadRow>No of tokens</TableHeadRow>
                <TableHeadRow>Approved tokens</TableHeadRow>
                <TableHeadRow>Suggested date</TableHeadRow>
                <TableHeadRow>Profession</TableHeadRow>
                <TableHeadRow>Residential address</TableHeadRow>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriberData &&
                subscriberData.map((each) => (
                  <TableRow
                    key={each.id}
                    onClick={() => {
                      setIsOpenApproveModal(true);
                    }}
                  >
                    <RowValues>
                      {/* <StyledCheckbox
                              size="small"
                              checked={selectedItems.includes(each.id)}
                              onClick={(e) => e.stopPropagation()}
                              onChange={handleCheckboxChange(each.id)}
                            />{" "} */}
                      {each.suggestedBranch}
                    </RowValues>
                    <RowValues>{each.branchName}</RowValues>
                    <RowValues>{each.subscriberName}</RowValues>
                    <RowValues>{each.groupName}</RowValues>
                    <RowValues>{each.estimatedSuretyDocument}</RowValues>
                    <RowValues>{each.noOfTokens}</RowValues>
                    <RowValues>{each.approvedTokens}</RowValues>
                    <RowValues>{each.suggestedDate}</RowValues>
                    <RowValues>{each.profession}</RowValues>
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
                ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Box>

      <MemberApprovalConfirmationModal
        open={isOpenConfirmationModal}
        onClose={() => setIsOpenConfirmationModal(false)}
      />

      <MemberApprovalByKycId
        open={isOpenApproveModal}
        onClose={() => {
          setIsOpenApproveModal(false);
        }}
        setIsOpenConfirmationModal ={setIsOpenConfirmationModal}
        winningDetailsId={winningDetailsId}
        type="Agreement"
      />
    </Box>
  );
}
