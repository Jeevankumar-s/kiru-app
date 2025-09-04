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
  TextField,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardContent,
  ListItemSecondaryAction,
  Chip,
} from "@mui/material";
import Trophy from "../../assets/Trophy.png";
import plusIcon from "../../assets/plus.svg";
// import CancelIcon from "../../assets/CancelDocumentIcon.svg"
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  gettingWinnerPersonalDetails,
  DocumentSendRequest,
  DeductionSendRequest,
} from "../API/Api.jsx";
import { useCRM } from "../../Context/CRMContext.jsx";

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
} from "../../StyledElement.jsx";

const uploadedDocuments = {
  llp: "llp_document_url",
};

const initialDocuments = [
  {
    documentType: "PAN",
    description: "Please upload your PAN card",
  },
  {
    documentType: "AADHAAR",
    description: "Please upload your Aadhaar card",
  },
];

export default function PersonalDetails({ fetchingCommonDetails }) {
  const { auctionId, winningDetailsId, userId } = useParams();
  const [personalDetails, setPersonalDetails] = useState({});
  const [initialDocuments, setInitialDocuments] = useState([]);

  const [documents, setDocuments] = useState([]);
  const { showToast, showErrorToast } = useCRM();

  const [customDoc, setCustomDoc] = useState("");
  const [selectedDoc, setSelectedDoc] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [originalDeductions, setOriginalDeductions] = useState([]);

  const [requesterId, setRequesterId] = useState("");
  const [newType, setNewType] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [deductionType, setDeductionType] = useState("");
  const [deductionAmount, setDeductionAmount] = useState("");
  const [isOpenPlus, setIsOpenPlus] = useState(false);
  const [isOpenDeductionPlus, setIsOpenDeductionPlus] = useState(false);
  const prizeAmount = 16500;

  const fetchingEmployeeDetails = async () => {
    try {
      const response = await gettingWinnerPersonalDetails(auctionId);
      if (response.statusCode === 200) {
        setPersonalDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingRequesterData = async () => {
    const requester = localStorage.getItem("svcf_backOffice_user");
    if (requester) {
      const parsedRequester = JSON.parse(requester);
      setRequesterId(parsedRequester.id);
    }
  };

  useEffect(() => {
    fetchingRequesterData();
    fetchingEmployeeDetails();
  }, []);

  useEffect(() => {
    if (personalDetails?.attachments?.length > 0) {
      const mapped = personalDetails.attachments.map((att) => ({
        documentType: att.name,
        description: `Please upload your ${att.name}`,
      }));
      setDocuments(mapped);
      setInitialDocuments(mapped); // store original for comparison
    }
  }, [personalDetails]);

  useEffect(() => {
    if (personalDetails?.winningDetails) {
      const { deductionsTax, latePayment, adjustment } =
        personalDetails.winningDetails;
      const mapped = [
        { type: "Tax", amount: deductionsTax || 0 },
        { type: "Late fees", amount: latePayment || 0 },
        { type: "Adjustment", amount: adjustment || 0 },
      ];
      setDeductions(mapped);
      setOriginalDeductions(mapped.map((item) => ({ ...item }))); // ✅ deep copy

      // setOriginalDeductions(mapped); // Save initial state for comparison
    }
  }, [personalDetails]);

  const handleDocumentSendRequest = async () => {
    try {
      const payload = {
        userId,
        winningDetailsId,
        requestedBy: requesterId,
        documents: selectedDoc,
      };

      const response = await DocumentSendRequest(payload);
      if (response.success) {
        fetchingEmployeeDetails();
        fetchingCommonDetails();
        showToast(response.message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  // const prepareDeductionPayload = () => {
  //   const payload = {
  //     winningDetailsId: personalDetails?.winningDetails?.id,
  //     adjustment: 0,
  //     deductionsTax: 0,
  //     latePayment: 0,
  //     totalAmount: 0,
  //   };

  //   deductions.forEach((item) => {
  //     const key = item.type.toLowerCase();
  //     if (key.includes("tax")) payload.deductionsTax = item.amount;
  //     else if (key.includes("late")) payload.latePayment = item.amount;
  //     else if (key.includes("adjustment")) payload.adjustment = item.amount;
  //   });

  //   const totalDeduction = deductions.reduce((sum, d) => sum + d.amount, 0);
  //   const winningAmount = personalDetails?.winningDetails?.winningAmount || 0;
  //   payload.totalAmount = winningAmount - totalDeduction;

  //   return payload;
  // };

  const prepareDeductionPayload = () => {
    const payload = {
      winningDetailsId: personalDetails?.winningDetails?.id,
      adjustment: 0,
      deductionsTax: 0,
      latePayment: 0,
      totalAmount: 0,
    };

    deductions.forEach((item) => {
      const key = item.type.toLowerCase();

      if (key.includes("tax")) {
        payload.deductionsTax = item.amount;
      } else if (key.includes("late")) {
        payload.latePayment = item.amount;
      } else if (key.includes("adjustment")) {
        payload.adjustment = item.amount;
      } else {
        // Add custom deduction as its own field
        payload[item.type] = item.amount;
      }
    });

    const totalDeduction = deductions.reduce((sum, d) => sum + d.amount, 0);
    const winningAmount = personalDetails?.winningDetails?.winningAmount || 0;
    payload.totalAmount = winningAmount - totalDeduction;

    return payload;
  };

  const handleDeductionRequest = async () => {
    try {
      const dataToSend = prepareDeductionPayload();

      const response = await DeductionSendRequest(dataToSend);
      if (response.statusCode === 200) {
        fetchingEmployeeDetails();
        fetchingCommonDetails();
        showToast(response.message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  // const handleAddDocument = (doc) => {
  //   if (doc.trim()) {
  //     setSelectedDoc([...documents, doc]);
  //     setCustomDoc("");
  //   }
  // };
  const handleAddCustomeDocument = (docType) => {
    const trimmed = docType.trim();
    if (!trimmed) return;

    const newDoc = {
      documentType: trimmed,
      description: `Please upload your ${trimmed}`,
    };

    if (!documents.some((doc) => doc.documentType === trimmed)) {
      setDocuments((prevDocs) => [...prevDocs, newDoc]);
    }

    if (!selectedDoc.some((doc) => doc.documentType === trimmed)) {
      setSelectedDoc((prevSelected) => [...prevSelected, newDoc]);
    }

    setCustomDoc("");
  };

  const handleAddDocument = (doc) => {
    if (!selectedDoc.some((d) => d.documentType === doc.documentType)) {
      setSelectedDoc((prev) => [...prev, doc]);
    }
  };

  const handleRemoveDocument = (docType) => {
    setSelectedDoc((prev) => prev.filter((d) => d.documentType !== docType));
  };

  const handleAddDeduction = () => {
    if (!newType.trim() || !newAmount) return;

    setDeductions((prev) => [
      ...prev,
      { type: newType, amount: parseFloat(newAmount) },
    ]);
    setNewType("");
    setNewAmount("");
  };

  const handleAmountChange = (index, value) => {
    const updated = [...deductions];
    updated[index].amount = parseFloat(value) || 0;
    setDeductions(updated);
  };

  const totalAmount =
    (personalDetails?.winningDetails?.winningAmount || 0) -
    deductions.reduce((sum, d) => sum + d.amount, 0);

  const isDocumentListChanged = () => {
    const sortByName = (arr) =>
      [...arr].sort((a, b) => a.documentType.localeCompare(b.documentType));

    const original = sortByName(initialDocuments).map((d) => d.documentType);
    const current = sortByName(documents).map((d) => d.documentType);

    if (original.length !== current.length) return true;

    return !original.every((val, index) => val === current[index]);
  };

  const isDeductionChanged = () => {
    if (deductions.length !== originalDeductions.length) return true;

    for (let i = 0; i < deductions.length; i++) {
      const current = deductions[i];
      const original = originalDeductions[i];

      // If type or amount mismatch, or original is missing
      if (
        !original ||
        current.type !== original.type ||
        Number(current.amount) !== Number(original.amount)
      ) {
        return true;
      }
    }

    return false;
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "calc(100vh - 210px)",
        flexDirection: "row",
        gap: "16px",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#F9F9FF",
          padding: "16px",
          width: "42%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            marginBottom: "16px",
            backgroundColor: "#F9F9FF",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
              List of documents{" "}
            </Typography>
            <img
              src={plusIcon}
              alt="Add"
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpenPlus((prev) => !prev)}
            />
          </Box>
          <Box
            sx={{
              border: "1px solid #E8E5EC",
              borderRadius: "4px",
              marginY: "16px",
            }}
          >
            {isOpenPlus && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // width: "100%",
                  // marginBottom: "16px",
                  px: 2,
                  paddingBottom: "16px",

                  borderBottom: "1px solid #E8E5EC",
                }}
              >
                <TextField
                  fullWidth
                  variant="standard"
                  label="Add custom document name"
                  value={customDoc || ""}
                  onChange={(e) => setCustomDoc(e.target.value)}
                  // sx={{ mt: 2 }}
                  sx={{
                    mt: 2,
                    "& label": {
                      color: "black", // default
                    },
                    "& label.Mui-focused": {
                      color: "black", // on focus
                    },
                    "& .MuiInputBase-input": {
                      color: "black", // input text
                    },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#212890",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#212890",
                    },
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddCustomeDocument(customDoc)}
                  sx={{
                    mt: 2,
                    fontSize: "14px",
                    textTransform: "none",
                    color: "#212890",
                    borderColor: "#E8E5EC",
                  }}
                >
                  Add
                </Button>
              </Box>
            )}

            <List sx={{ padding: 0 }}>
              {documents.map((doc, index) => {
                const isSelected = selectedDoc.some(
                  (selected) => selected.documentType === doc.documentType
                );

                const originalAttachment = personalDetails?.attachments?.find(
                  (att) =>
                    att.name.toLowerCase() === doc.documentType.toLowerCase()
                );
                const docStatus = originalAttachment?.status?.toLowerCase();

                const shouldShowStatusText =
                  docStatus === "verified" || docStatus === "requested";

                return (
                  <ListItem
                    key={doc.documentType}
                    sx={{
                      height: "64px",
                      alignItems: "center",
                      borderBottom:
                        index !== documents.length - 1
                          ? "1px solid #E8E5EC"
                          : "none",
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{ fontWeight: 500 }}
                      primary={
                        doc.documentType.charAt(0).toUpperCase() +
                        doc.documentType.slice(1).toLowerCase()
                      }
                    />
                    <ListItemSecondaryAction>
                      {shouldShowStatusText ? (
                        <Typography
                          variant="body2"
                          sx={{ color: "#4CAF50", fontWeight: 500 }} // green text for status
                        >
                          {docStatus.charAt(0).toUpperCase() +
                            docStatus.slice(1)}
                        </Typography>
                      ) : isSelected ? (
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={() => handleRemoveDocument(doc.documentType)}
                          sx={{
                            mt: 1,
                            color: "#C7C0D0",
                            borderColor: "#E8E5EC",
                          }}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() => handleAddDocument(doc)}
                          sx={{
                            // mt: 1,
                            fontSize: "14px",
                            textTransform: "none",
                            color: "#212890",
                            borderColor: "#E8E5EC",
                          }}
                        >
                          Add
                        </Button>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <FilledButton
            sx={{
              width: "33%",
              backgroundColor: isDocumentListChanged() ? "#212890" : "#C7C0D0",
              color: isDocumentListChanged() ? "white" : "white",
              "&.Mui-disabled": {
                color: "white",
                opacity: 1, // optional: prevent MUI's default dimming
              },
            }}
            onClick={handleDocumentSendRequest}
            disabled={!isDocumentListChanged()} // disable until changes made
          >
            Request Documents
          </FilledButton>
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "48%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            // width: "100%",
            marginBottom: "16px",
            padding: "16px ",
            backgroundColor: "#F9F9FF",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
              Amount deduction
            </Typography>
            <img
              src={plusIcon}
              alt="Add"
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpenDeductionPlus((prev) => !prev)}
            />
            {/* <FilledButton>Approve</FilledButton> */}
          </Box>

          <Typography sx={{ fontSize: "16px", fontWeight: 400 }}>
            Winner: {personalDetails?.personalDetails?.fullName}
          </Typography>

          <Grid item xs={12} sm={4} width={"31%"}>
            <EmployeeDetailsPageLabel variant="body2">
              Prize amount
            </EmployeeDetailsPageLabel>
            <EmployeeDetailsPageInput
              fullWidth
              name="companyName"
              value={personalDetails?.winningDetails?.winningAmount || ""}
              // onChange={handleInputChange}
              placeholder="Prize amount"
              variant="outlined"
              size="small"
              InputProps={{
                sx: {
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0",
                  },
                },
              }}
            />
          </Grid>
          <Box
            sx={{
              border: "1px solid #E8E5EC",
              borderRadius: "16px",
              marginY: "16px",
            }}
          >
            {isOpenDeductionPlus && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // width: "100%",
                  // marginBottom: "16px",
                  px: 2,
                  paddingBottom: "16px",

                  borderBottom: "1px solid #E8E5EC",
                }}
              >
                <Grid
                  container
                  mt={2}
                  px={1}
                  spacing={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <Grid item xs={12} sm={6} width={"40%"}>
                    <TextField
                      fullWidth
                      placeholder="Add deduction type"
                      variant="standard"
                      value={newType || ""}
                      onChange={(e) => setNewType(e.target.value)}
                      sx={{
                        "& label": {
                          color: "black", // default
                        },
                        "& label.Mui-focused": {
                          color: "black", // on focus
                        },
                        "& .MuiInputBase-input": {
                          color: "black", // input text
                        },
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#212890",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#212890",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} width={"30%"}>
                    <TextField
                      fullWidth
                      placeholder="₹ Add amount"
                      variant="standard"
                      type="number"
                      value={newAmount || ""}
                      onChange={(e) => setNewAmount(e.target.value)}
                      sx={{
                        "& label": {
                          color: "black", // default
                        },
                        "& label.Mui-focused": {
                          color: "black", // on focus
                        },
                        "& .MuiInputBase-input": {
                          color: "black", // input text
                        },
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#212890",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#212890",
                        },
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    width={"20%"}
                    sx={{ textAlign: "right", flexGrow: 1 }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleAddDeduction}
                      sx={{
                        color: "#212890",
                        borderColor: "#E8E5EC",
                        textTransform: "none",
                        px: 4,
                      }}
                    >
                      + Add
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* <List>
            {deduction.map((doc, index) => {
              const isSelected = selectedDoc.includes(doc);
              return (
                <ListItem key={index}>
                  <ListItemText primary={doc} />
                  <ListItemSecondaryAction>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={doc.amount}
                      onChange={(e) => handleDeductionAmountChange(index, e)}
                      sx={{
                        borderRadius: "4px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e0e0e0",
                        },
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List> */}
            <List sx={{ padding: 0 }}>
              {deductions.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 1, py: 2 }}>
                    <ListItemText
                      primaryTypographyProps={{ fontWeight: 500 }}
                      primary={item.type}
                    />
                    <TextField
                      type="number"
                      variant="standard"
                      value={item.amount || ""}
                      onChange={(e) =>
                        handleAmountChange(index, e.target.value)
                      }
                      sx={{
                        maxWidth: 100,
                        textAlign: "left",
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#E8E5EC",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#212890",
                        },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                          {
                            borderBottomColor: "#212890",
                          },
                      }}
                      inputProps={{
                        style: { textAlign: "left" },
                      }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}

              <ListItem sx={{ px: 1, py: 1 }}>
                <ListItemText
                  primary={
                    <Typography fontWeight="bold">Total Amount</Typography>
                  }
                />
                <Typography
                  fontWeight="bold"
                  sx={{ minWidth: 100, textAlign: "right" }}
                >
                  ₹{" "}
                  {totalAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </ListItem>
            </List>
          </Box>
          <FilledButton
            sx={{
              width: "30%",
              backgroundColor: isDeductionChanged() ? "#212890" : "#C7C0D0",
              color: isDeductionChanged() ? "white" : "white",
              "&.Mui-disabled": {
                color: "white",
                opacity: 1, // optional: prevent MUI's default dimming
              },
            }}
            onClick={handleDeductionRequest}
            disabled={!isDeductionChanged()}
          >
            Proceed
          </FilledButton>
        </Box>
      </Box>
    </Box>
  );
}
