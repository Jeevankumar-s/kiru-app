import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import {
  Box,
  Button,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  TextField,
  Typography,
  IconButton,
  Container,
  TextareaAutosize,
  Select,
  Paper,
  Radio,
  Tab,
  Tabs,
  TableCell,
  Checkbox,
  Chip,
  Avatar,
  FormControlLabel,
  Table,
  TableContainer,
  Popper,
  DialogContent,
  MenuItem,
  TableRow,
} from "@mui/material";
import { BorderRight } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export const TopContainerForAllPages = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "16px",
  padding: "16px 24px",
  boxShadow: "0px 0px 0px 1px #f0e9ff", // subtle shadow to enhance
}));

export const SidebarListItem = styled(ListItem)(({ theme, active }) => ({
  backgroundColor: active ? "#6069E5" : "transparent",
  borderRadius: "4px",
  color: active ? "#FFF" : "#FFFFFF",
  marginBottom: "12px",
  display: "flex",
  flexGrow: 1,
  width: "100%",
  alignItems: "center",
  cursor: "pointer",
  // borderRadius: "4px",
  textTransform: "none",
  // borderRadius: "4px",
  justifyContent: "center",
  "&:hover": {
    // backgroundColor: "#F6F6F6",
    // color: "#48397D",
  },
  padding: "4px 12px",
}));

export const SidebarListItemText = styled(ListItemText)(
  ({ theme, active }) => ({
    whiteSpace: "normal",
    marginTop: "5px",
    fontWeight: 500,
    fontSize: "15px",
    // color: active ? "#48397D" : "#FFFFFF",
    width: "200px",
    display: "inline-block",
    flexGrow: 1,
    "& .MuiTypography-root": {
      fontSize: "14px", // ✅ Correctly applies font size to ListItemText
    },
  })
);
export const SidebarListItemIcon = styled(ListItemIcon)(({ active }) => ({
  color: active ? "white" : "#FFFFFF",
  minWidth: "30px",
  fontSize: "14px",
  transition: "color 0.3s ease", // Smooth transition for hover or active state
}));

export const FormContent = styled(Box)(({ theme }) => ({
  padding: "24px",
  backgroundColor: "#f8f9fc",
}));

export const FormRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",
  marginBottom: "16px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const InputLabelLead = styled(Typography)(({ theme }) => ({
  color: "#344054 ",
  fontSize: "16px",
  fontWeight: "500",
  // lineHeight: "29.76px",
}));

export const LeadDataInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#ffffff", // White background
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C7C1D0",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#212890",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#212890",
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset !important", // Prevent blue autofill
      WebkitTextFillColor: "#000", // Optional: Ensure text color remains visible
    },
  },
}));

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: "#fff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C7C1D0",
    borderRadius: "8px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#212890",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#212890",
  },
}));

export const OutlineButton = styled(Button)(({ theme }) => ({
  border: "1px solid #212890",
  color: "#212890",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#212890",
    color: "white",
  },
  textTransform: "none",
  // paddingTop: "9px",
  // paddingBottom: "9px",
  paddingRight: "12px",
  paddingLeft: "12px",
  minWidth: "126px",

  margin: 0,
}));

export const FilledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#212890",
  color: "white",
  "&:hover": {
    backgroundColor: "#212890",
    color: "white",
  },
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "8px",
  // paddingTop: "9px",
  // paddingBottom: "9px",
  paddingRight: "12px",
  paddingLeft: "12px",
  minWidth: "126px",
  margin: 0,
}));

export const ActionBtnContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "24px",
  paddingLeft: "18px",
  paddingBottom: "12px",
  width: "42%",
}));

export const ModalOutlineBtn = styled(Button)(({ theme }) => ({
  border: "1px solid #212890",
  color: "#212890",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#212890",
    color: "white",
  },
  textTransform: "none",
  flexGrow: 1,
  "&.Mui-disabled": {
    border: "1px solid #A0A0A0", // gray border
    color: "#A0A0A0", // gray text
    backgroundColor: "transparent",
  },
}));

