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

export default function PersonalDetails() {
  const { auctionId } = useParams();
  const [personalDetails, setPersonalDetails] = useState({});

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
  }, []);

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
    <Box sx={{ display: "flex", flexDirection: "row", gap: "16px" }}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#F9F9FF",
          padding: "16px",
          width: "25%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
        }}
      >
        <Grid
          container
          // spacing={2}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={Trophy}
              alt="Employee image"
              sx={{ height: "80px", width: "80px" }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#000000",
              alignItems: "center",
              textAlign: "center",
              mt: 2,
            }}
          >
            {personalDetails?.personalDetails?.fullName}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#667085",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Type: {personalDetails?.personalDetails?.userType}
          </Typography>

          <Grid item xs={12} sm={4} mt={2}>
            <EmployeeDetailsPageLabel>Phone number</EmployeeDetailsPageLabel>
            <EmployeeDetailsPageInput
              fullWidth
              name="phoneNumber"
              value={personalDetails.phoneNumber || ""}
              // onChange={handleInputChange}
              placeholder="Phone number"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} mt={2}>
            <EmployeeDetailsPageLabel variant="body2">
              Email Id
            </EmployeeDetailsPageLabel>
            <EmployeeDetailsPageInput
              fullWidth
              name="emailId"
              value={personalDetails?.personalDetails?.email || ""}
              // onChange={handleInputChange}
              placeholder="Email Id"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} mt={2}>
            <EmployeeDetailsPageLabel variant="body2">
              Present Address
            </EmployeeDetailsPageLabel>
            <EmployeeDetailsPageInput
              fullWidth
              name="presentAddress"
              value={
                personalDetails?.personalDetails?.residentialAddress
                  ? `${personalDetails.personalDetails.residentialAddress.building}, ${personalDetails.personalDetails.residentialAddress.street}, ${personalDetails.personalDetails.residentialAddress.city}, ${personalDetails.personalDetails.residentialAddress.state} - ${personalDetails.personalDetails.residentialAddress.pinCode}`
                  : ""
              } // onChange={handleInputChange}
              placeholder="Present Address"
              variant="outlined"
              size="small"
              rows={4}
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={4} mt={2}>
            <EmployeeDetailsPageLabel variant="body2">
              Permanent address
            </EmployeeDetailsPageLabel>
            <EmployeeDetailsPageInput
              fullWidth
              name="permanentAddress"
              value={
                personalDetails?.personalDetails?.permanentAddress
                  ? `${personalDetails.personalDetails.permanentAddress.building}, ${personalDetails.personalDetails.permanentAddress.street}, ${personalDetails.personalDetails.permanentAddress.city}, ${personalDetails.personalDetails.permanentAddress.state} - ${personalDetails.personalDetails.permanentAddress.pinCode}`
                  : ""
              }
              // onChange={handleInputChange}
              placeholder="Permanent address"
              variant="outlined"
              size="small"
              rows={4}
              multiline
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "75%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginBottom: "16px",
            padding: "16px ",
            backgroundColor: "#F9F9FF",
            borderRadius: "16px",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
            Attachments
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {personalDetails?.attachments?.length > 0 ? (
              <>
                {personalDetails?.attachments &&
                  personalDetails?.attachments
                    .filter((file) => file.url) // Only files with URLs
                    .map((file, index) => {
                      const fileName = decodeURIComponent(
                        file.url.split("/").pop()
                      );

                      return (
                        <Box
                          key={index}
                          sx={{ mt: 2, cursor: "pointer", width: "100px" }}
                        >
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <Box
                              component="img"
                              src={getFileThumbnail(file.url)} // icon for PDF or any file
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
                              {file.name || fileName}
                            </Typography>
                          </a>
                        </Box>
                      );
                    })}
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "100%",
                  py: 2, // match the outer box height
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  No Attachments Available
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            marginBottom: "16px",
            padding: "16px ",
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
                Company
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                name="companyName"
                value={personalDetails?.company?.name || ""}
                // onChange={handleInputChange}
                placeholder="Company name"
                variant="outlined"
                size="small"
              />
            </Grid>
            {personalDetails?.company?.designation && (
              <Grid item xs={12} sm={4} width={"31%"}>
                <EmployeeDetailsPageLabel variant="body2">
                  Designation{" "}
                </EmployeeDetailsPageLabel>
                <EmployeeDetailsPageInput
                  fullWidth
                  name="designation"
                  value={personalDetails?.company?.designation || ""}
                  // onChange={handleInputChange}
                  placeholder="Designation"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            )}
            <Grid item xs={12} sm={4} width={"31%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Monthly income
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                name="monthlyIncome"
                value={personalDetails?.company?.monthlyIncome || ""}
                // onChange={handleInputChange}
                placeholder="Monthly income"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} width={"48%"}>
              <EmployeeDetailsPageLabel variant="body2">
                CompanyAddress
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                name="address"
                // value={
                //   personalDetails?.company?.address
                //     ? `${personalDetails?.company?.address?.building}, ${personalDetails?.company?.address?.street}, ${personalDetails?.company?.address?.city}, ${personalDetails?.company?.address?.state} - ${personalDetails?.company?.address?.pinCode}`
                //     : ""
                // }
                value={
                  personalDetails?.company?.address
                    ? [
                        personalDetails.company.address.building,
                        personalDetails.company.address.street,
                        personalDetails.company.address.city,
                        personalDetails.company.address.state,
                      ]
                        .filter(Boolean)
                        .join(", ") +
                      (personalDetails.company.address.pinCode
                        ? ` - ${personalDetails.company.address.pinCode}`
                        : "")
                    : ""
                }
                // onChange={handleInputChange}
                placeholder="Company address"
                multiline
                variant="outlined"
                rows={4}
                cols={4}
                size="small"
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            width: "100%",
            marginBottom: "16px",
            padding: "16px ",
            backgroundColor: "#F9F9FF",
            borderRadius: "16px",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
            Chit details
          </Typography>
          <Grid
            container
            spacing={2}
            display={"flex"}
            width={"100%"}
            sx={{ marginBottom: "32px" }}
          >
            {personalDetails?.chitDetails?.fieldRepresentative?.name && (
              <Grid item xs={12} sm={4} width={"23%"}>
                <EmployeeDetailsPageLabel variant="body2">
                  Field representative
                </EmployeeDetailsPageLabel>
                <EmployeeDetailsPageInput
                  fullWidth
                  name="fieldRepresentative"
                  value={
                    personalDetails?.chitDetails?.fieldRepresentative?.name ||
                    ""
                  }
                  // onChange={handleInputChange}
                  placeholder="Field representative"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            )}

            <Grid item xs={12} sm={4} width={"23%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Chit group
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                name="chitGroup"
                value={personalDetails?.chitDetails?.chitGroup || ""}
                // onChange={handleInputChange}
                placeholder="Chit group"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} width={"23%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Chit amount
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                name="chitAmount"
                value={personalDetails?.chitDetails?.chitAmount || ""}
                // onChange={handleInputChange}
                placeholder="Chit amount"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} width={"23%"}>
              <EmployeeDetailsPageLabel variant="body2">
                Monthly payment
              </EmployeeDetailsPageLabel>
              <EmployeeDetailsPageInput
                fullWidth
                name="monthlyPayment"
                value={personalDetails?.chitDetails?.monthlyPayment || ""}
                // onChange={handleInputChange}
                placeholder="Monthly payment"
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
