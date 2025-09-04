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
import { CustomDatePicker } from "../Reusable/Reusable.jsx";

import { LuIndianRupee } from "react-icons/lu";
import SearchIcon from "../../assets/searchIcon.svg";
import FilterIcon from "../../assets/UndoFilterIcon.svg";
import { useCRM } from "../../Context/CRMContext.jsx";
import {
  GettingEmployeeTypes,
  AddingSubscriber,
  getAllActiveGroups,
  GettingSubscriber,
  GettingDebitHeads,
  GettingBank,
  GettingCreditHeads,
  GettingAllCollectors,
  getAllBranches,
} from "../API/Api.jsx";
import CalenderIcon from "../../assets/calender.svg";
import { DataGrid } from "@mui/x-data-grid";
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
  FullContainer,
  VioletContainer,
  WhiteBtn,
  VoucherInnerHeading,
  VoucherInnerHeadingContainer,
  TableDeleteBtn,
  TableContainerWithBorder,
  VoucherTableHeadRow,
  TableHeadCell,
  VoucherTableBodyRow,
  TableBodyCell,
} from "../../StyledElement.jsx";
import { WinnerDetailsApprovalConfirmModal } from "../Modals/ApprovalModals.jsx";

// const uploadedDocuments = {
//   llp: "llp_document_url",
// };

const columns = [
  { field: "branchName", headerName: "Branch name", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "receiptNo", headerName: "Your/Rcpt no", width: 130 },
  { field: "series", headerName: "Series", width: 100 },
  { field: "head", headerName: "Head", width: 130 },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    valueFormatter: (params) =>
      `₹ ${Number(params.value).toLocaleString("en-IN")}`,
  },
  { field: "description", headerName: "Description", width: 130 },
  { field: "creditDebit", headerName: "Credit/debit", width: 100 },
  { field: "transType", headerName: "Trans.type", width: 100 },
];