export const ReceiptOutlineBtn = styled(Button)(({ theme }) => ({
  border: "1px solid #212890",
  color: "#212890",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#212890",
    color: "white",
  },
  textTransform: "none",
  flexGrow: 1,
  "&.Mui-disabled": {
    border: "1px solid #A0A0A0", // gray border
    color: "#A0A0A0", // gray text
    backgroundColor: "transparent",
  },
}));

export const ModalFilledBtn = styled(Button)(({ theme }) => ({
  backgroundColor: "#212890",
  color: "white",
  "&:hover": {
    backgroundColor: "#6069E5",
    color: "white",
  },
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "8px",
  paddingRight: "12px",
  paddingLeft: "12px",
  margin: 0,
  flexGrow: 1,
  "&.Mui-disabled": {
    backgroundColor: "#E0E0E0", // light gray bg
    color: "#A0A0A0", // muted text
  },
}));

export const AuthHeading = styled(Typography)(({ theme }) => ({
  fontFamily: "Volte Play",
  fontSize: "34px",
  fontWeight: 500,
  textAlign: "center",
  color: "#000000",
  [theme.breakpoints.up("md")]: {
    fontSize: "19px", // for 13" laptops
    marginBottom: "5px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "31px", // for 15" laptops
    marginBottom: "10px",
  },
}));

export const AuthTextFieldLabel = styled(Typography)(({ theme }) => ({
  color: "#564372 ",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "29.76px",
  flex: "start",
  marginTop: "4px",
  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
    marginTop: "2px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "16px", // for 15" laptops
    marginTop: "4px",
  },
}));

export const AuthTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "16px",

  [theme.breakpoints.up("md")]: {
    marginBottom: "2px",
  },
  [theme.breakpoints.up("lg")]: {
    marginBottom: "16px",
  },

  "& .MuiInputBase-input::placeholder": {
    color: "#C7C0D0",
    opacity: 1, // needed to ensure the color shows up
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "&.Mui-focused fieldset": {
      borderColor: "#212890",
    },
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px white inset !important", // Prevent blue autofill
    WebkitTextFillColor: "#000", // Optional: Ensure text color remains visible
  },

  // scroll bar
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px", // Adjust height for horizontal scroll
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
}));

export const StyledPopper = styled(Popper)(({ theme }) => ({
  "& .MuiAutocomplete-listbox": {
    maxHeight: "200px", // Make it scrollable
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
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
  },
}));

export const AuthStyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: "16px",

  [theme.breakpoints.up("md")]: {
    marginBottom: "2px",
  },
  [theme.breakpoints.up("lg")]: {
    marginBottom: "16px",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#212890",
  },
  "& .MuiSelect-select": {
    backgroundColor: "#FFF",
    borderRadius: "16px",
  },
  // Ensure default outline is retained
  "& .MuiOutlinedInput-root": {
    borderRadius: "22px",

    "& fieldset": {
      borderRadius: "12px", // <--- This is what actually rounds the outline border

      borderColor: theme.palette.grey[400], // Optional default
    },
    "&:hover fieldset": {
      borderColor: "#212890", // Optional on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#212890",
    },
  },
}));

import { OutlinedInput } from "@mui/material";

export const RoundedOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: "14px",
  backgroundColor: "#fff",

  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "14px",
    borderColor: "#C7C1D0",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#212890",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#212890",
  },
}));

export const AuthenticationFormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#FFFFFF",
  width: "65vw",
  margin: "auto",
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  height: "100vh",
}));

export const AuthSubmitButton = styled(Button)({
  backgroundColor: "#212890", // Background color
  color: "#ffffff", // Text color
  height: 48, // Button height
  borderRadius: "12px",
  fontSize: 16, // Font size
  fontWeight: 600,
  textTransform: "none",
  marginTop: "16px", // mt: 2 (MUI spacing unit is 8px * 2 = 16px)
  "&:disabled": {
    backgroundColor: "#F4F4FF", // Background color when disabled
  },
});

