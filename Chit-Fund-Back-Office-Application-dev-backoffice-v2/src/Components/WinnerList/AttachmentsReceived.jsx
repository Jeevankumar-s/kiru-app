import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegImage } from "react-icons/fa6";

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
} from "@mui/material";
import Trophy from "../../assets/Trophy.png";
import { gettingWinnerPersonalDetails } from "../API/Api.jsx";
import PdfImage from "../../assets/PDFImage.png";
import Image from "../../assets/imagePlaceholder.png";
import ExcelIcon from "../../assets/excel.png";
import WordIcon from "../../assets/word.png";
import FileIcon from "../../assets/file.png";
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
import { ReceivedDocumentsApprovalConfirmModal } from "../Modals/ApprovalModals.jsx";
import { useCRM } from "../../Context/CRMContext.jsx";

export default function AttachmentsReceived({ fetchingCommonDetails }) {
  const { showToast, showErrorToast } = useCRM();
  const [isOpenDocument, setIsOpenDocument] = useState(false);

  const { auctionId, winningDetailsId } = useParams();
  const [isOpenApproveConfirmation, setIsOpenApproveConfirmation] =
    useState(false);
  const [personalDetails, setPersonalDetails] = useState({});
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);
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

  useEffect(() => {
    fetchingEmployeeDetails();
  }, [isOpenApproveConfirmation]);

  const updateAttachmentStatus = (id, newStatus) => {
    setPersonalDetails((prevDetails) => {
      const updatedAttachments = prevDetails.attachments.map((doc) =>
        doc.id === id ? { ...doc, status: newStatus } : doc
      );
      return { ...prevDetails, attachments: updatedAttachments };
    });
  };

  const getFileExtension = (filename) => {
    return filename?.split(".").pop()?.toLowerCase();
  };

  const renderFilePreview = (fileUrl) => {
    const ext = getFileExtension(fileUrl);

    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
      return (
        <img
          src={fileUrl}
          alt="Preview"
          style={{
            maxWidth: "100%",
            height: "calc(100vh - 180px)",
            borderRadius: 8,
          }}
        />
      );
    }

    if (["pdf"].includes(ext)) {
      return (
        <iframe
          src={`${fileUrl}#view=Fit`}
          title="PDF Preview"
          style={{
            width: "100%",
            height: "100%",
            minHeight: 600,
            borderRadius: 8,
          }}
        />
      );
    }

    if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext)) {
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            fileUrl
          )}`}
          title="Office Document Preview"
          style={{
            width: "100%",
            height: "100%",
            minHeight: 600,
            borderRadius: 8,
          }}
        />
      );
    }

    // Fallback for unsupported types
    return <p>Preview not available for this file type.</p>;
  };

  const getFileThumbnail = (url) => {
    const ext = url?.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return Image; // show actual image
    }

    if (ext === "pdf") return PdfImage;
    if (["doc", "docx"].includes(ext)) return WordIcon;
    if (["xls", "xlsx"].includes(ext)) return ExcelIcon;

    return FileIcon; // default file icon
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 180px)",
        display: "flex",
        flexDirection: "row",
        gap: "16px",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          width: "40%",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#F9F9FF",
            borderRadius: "16px",
            padding: "16px ",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
            Attachments
          </Typography>
          <Box sx={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
            {personalDetails?.attachments &&
              personalDetails.attachments
                .filter((file) => file.url) // Only files with valid URLs
                .map((file, index) => (
                  <Box
                    key={index}
                    sx={{ mt: 2, cursor: "pointer" }}
                    onClick={() => {
                      setSelectedPdfUrl(file.url);
                      setSelectedDocId(file.id);
                      setIsOpenApproveConfirmation(true);
                      setIsOpenDocument(false);
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "8px",
                        pl: 1,
                        pt: 1,
                        pr: 1,
                        // pb: 1,
                        border:
                          selectedPdfUrl === file.url
                            ? "1px solid #FACECE"
                            : "",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        component="img"
                        src={getFileThumbnail(file.url)}
                        alt={file.name}
                        sx={{
                          width: 80,
                          height: 80,
                          backgroundColor: "#ffecec",
                          borderRadius: 1,
                          mb: 1,
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "14px",
                          maxWidth: 140,
                          wordBreak: "break-word",
                          alignItems: "center",
                        }}
                      >
                        {file.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "14px",
                          maxWidth: 140,
                          wordBreak: "break-word",
                          // alignItems: "center",
                        }}
                      >
                        ({file.status})
                      </Typography>
                    </Box>
                  </Box>
                ))}
          </Box>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
            marginBottom: "16px",
            padding: "16px ",
            gap: "16px",
          }}
        >
          <FilledButton
            fullWidth
            onClick={() => {
              if (!selectedDocId) {
                showErrorToast("Please select a document before proceeding.");
                return;
              }
              setIsOpenApproveConfirmation(true);
            }}
            // onClick={() => setIsOpenApproveConfirmation(true)}
          >
            Approve
          </FilledButton>
          <OutlineButton
            onClick={() => {
              if (!selectedDocId) {
                showErrorToast("Please select a document before proceeding.");
                return;
              }
              setIsOpenApproveConfirmation(true);
            }}
            // onClick={() => setIsOpenApproveConfirmation(true)}
            fullWidth
          >
            Re-Request
          </OutlineButton>
        </Box> */}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "60%",
          objectFit: "cover",
          display: "flex",
          px: 2,
          borderRight: "4px solid #575757",
          borderLeft: "4px solid #575757",
          flexDirection: "column",
          // borderRadius: "16px",
        }}
      >
        {/* <iframe
            // src={selectedPdfUrl}
            src={`/pdfjs/web/viewer.html?file=${selectedPdfUrl}&zoom=page-fit`}
            title="PDF Preview"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              // border: "none",
              minHeight: "600px",
            }}
          /> */}
        {isOpenDocument ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            {renderFilePreview(selectedPdfUrl)}
          </Box>
        ) : (
          <Typography sx={{ color: "#999", textAlign: "center", mt: 5 }}>
            Click on a Document to preview it here.
          </Typography>
        )}
      </Box>

      <ReceivedDocumentsApprovalConfirmModal
        open={isOpenApproveConfirmation}
        onClose={() => {
          setIsOpenApproveConfirmation(false);
          fetchingEmployeeDetails();
          fetchingCommonDetails();
        }}
        selectedDocId={selectedDocId}
        updateStatusInParent={updateAttachmentStatus}
        allAttachments={personalDetails?.attachments || []}
        winningDetailsId={winningDetailsId}
        setIsOpenDocument={setIsOpenDocument}
      />
    </Box>
  );
}
