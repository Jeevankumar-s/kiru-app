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
  Chip,
  TextField,
  ListItemSecondaryAction,
} from "@mui/material";
import { useCRM } from "../../Context/CRMContext.jsx";
import plusIcon from "../../assets/plus.svg";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

import Trophy from "../../assets/Trophy.png";
import {
  gettingWinnerPersonalDetails,
  gettingGuarantorDetails,
  SendGuarantorRequest,
} from "../API/Api.jsx";
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
  VioletContainer,
} from "../../StyledElement.jsx";
import { WinnerDetailsApprovalConfirmModal } from "../Modals/ApprovalModals.jsx";

const uploadedDocuments = {
  llp: "llp_document_url",
};

export default function GuarantorDetails({ fetchingCommonDetails }) {
  const { winningDetailsId } = useParams();
  const { showToast, showErrorToast } = useCRM();

  const [personalDetails, setPersonalDetails] = useState({});
  const [isOpenApproveConfirmation, setIsOpenApproveConfirmation] =
    useState(false);

  const [gaurantorRequestDetails, setGaurantorRequestDetails] = useState({
    status: "GuarantorDetails",
    requiredGuarantors: 0,
    narration: "",
  });

  const [isOpenPlus, setIsOpenPlus] = useState(false);
  const [customDoc, setCustomDoc] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState([]);
  const [initialDocuments, setInitialDocuments] = useState([]);

  const fetchingEmployeeDetails = async () => {
    try {
      const response = await gettingWinnerPersonalDetails(employeeId);
      if (response.statusCode === 200) {
        setPersonalDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingGuarantorDetails = async () => {
    const response = await gettingGuarantorDetails(winningDetailsId);
    if (response.statusCode === 200) {
      setPersonalDetails(response.data);
    }
  };

  useEffect(() => {
    fetchingGuarantorDetails();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGaurantorRequestDetails((prevData) => ({
      ...prevData,
      [name]: name === "requiredGuarantors" ? Number(value) : value,
    }));
  };

  const HandleSendRequest = () => {
    try {
      const response = SendGuarantorRequest(
        winningDetailsId,
        gaurantorRequestDetails
      );
      if (response.success) {
        showToast("Guarantor request sent successfully");
        setGaurantorRequestDetails({
          status: "GuarantorDetails",
          requiredGuarantors: 0,
          narration: "",
        });
        fetchingGuarantorDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const isDocumentListChanged = () => {
    const sortByName = (arr) =>
      [...arr].sort((a, b) => a.documentType.localeCompare(b.documentType));

    const original = sortByName(initialDocuments).map((d) => d.documentType);
    const current = sortByName(documents).map((d) => d.documentType);

    if (original.length !== current.length) return true;

    return !original.every((val, index) => val === current[index]);
  };

  const handleDocumentSendRequest = async () => {
    try {
      const payload = {
        // userId,
        winningDetailsId,
        // requestedBy: requesterId,
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

  // Before return, split docs into two groups
  const leftDocs = documents.filter((_, idx) =>
    isOpenPlus ? idx % 2 !== 0 : idx % 2 === 0
  );
  const rightDocs = documents.filter((_, idx) =>
    isOpenPlus ? idx % 2 === 0 : idx % 2 !== 0
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <VioletContainer>
        {/* <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
          }}
        > */}
        <Grid
          container
          spacing={2}
          display={"flex"}
          width={"100%"}
          sx={{ marginBottom: "16px" }}
        >
          <Grid item xs={12} sm={4} width={"31%"}>
            <EmployeeDetailsPageLabel>
              No of Guarantors
            </EmployeeDetailsPageLabel>
            <EmployeeDetailsPageInput
              fullWidth
              name="requiredGuarantors"
              value={gaurantorRequestDetails?.requiredGuarantors || ""}
              onChange={handleInputChange}
              placeholder="Guarantor count"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} width={"31%"}>
            <FilledButton
              onClick={HandleSendRequest}
              disabled={
                !gaurantorRequestDetails?.requiredGuarantors ||
                gaurantorRequestDetails?.requiredGuarantors <= 0
              }
              variant="contained"
              sx={{ width: "126px", marginTop: "33px" }}
            >
              Send
            </FilledButton>
          </Grid>
        </Grid>
        {/* <FilledButton onClick={HandleSendRequest} sx={{ width: "12%" }}>
            Send
          </FilledButton> */}
        {/* </Box> */}
      </VioletContainer>

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#F9F9FF",
          padding: "16px",
          // width: "42%",
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
          <Box sx={{ display: "flex", gap: "16px" }}>
            <Box
              sx={{
                border: "1px solid #E8E5EC",
                borderRadius: "4px",
                marginY: "16px",
                width: "42%",
                flexGrow: 1,
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
                    height: "64px",
                    borderBottom: "1px solid #E8E5EC",
                  }}
                >
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Add custom document name"
                    value={customDoc || ""}
                    onChange={(e) => setCustomDoc(e.target.value)}
                    sx={{
                      height: "64px",
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
                {leftDocs.map((doc, index) => {
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
                            onClick={() =>
                              handleRemoveDocument(doc.documentType)
                            }
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
            <Box
              sx={{
                border: "1px solid #E8E5EC",
                borderRadius: "4px",
                marginY: "16px",
                width: "42%",
                flexGrow: 1,
                py: 0,
              }}
            >
              <List sx={{ padding: 0 }}>
                {rightDocs.map((doc, index) => {
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
                            onClick={() =>
                              handleRemoveDocument(doc.documentType)
                            }
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
          </Box>
          <FilledButton
            sx={{
              width: "18%",
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
      <VioletContainer>
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
            Guarantor details
          </Typography>
          <FilledButton onClick={() => setIsOpenApproveConfirmation(true)}>
            Approve
          </FilledButton>
        </Box>

        <Box
          sx={{
            width: "100%",
            marginBottom: "16px",
            backgroundColor: "#F9F9FF",
            borderRadius: "16px",
          }}
        >
          <Grid
            container
            spacing={2}
            display={"flex"}
            width={"100%"}
            sx={{ marginBottom: "32px" }}
          >
            <Grid item xs={12} sm={4} width={"31%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Full name
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                name="name"
                value={personalDetails?.guarantors?.[0]?.name || ""}
                // onChange={handleInputChange}
                placeholder="Guarantor name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} width={"31%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Mobile number{" "}
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                value={personalDetails?.guarantors?.[0]?.phoneNumber || ""}
                // onChange={handleInputChange}
                placeholder="Mobile number"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} width={"31%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Email ID
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                value={personalDetails?.guarantors?.[0]?.email || ""}
                // onChange={handleInputChange}
                placeholder="Email ID"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} width={"31%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Pan Number
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                value={personalDetails?.guarantors?.[0]?.panNumber || ""}
                // onChange={handleInputChange}
                placeholder="Pan Number"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} width={"31%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Aadhaar Number
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                value={personalDetails?.guarantors?.[0]?.aadhaarNumber || ""}
                // onChange={handleInputChange}
                placeholder="Aadhaar Number"
                variant="outlined"
                size="small"
              />
            </Grid>
            {/* <Grid item xs={12} sm={4} width={"31%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Present address
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                value={personalDetails?.guarantors?.[0]?.presentAddress || ""}
                // onChange={handleInputChange}
                placeholder="Present address"
                multiline
                variant="outlined"
                rows={4}
                cols={4}
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
            <Grid item xs={12} sm={4} width={"31%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Permanent address
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                value={personalDetails?.guarantors?.[0]?.permanentAddress || ""}
                // onChange={handleInputChange}
                placeholder="Permanent address"
                multiline
                variant="outlined"
                rows={4}
                cols={4}
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
            </Grid> */}
          </Grid>
        </Box>
      </VioletContainer>
      {/* <Box
        sx={{
          marginBottom: "16px",
          padding: "16px ",
          backgroundColor: "#F9F9FF",
          borderRadius: "16px",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
          Attachments
        </Typography>
        <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {personalDetails?.documents &&
            personalDetails.documents
              .filter((doc) => doc.documentUrl) // show only uploaded ones
              .map((doc, index) => {
                const fileName = decodeURIComponent(
                  doc.documentUrl.split("/").pop()
                );

                return (
                  <Box key={doc.id || index} sx={{ mt: 2, cursor: "pointer" }}>
                    <a
                      href={doc.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Box
                        component="img"
                        src={PdfImage}
                        alt="PDF Icon"
                        sx={{
                          width: 80,
                          height: 80,
                          backgroundColor: "#ffecec",
                          borderRadius: 1,
                          mb: 1,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ maxWidth: 140, wordBreak: "break-word" }}
                      >
                        {doc.documentType || fileName}
                      </Typography>
                    </a>
                  </Box>
                );
              })}
        </Box>
      </Box> */}

      <WinnerDetailsApprovalConfirmModal
        open={isOpenApproveConfirmation}
        onClose={() => {
          setIsOpenApproveConfirmation(false);
          fetchingCommonDetails();
        }}
        winningDetailsId={winningDetailsId}
        type="Agreement"
      />
    </Box>
  );
}