export const RowValues = styled(TableCell)(({ theme }) => ({
  cursor: "pointer",
  color: "#424242",
  fontSize: "16px",
  // fontSize:"14px",
  fontWeight: "500",
}));

export const TableHeadRow = styled(TableCell)(({ theme }) => ({
  fontSize: "18px",
  // fontSize:"16px
  //
  // ",

  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: "#fff", // Or theme.palette.background.paper

  border: "none",
  fontWeight: "600",
}));

export const StyledSortImage = styled("img")(({ theme }) => ({
  marginLeft: "5px",
  cursor: "pointer",
  width: "10px",
  height: "15px",
  // Add hover effect if needed
  "&:hover": {
    opacity: 0.8,
  },
}));

export const StyledFilterImage = styled("img")(({ theme }) => ({
  marginLeft: "5px",
  cursor: "pointer",
  width: "34px",
  height: "34px",
  // Add hover effect if needed
  "&:hover": {
    opacity: 0.8,
  },
}));

export const StatusChip = styled(Chip)(({ theme, status }) => ({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  padding: "5px 9px",
  backgroundColor: status === "Active" ? "#03C229" : "#F1CE53",
  color: status === "Active" ? "#FFFFFF" : "#975811",
  borderRadius: "16px",
  "& .MuiChip-label": {
    padding: "2px 2px",
    fontSize: "14px",
    lineHeight: "14px",
    fontWeight: "600",
  },
}));

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  // top: "50%",
  // left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500, // Adjust width as needed
  backgroundColor: "#fff",
  borderRadius: "16px",
  padding: "24px",
  outline: "none",
  display: "flex", // 👈 Required for gap
  flexDirection: "column", // 👈 Usually column in modals
  gap: "24px", // Now this will work  boxShadow: "24px 24px 24px rgba(0, 0, 0, 0.1)",
}));

export const CommonSearchInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input::placeholder": {
    color: "#C7C0D0",
    opacity: 1, // needed to ensure the color shows up
  },

  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "&.Mui-focused fieldset": {
      borderColor: "#212890",
    },
    // Default border color
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C7C0D0",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#212890",
    },
  },
  width: "300px",
}));

export const FilterFilledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#212890",
  color: "white",
  "&:hover": {
    backgroundColor: "#212890",
    color: "white",
  },
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "4px",
  padding: "2px 22px",
}));

export const FilterOutlinedButton = styled(Button)(({ theme }) => ({
  border: "1px solid #212890",
  color: "#212890",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#212890",
    color: "white",
  },
  textTransform: "none",
  padding: "2px 22px",
}));

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#212890",
  "&.Mui-checked": {
    color: "#212890",
  },
}));

export const TopModuleName = styled(Typography)(({ theme }) => ({
  fontSize: "28px",
  fontWeight: 600,
  color: "#212890",
}));

export const DashboardLabel = styled(Typography)(({ theme }) => ({
  color: "#2B2B2B",
  fontSize: "16px",
  textAlign: "center",
  fontWeight: "500",
  marginTop: "0px",
  paddingTop: "0px",
  lineHeight: "16px",
  paddingBottom: "8px",
}));

export const DashboardValue = styled(Typography)(({ theme }) => ({
  color: "#7780FF",
  fontWeight: "bold",
  textAlign: "center",
  alignItems: "center",
  fontSize: "27px",
  lineHeight: "27px",
  paddingTop: "8px",
}));

export const FilterModalCommonHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "18px",
  color: "#424242",
  alignItems: "center",
  display: "flex",
}));

export const FilterModalHeading = styled(Typography)(({ theme }) => ({
  mb: 5,
  fontSize: "18px",
  color: "#000000",
  fontWeight: 600,
}));

export const FilterModalSpecificContainer = styled(Box)(({ theme }) => ({
  marginTop: "16px",
  border: "1px solid #C7C0D0",
  borderRadius: "4px",
  padding: "16px",
}));

