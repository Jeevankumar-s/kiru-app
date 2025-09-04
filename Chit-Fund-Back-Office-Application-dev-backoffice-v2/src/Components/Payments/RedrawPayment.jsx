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
  Autocomplete,
} from "@mui/material";
import { LuIndianRupee } from "react-icons/lu";

import { useCRM } from "../../Context/CRMContext.jsx";
import {
  GettingEmployeeTypes,
  AddingSubscriber,
  GettingSubscriber,
  GettingDebitHeads,
  GettingBank,
  GettingCreditHeads,
  GettingReceiptSeries,
  getAllActiveGroups,
  GettingAllTokens,
} from "../API/Api.jsx";
import CalenderIcon from "../../assets/calender.svg";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";
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
  const { showToast, showErrorToast } = useCRM();
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isOpenApproveConfirmation, setIsOpenApproveConfirmation] =
    useState(false);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [listOfTokens, setListOfTokens] = useState([]);
  const [collectorNameList, setCollectorNameList] = useState([]);
  const [debitHeadList, setDebitHeadList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [chitList, setChitList] = useState([]);
  const [creditHeadList, setCreditHeadList] = useState([]);
  const [creditTransactions, setCreditTransactions] = useState([]);
  const [debitTransactions, setDebitTransactions] = useState([]);
  const [receiptSeries, setReceiptSeries] = useState(null);

  console.log("debitTransactions", debitTransactions);
  console.log("creditTransactions", creditTransactions);
  console.log("paymentDetails", paymentDetails);
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

  const fetchingTokens = async () => {
    const response = await GettingAllTokens();
    if (response.success) {
      setListOfTokens(response?.data?.results);
    }
  };

  const fetchingReceiptSeries = async () => {
    const response = await GettingReceiptSeries();
    if (response.success) {
      setReceiptSeries(response?.data);
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
    fetchingChit();
    fetchingBank();
    fetchingDebitHeads();
    fetchingCreditHeads();
    fetchingReceiptSeries();
    fetchingGroup();
    fetchingTokens();
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

      setpaymentDetails((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newValue === "" ? " " : newValue,
        },
      }));
    } else if (dateFields.includes(name)) {
      const isoDate = new Date(value).toISOString();
      setpaymentDetails((prevData) => ({
        ...prevData,
        [name]: isoDate,
      }));
    } else {
      setpaymentDetails((prevData) => ({
        ...prevData,
        [name]: value === "" ? " " : value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Add your form submission logic here
      console.log("Form submitted with data:", paymentDetails);
      // Reset form or show success message as needed

      const response = await AddingSubscriber(paymentDetails);
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
    const { amount, chequeNumber, description } = paymentDetails.credit || {};

    if (amount && chequeNumber && description) {
      setCreditTransactions((prev) => [...prev, paymentDetails.credit]);
    } else {
      // Optional: Show validation error
      console.warn("Missing credit fields");
    }
  };

  const handleAddDebitTransaction = () => {
    const { amount, description } = paymentDetails.debit || {};

    if (amount && description) {
      setDebitTransactions((prev) => [...prev, paymentDetails.debit]);
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

  const RupeeInput = ({ ...props }) => {
    return (
      <LeadDataInput
        {...props}
        InputProps={{
          startAdornment: (
            <LuIndianRupee
              style={{
                marginRight: 4,
                fontSize: "16px",
                color: "#555",
              }}
            />
          ),
          ...props.InputProps, // so you can override if needed
        }}
      />
    );
  };

  return (
    <FullContainer>
      <Box>
        <Grid container spacing={2} display={"flex"} width={"100%"}>
          <Grid item xs={12} sm={4} width={"22%"}>
            <InputLabelLead>Chit group</InputLabelLead>
            <Autocomplete
              size="small"
              options={groupList}
              getOptionLabel={(option) => option.name || ""}
              value={
                (groupList &&
                  groupList.find((s) => s.id === paymentDetails.chitGroup)) ||
                null
              }
              onChange={(event, newValue) =>
                setPaymentDetails((prev) => ({
                  ...prev,
                  chitGroup: newValue ? newValue.id : "",
                }))
              }
              renderInput={(params) => (
                <LeadDataInput {...params} placeholder="Select group" />
              )}
              slotProps={{
                paper: {
                  sx: {
                    "& .MuiAutocomplete-listbox": scrollbarStyles, // ✅ same style
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"22%"}>
            <InputLabelLead>Subscriber name</InputLabelLead>
            <Autocomplete
              size="small"
              options={listOfTokens || []}
              getOptionLabel={(option) => option.node || ""}
              value={
                (listOfTokens &&
                  listOfTokens.find(
                    (token) => token.id === paymentDetails?.subscriber
                  )) ||
                null
              }
              onChange={(event, newValue) =>
                setPaymentDetails((prev) => ({
                  ...prev,
                  subscriber: newValue ? newValue.id : "",
                }))
              }
              renderInput={(params) => (
                <LeadDataInput {...params} placeholder="Select token" />
              )}
              slotProps={{
                paper: {
                  sx: {
                    "& .MuiAutocomplete-listbox": scrollbarStyles,
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
      {/* Form Section */}
      <VioletContainer>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} width={"18%"} flexGrow={1}>
            <InputLabelLead>Re-action number</InputLabelLead>
            <LeadDataInput
              select
              fullWidth
              name="credit.reactionNumber"
              value={paymentDetails?.credit?.reactionNumber}
              onChange={handleInputChange}
              placeholder="Select Credit Head"
              variant="outlined"
              size="small"
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9e9e9e" }}>Select</span>;
                  }

                  const selectedHead = creditHeadList.find(
                    (head) => head.id === selected
                  );
                  return selectedHead ? selectedHead.name : selected;
                },
                MenuProps: {
                  PaperProps: {
                    sx: scrollbarStyles,
                  },
                },
              }}
            >
              {creditHeadList.map((head) => (
                <MenuItem key={head.id} value={head.id}>
                  {head.name}
                </MenuItem>
              ))}
            </LeadDataInput>
          </Grid>
          <Grid item xs={12} sm={4} width={"18%"} flexGrow={1}>
            <InputLabelLead>Prized amount</InputLabelLead>
            <RupeeInput
              fullWidth
              name="credit.prizedAmount"
              value={paymentDetails?.credit?.prizedAmount}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"18%"} flexGrow={1}>
            <InputLabelLead>Total commission</InputLabelLead>
            <RupeeInput
              fullWidth
              name="credit.totalCommission"
              value={paymentDetails?.credit?.totalCommission}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"18%"} flexGrow={1}>
            <InputLabelLead>Dividend</InputLabelLead>
            <RupeeInput
              fullWidth
              name="credit.dividend"
              value={paymentDetails?.credit?.dividend}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4} width={"18%"} flexGrow={1}>
            <CustomDatePicker
              label="Release date"
              value={
                paymentDetails.releaseDate
                  ? new Date(paymentDetails.releaseDate)
                  : null
              }
              onChange={(newValue) =>
                setPaymentDetails((prev) => ({
                  ...prev,
                  releaseDate:
                    newValue instanceof Date && !isNaN(newValue)
                      ? newValue.toISOString()
                      : "", // or format however you want
                }))
              }
            />
            ;
          </Grid>

          <Grid item xs={12} sm={4} width={"39%"}>
            <InputLabelLead>Narration</InputLabelLead>
            <LeadDataInput
              fullWidth
              name="narration"
              value={paymentDetails.narration}
              onChange={handleInputChange}
              placeholder="Enter"
              variant="outlined"
              multiline
              rows={3}
              size="small"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <FilledButton sx={{ width: "180px" }} onClick={handleSubmit}>
            Add
          </FilledButton>
        </Box>
      </VioletContainer>
    </FullContainer>
  );
}