const rows = [
  {
    id: 1,
    branchName: "-",
    date: "12 Jun 2025",
    receiptNo: "45679",
    series: "Advice",
    head: "MLZ225/48",
    amount: 1200,
    description: "Coimbatore",
    creditDebit: "Credit",
    transType: "Receipt",
  },
  {
    id: 2,
    branchName: "-",
    date: "12 Jun 2025",
    receiptNo: "45679",
    series: "Advice",
    head: "MLZ225/48",
    amount: 1200,
    description: "Coimbatore",
    creditDebit: "Credit",
    transType: "Receipt",
  },
  {
    id: 3,
    branchName: "-",
    date: "",
    receiptNo: "45670",
    series: "Advice",
    head: "-",
    amount: 1500,
    description: "Coimbatore",
    creditDebit: "Debit",
    transType: "Receipt",
  },
];

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
  const [searchValue, setSearchValue] = useState("");
  const { showToast, showErrorToast } = useCRM();
  const [voucherDetails, setVoucherDetails] = useState({});
  const [isOpenApproveConfirmation, setIsOpenApproveConfirmation] =
    useState(false);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [listOfTokens, setListOfTokens] = useState([]);
  const [collectorNameList, setCollectorNameList] = useState([]);
  const [subscriberList, setSubscriberList] = useState([]);
  const [debitHeadList, setDebitHeadList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [chitList, setChitList] = useState([]);
  const [ListOfBranches, setListOfBranches] = useState([]);
  const [creditHeadList, setCreditHeadList] = useState([]);
  const [creditTransactions, setCreditTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchingBank = async () => {
    try {
      const response = await GettingBank();
      if (response.success) {
        setBankList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingCollector = async () => {
    const response = await GettingAllCollectors(winningDetailsId);
    if (response.statusCode === 200) {
      setCollectorNameList(response?.data?.collectors?.results);
    }
  };

  const fetchingBranches = async () => {
    const response = await getAllBranches(winningDetailsId);
    if (response.success) {
      setListOfBranches(response?.data);
    }
  };

  const fetchingSubcribers = async () => {
    try {
      const response = await GettingSubscriber(selectedGroup);
      if (response.success) {
        setSubscriberList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingCreditHeads = async () => {
    try {
      const response = await GettingCreditHeads();
      if (response.success) {
        setCreditHeadList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingChit = async () => {
    try {
      const limit = "all";
      const response = await getAllActiveGroups(limit);
      if (response.success) {
        setChitList(response?.data);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const fetchingDebitHeads = async () => {
    try {
      const response = await GettingDebitHeads();
      if (response.success) {
        setDebitHeadList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingSubcribers();
    fetchingBranches();
    fetchingChit();
    fetchingBank();
    fetchingDebitHeads();
    fetchingCreditHeads();
    fetchingCollector();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const numericFields = ["credit.amount", "debit.amount"];
    const dateFields = ["date"];

    if (name.includes(".")) {
      const [section, field] = name.split(".");
      let newValue = value;

      if (numericFields.includes(name)) {
        newValue = Number(value);
      }

      setVoucherDetails((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newValue === "" ? " " : newValue,
        },
      }));
    } else if (dateFields.includes(name)) {
      const isoDate = new Date(value).toISOString();
      setVoucherDetails((prevData) => ({
        ...prevData,
        [name]: isoDate,
      }));
    } else {
      setVoucherDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Add your form submission logic here
      console.log("Form submitted with data:", voucherDetails);
      // Reset form or show success message as needed

      const response = await AddingSubscriber(voucherDetails);
      if (response.statusCode === 200) {
        setIsOpenApproveConfirmation(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  //   const handleAddTransaction = () => {
  //     if (
  //       ReceiptDetails.branch &&
  //       ReceiptDetails.chitNumber &&
  //       ReceiptDetails.amount &&
  //       ReceiptDetails.miscAmount
  //     ) {
  //       setCreditTransactions((prev) => [...prev, ReceiptDetails]);
  //     }
  //   };

  const handleAddCreditTransaction = () => {
    const { amount, chequeNumber, description } = voucherDetails.credit || {};

    if (amount && chequeNumber && description) {
      setCreditTransactions((prev) => [...prev, voucherDetails.credit]);
    } else {
      // Optional: Show validation error
      console.warn("Missing credit fields");
    }
  };

  const handleAddTransaction = () => {
    const { amount } = voucherDetails || {};

    if (amount) {
      setTransactions((prev) => [...prev, voucherDetails.debit]);
    } else {
      // Optional: Show validation error
      console.warn("Missing debit fields");
    }
  };

  const handleDeleteTransaction = (indexToRemove) => {
    setCreditTransactions((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );
  };

  return (
    <FullContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid container spacing={2} display={"flex"} width={"100%"}>
          <Grid item xs={12} sm={4} width={"22%"}>
            <EmployeeDetailsPageLabel>Date</EmployeeDetailsPageLabel>

            <CustomDatePicker
              label="Start date"
              value={voucherDetails.date ? new Date(voucherDetails.date) : null}
              onChange={(newValue) =>
                setVoucherDetails((prev) => ({
                  ...prev,
                  date:
                    newValue instanceof Date && !isNaN(newValue)
                      ? newValue.toISOString()
                      : "", // or format however you want
                }))
              }
            />
          </Grid>
          {/* <Grid item xs={12} sm={4} width={"22%"}> */}

          <FilledButton
            sx={{ width: "117px", height: "40px", mt: 4, borderRadius: "4px" }}
            onClick={handleAddCreditTransaction}
          >
            Load Data
          </FilledButton>
          {/* </Grid> */}
        </Grid>
        <OutlineButton
          sx={{ width: "136px", height: "40px", mt: 4, borderRadius: "4px" }}
          onClick={handleAddCreditTransaction}
        >
          Export Excel
        </OutlineButton>
      </Box>
      {/* Form Section */}
      <VioletContainer>
        <CommonSearchInput
          placeholder="Search"
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
          sx={{ mb: 3 }}
        />

        {/* Table of transactions */}
        {/* <TableContainerWithBorder>
          <Table
            sx={{
              width: "130%",
              overflowX: "auto",
              boxShadow: "none",
            }}
          >
            <TableHead>
              <VoucherTableHeadRow>
                {[
                  "#",
                  "Receipt number",
                  "Branch name",
                  "Date",
                  "Vour/Rcpt no",
                  "series",
                  "Head",
                  "Amount",
                  "Description",
                  "Credit/debit",
                  "Trans.type",
                ].map((header) => (
                  <TableHeadCell key={header} sx={{ display: "inline-flex" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {header}
                      <img
                        src={FilterIcon}
                        alt="Filter-icon"
                        style={{
                          width: "16px",
                          height: "16px",
                          objectFit: "contain",
                        }}
                      />
                    </span>
                  </TableHeadCell>
                ))}
              </VoucherTableHeadRow>
            </TableHead>
            <TableBody>
              {transactions.map((row, idx) => (
                <VoucherTableBodyRow key={idx}>
                  <TableBodyCell>{row?.receiptNumber || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.date || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.receivedBy || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.branchName || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.chitNo || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.subscriberName || "-"}</TableBodyCell>
                  <TableBodyCell>{row?.subscriberId || "-"}</TableBodyCell>
                  <TableBodyCell
                    style={{
                      display: "flex",
                      alignItems: "center", // Vertically center the icon and text
                    }}
                  >
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        fontSize: "13px", // Optional: Adjust icon size if needed
                      }}
                    />
                    {Number(row?.chitAmount).toLocaleString("en-IN")}
                  </TableBodyCell>
                  <TableBodyCell>{row?.amountType || "-"}</TableBodyCell>
                  <TableBodyCell>
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        fontSize: "13px", // Optional: Adjust icon size if needed
                      }}
                    />
                    {Number(row?.amount).toLocaleString("en-IN")}
                  </TableBodyCell>
                  <TableBodyCell>
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        fontSize: "13px", // Optional: Adjust icon size if needed
                      }}
                    />
                    {Number(row?.otherAmount).toLocaleString("en-IN")}
                  </TableBodyCell>
                  <TableBodyCell>
                    <LuIndianRupee
                      style={{
                        marginRight: 4,
                        fontSize: "13px", // Optional: Adjust icon size if needed
                      }}
                    />
                    {Number(row?.totalAmount).toLocaleString("en-IN")}
                  </TableBodyCell>
                  <TableBodyCell sx={{ borderRight: "none" }}>
                    <TableDeleteBtn
                      onClick={() => handleDeleteTransaction(idx)} // ✅ Add this line
                    >
                      Delete
                    </TableDeleteBtn>
                  </TableBodyCell>
                </VoucherTableBodyRow>
              ))}
            </TableBody>
          </Table>
        </TableContainerWithBorder> */}
        <Box sx={{ maxWidth: "100%" }}>
          <Box sx={{ height: 400, maxWidth: { xs: "100%", md: "1000px" } }}>
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </VioletContainer>
    </FullContainer>
  );
}