export const CustomFormControlLabel = styled(FormControlLabel)({
  color: "#424242",
  "& .MuiFormControlLabel-label": {
    fontWeight: 500,
    fontSize: "16px", // or whatever size you want
  },
});

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  marginBottom: "5px",
  // borderRadius: "8px",
}));

export const EmployeeDetailsPageInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#ffffff", // White background

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C7C1D0",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#212890",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#212890",
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset !important", // Prevent blue autofill
      WebkitTextFillColor: "#000", // Optional: Ensure text color remains visible
    },
  },
}));

export const EmployeeDetailsPageLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "16px",
  color: "#344054",
  marginBottom: "8px",
}));

export const ModalHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

// Styled components
export const UploadArea = styled(Box)(({ theme }) => ({
  border: "2px dashed #ccc",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backgroundColor: "#f9f9ff",
  minHeight: "200px",
  transition: "border-color 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

export const UploadButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#2e3192", // Deep blue color from the image
  color: "white",
  padding: theme.spacing(1.5),
  width: "100%",
  marginTop: theme.spacing(2),
  "&:hover": {
    backgroundColor: "#232578",
  },
  textTransform: "none",
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#212890",
  },
  "& .MuiSelect-select": {
    backgroundColor: "#FFF",
  },
  // Ensure default outline is retained
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.grey[400], // Optional default
    },
    "&:hover fieldset": {
      borderColor: "#212890", // Optional on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#212890",
    },
  },
}));

export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow placement="right" classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#212890",
    color: "#fff",
    fontSize: 13,
    fontWeight: 500,
    borderRadius: 8,
    padding: "8px 12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#212890",
  },
}));

export const PageNumberText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "16px",
  color: "#34373F",
}));

export const CurrentPageNumberText = styled(Typography)(({ theme }) => ({
  color: "#34373F",
  display: "flex",
  fontSize: "16px",
  justifyContent: "center",
  alignItems: "end",
  width: "19px",
  height: "24px",
  border: "1px solid #A1A4AC",
  backgroundColor: "#E2E4FF",
}));

export const FullPageCountCalculation = styled(Typography)(({ theme }) => ({
  color: "#000000",
  fontSize: "16px",
}));

export const CommonModalHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "20px",
  color: "#2B2B2B",
}));
export const StyledTabs = styled(Tabs)(() => ({
  width: "100%",
  minHeight: 48,
  backgroundColor: "#f5f4f9",
  padding: "4px 0",
  borderRadius: "8px",
  overflow: "hidden", // no scroll
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-flexContainer": {
    display: "flex",
    flexWrap: "nowrap",
    width: "100%",
    alignItems: "stretch",
  },
}));

export const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) =>
    prop !== "$status" && prop !== "$isLast" && prop !== "$isFirst",
})(({ $status, $isFirst, $isLast }) => {
  const approvedColor = "#3F51B5";
  const selectedColor = "#1A237E";

  const arrowClipPath = $isFirst
    ? "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)"
    : "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)";

  return {
    textTransform: "none",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: 500,
    position: "relative",
    color: "#000",
    backgroundColor: "#f1f1f1",
    borderRadius: 0,
    flexGrow: 1,
    zIndex: 0,
    transition: "background-color 0.3s",
    minWidth: 0, // allow shrinking
    clipPath: arrowClipPath, // ✅ always apply arrow shape

    ...($status === "approved" && {
      clipPath: arrowClipPath,
      backgroundColor: approvedColor,
      color: "#fff",
      zIndex: 1,
    }),

    "&.Mui-selected": {
      clipPath: arrowClipPath,
      backgroundColor: selectedColor,
      color: "#fff",
      zIndex: 2,
    },

    "&:hover": {
      backgroundColor: $status === "approved" ? "#3949AB" : "#e0e0e0",
    },

    // Remove the spacing between tabs
    marginLeft: $isFirst ? "0px" : "-10px",
  };
});

export const PaginationContainer = styled(Box)(({ theme, openSidebar }) => ({
  backgroundColor: "#FFFFFF !important",
  height: "48px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2px",
  borderBottomRightRadius: "16px",
  borderBottomLeftRadius: "16px",
  marginBottom: "10px",
  position: "fixed",
  bottom: "0",
  marginLeft: openSidebar ? "214px" : "114px", // ← Dynamic margin
  marginRight: "8px",
  left: "0",
  right: "0",
  zIndex: 10,
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: "none",
  overflowY: "auto",
  border: "none",
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px", // Adjust height for horizontal scroll
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
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  boxShadow: "none",
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: 0,
  marginTop: "20px",
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px", // Adjust height for horizontal scroll
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
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderTopRightRadius: "16px",
  borderTopLeftRadius: "16px",
  boxShadow: "none",
  borderBottomRightRadius: "0px",
  borderBottomLeftRadius: "0px",
  paddingLeft: "18px",
  paddingRight: "18px",
  paddingTop: "16px",
  paddingBottom: "0px",
  marginTop: "8px",
}));

export const StyledMenuItems = styled(MenuItem)(({ theme }) => ({
  borderRadius: 1,
  mb: 1,
  "&:hover": {
    backgroundColor: "#eee0ff",
  },
}));

export const StyledReceiptsTabs = styled(Tabs)({
  backgroundColor: "#F5F6FF", // light background
  borderRadius: "12px",
  minHeight: "unset",
  // paddingTop: "4px",
  display: "flex",
  justifyContent: "space-between",
});

export const StyledPriceTab = styled(Tab, {
  shouldForwardProp: (prop) =>
    prop !== "$status" && prop !== "$isFirst" && prop !== "$isLast",
})(({ $status, $isFirst, $isLast, theme }) => ({
  textTransform: "none",
  flex: 1,
  minHeight: "unset",
  height: 40,
  fontSize: "14px",
  fontWeight: 500,
  borderRadius: "10px 10px 0 0",
  borderBottom: "none",
  backgroundColor: $status === "active" ? "#fff" : "#F3F2F5",
  color: "#000",
  transition: "all 0.3s ease",
  marginLeft: $isFirst ? 0 : 4,
  marginRight: $isLast ? 0 : 4,
  "&.Mui-selected": {
    backgroundColor: "#fff",
    color: "#000",
    borderBottom: "none",
  },
}));
export const ProductPageSidebarListItemText = styled(ListItemText)(
  ({ theme, active }) => ({
    marginTop: "5px",

    color: "#2B2B2B",
    // width: "30px", // Adjusted width for proper wrapping
    // display: "inline-block",
    "& .MuiTypography-root": {
      fontSize: "15px",
      fontWeight: 500,
      whiteSpace: "normal", // ✅ Allow wrapping
      wordBreak: "break-word",
      lineHeight: 1.4,
      // color: active ? "#9971FF" : "#2B2B2B",
    },
  })
);

export const ProductPageSidebarListItem = styled(ListItem)(
  ({ theme, active }) => ({
    backgroundColor: active ? "#FFFFFF" : "transparent",
    borderLeft: active ? "4px solid #212890" : "none",
    // borderRadius: 1,
    // color: active ? "#9971FF" : "#FFFFFF",
    marginBottom: "4px",
    display: "flex",
    // flexGrow: 1,
    width: "90%", // only as wide as content
    minHeight: "48px",
    alignItems: "center",
    cursor: "pointer",
    // borderRadius: "4px",
    textTransform: "none",
    borderRadius: "4px",
    justifyContent: "center",

    // Remove left border-radius when active
    ...(active && {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    }),

    "&:hover": {
      backgroundColor: "#F6F6F6",
      color: "#9971FF",
    },
    padding: "0px 0px 0px 10px",
    marginLeft: "10px",
  })
);

export const BlueRadio = styled(Radio)(({ theme }) => ({
  color: "#212890", // Default color for the outer circle
  "&.Mui-checked": {
    color: "#212890", // Color for the checked circle
  },
}));

export const FullContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginTop: "16px",
  marginLeft: "16px",
  marginRight: "16px",
  marginBottom: "16px",
  minHeight: "calc(100vh - 131px)", // Adjusted to account for header/footer
  // maxHeight: "calc(100vh - 131px)",
  overflowY: "auto",

  // scroll bar
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px", // Adjust height for horizontal scroll
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
}));

export const VioletContainer = styled(Box)(({ theme }) => ({
  borderRadius: "16px",
  padding: "16px ",
  backgroundColor: "#F9F9FF",
}));

export const WhiteBtn = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  color: "#212890",
  border: "none",
  borderRadius: "4px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  padding: "1px 16px",
  "&:hover": {
    backgroundColor: "#F0F0FF",
    color: "#212890",
  },
  "&.Mui-disabled": {
    backgroundColor: "#E0E0E0", // light gray bg
    color: "#A0A0A0", // muted text
  },
}));

export const VoucherInnerHeadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#8086DE",
  padding: "10px 16px",
  borderRadius: "8px",
  marginBottom: "16px",
}));

export const VoucherInnerHeading = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 500,
  color: "#FFFFFF",
}));

export const TableDeleteBtn = styled(Button)(({ theme }) => ({
  color: "#CF3433",
  textTransform: "none",
  padding: "0px",
  background: "none",
  boxShadow: "none",
  fontSize: "14px",
  "&:hover": {
    background: "none",
    transform: "scale(1.1)", // Zoom on hover
  },
}));

export const TableContainerWithBorder = styled(TableContainer)(({ theme }) => ({
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid #E0E0E0",
  borderBottom: "none",
  boxShadow: "none",
  // width: "100%",
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px", // Adjust height for horizontal scroll
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#C7C0D0",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
}));

export const VoucherTableHeadRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#F3F2F5",
  "& th": {
    fontSize: "14px",
    fontWeight: 500,
    color: "#000000",
  },
}));

export const TableHeadCell = styled(TableCell)(({ theme }) => ({
  padding: "8px 12px",
  borderRight: "1px solid #E8E5EC",
}));

export const TableBodyCell = styled(TableCell)(({ theme }) => ({
  padding: "8px 12px",
  borderRight: "1px solid #E8E5EC",
  maxWidth: " 200px",
}));

export const VoucherTableBodyRow = styled(TableRow)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  backgroundColor: "#FFFFFF",
  "&:last-child td, &:last-child th": {
    borderBottom: "none",
  },
  "& td": {
    fontSize: "14px",
    color: "#000000",
  },
}));

export const ConfirmationModalLabel = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 400,
  color: "#000000",
}));

export const ModalStyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

export const ModalStyledTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== "isSelected", // only allow valid props to pass
})(({ isSelected }) => ({
  fontSize: "18px",
  fontWeight: isSelected ? "bold" : "normal",
  color: isSelected ? "#212890" : "inherit",
  textTransform: "none",
  position: "relative",
  paddingBottom: "0px",
  "&.Mui-selected": {
    color: "#212890",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "9%",
    width: "40px",
    height: "3px",
    borderRadius: "4px",
    backgroundColor: isSelected ? "#212890" : "transparent",
    transition: "all 0.3s ease",
  },
}));

export const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  padding: "0px",
}));

export const StyledSubscriberName = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 500,
  color: "#817D7D",
}));

export const InnerSideBarContainer = styled(Box)(({ theme }) => ({
  width: "140px",
  height: "calc(100% - 99px)",
  backgroundColor: "#FFFFFF",
  color: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "16px",
  position: "fixed",
  zIndex: 1000,
  borderLeft: "none",
}));

export const RupeeFieldContainerInTable = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const SeparateContainerHeading = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 500,
  color: "#000000",
  marginBottom: "8px",
}));

export const AccountCopyInnerHeadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  // justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#8086DE",
  padding: "10px 16px",
  borderRadius: "8px",
  marginBottom: "16px",
}));

export const AccountCopyVioletContainerTypo = styled(Typography)(
  ({ theme }) => ({
    fontSize: "16px",
    fontWeight: 500,
    color: "#FFFFFF",
    marginLeft: "46px",
  })
);
