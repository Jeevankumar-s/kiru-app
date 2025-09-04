import React, { useState, useContext, useEffect } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  IconButton,
  Divider,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import {
  SidebarListItem,
  SidebarListItemText,
  SidebarListItemIcon,
} from "../../StyledElement.jsx";
import { useCRM } from "../../Context/CRMContext.jsx";

// import { useWorkflowContext } from "../WorkflowContext";
import { UserContext } from "../../Context/userContext.jsx";
import DashBoardIcon from "../../assets/DashboardSidebar.svg";
import LeadGenerationIcon from "../../assets/LeadGenerationSidebar.svg";
import UserManagement from "../../assets/UserManagementSidebar.svg";
import TaskManagement from "../../assets/Task-managementSidebar.svg";
import EmployeeManagementIcon from "../../assets/EmployeeManagementSidebar.svg";
import ChitFormApprovalIcon from "../../assets/chitFormApproval.svg";
import ArrearsIcon from "../../assets/arrearSidebar.svg";
import AuctionIcon from "../../assets/auctionSidebar.svg";
import ChitGroupIcon from "../../assets/chitGroupIcon.svg";
import ChitBranchIcon from "../../assets/chitBranchSidebar.svg";
import KYCIcon from "../../assets/kycApprovalSidebar.svg";
import LogoutIcon from "../../assets/logoutSidebar.svg";
// import ActiveHelpAndSupport from "../../assets/ActiveHelp.svg";
import Logo from "../../assets/Logo.png";

const Sidebar = () => {
  const { setOpenSidebar } = useCRM();
  const { clearUser } = useContext(UserContext);
  const [isProfileOpen, setIsProfileOpen] = useState(null);

  const [isSmartCatalogsOpen, setSmartCatalogsOpen] = useState(false);
  const [isBrandDnaOpen, setBrandDnaOpen] = useState(false);
  const [isBenchmarkingOpen, setBenchmarkingOpen] = useState(false);
  const [isCollaborateOpen, setCollaborateOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const smartCatalogRoutes = ["/import-products", "/mapping", "/my-catalogs"];

    // Check if the current path matches one of the smart catalog routes
    const isSmartCatalogRoute =
      smartCatalogRoutes.includes(location.pathname) ||
      location.pathname.startsWith("/my-catalogs/"); // Handle dynamic route

    setSmartCatalogsOpen(isSmartCatalogRoute);
  }, [location.pathname]);

  const Home = () => (
    <img src={DashBoardIcon} alt="DashBoardIcon" height="24px" width="24px" />
  );

  const ActiveHome = () => (
    <img src={LeadGenerationIcon} alt="Home-icon" height="24px" width="24px" />
  );

  const LeadGeneration = () => (
    <img
      src={LeadGenerationIcon}
      alt="my-catalogs"
      height="24px"
      width="24px"
    />
  );

  const UserManagementIcon = () => (
    <img src={UserManagement} alt="my-catalogs" height="24px" width="24px" />
  );

  const TaskManagementIcon = () => (
    <img src={TaskManagement} alt="BrandDNA-icon" height="24px" width="24px" />
  );

  const EmployeeManagement = () => (
    <img
      src={EmployeeManagementIcon}
      alt="BrandDNA-icon"
      height="24px"
      width="24px"
    />
  );

  const ChitFormApproval = () => (
    <img
      src={ChitFormApprovalIcon}
      alt="Benchmarking-icon"
      height="24px"
      width="24px"
    />
  );

  const Arrears = () => (
    <img src={ArrearsIcon} alt="Benchmarking-icon" height="24px" width="24px" />
  );
  const Auction = () => (
    <img src={AuctionIcon} alt="import-products" height="24px" width="24px" />
  );
  const ChitGroup = () => (
    <img
      src={ChitGroupIcon}
      alt="Help-Support-icon"
      height="24px"
      width="24px"
    />
  );

  const ChitBranch = () => (
    <img
      src={ChitBranchIcon}
      alt="Help-Support-icon"
      height="24px"
      width="24px"
    />
  );

  const KYC = () => (
    <img src={KYCIcon} alt="setting-icon" height="24px" width="24px" />
  );

  const Logout = () => (
    <img src={LogoutIcon} alt="setting-icon" height="24px" width="24px" />
  );
  const handleLogout = async () => {
    await clearUser();
    await navigate("/login");
    return;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleProfileClick = (event) => {
    setIsProfileOpen(event.currentTarget);
  };

  //   const initials = user?.user?.fullname
  //     ? user.user.fullname
  //         .split(" ")
  //         .map((n) => n[0])
  //         .join("")
  //         .toUpperCase()
  //     : "G";

  return (
    <Box
      sx={{
        width: "200px",
        height: "calc(100% - 33px)",
        backgroundColor: "#212890",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        paddingTop: "20px",
        borderRadius: "16px",
        position: "fixed",
        zIndex: 1000,
        border: "7px solid #F5F6FF",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <img
          onClick={() => setOpenSidebar((prev) => !prev)}
          src={Logo}
          alt="Altius Logo"
          style={{ width: "180px", height: "40px", cursor: "pointer" }}
        />
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: "8px",
          // Hide scrollbar
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari, Edge
          },
        }}
      >
        <List sx={{ flexGrow: 1 }}>
          {/* <SidebarListItem
            active={location.pathname === "/"}
            component={Link}
            to="/"
            onClick={() => handleNavigation("/")}
          >
            <SidebarListItemIcon active={location.pathname === "/"}>
              <Home />
            </SidebarListItemIcon>

            <SidebarListItemText
              active={location.pathname === "/"}
              primary="Dashboard"
            />
          </SidebarListItem> */}
          {/* 
          <SidebarListItem
            active={location.pathname === "/"}
            component={Link}
            to="/"
          >
            <SidebarListItemIcon active={location.pathname === "/"}>
              <LeadGeneration />
            </SidebarListItemIcon>
            <SidebarListItemText
              active={location.pathname === "/"}
              primary="Lead Generation"
            />
          </SidebarListItem>
          <SidebarListItem
            active={location.pathname === "/kyc"}
            component={Link}
            to="/kyc"
          >
            <SidebarListItemIcon>
              <KYC />
            </SidebarListItemIcon>
            <SidebarListItemText primary="KYC Approval" />
          </SidebarListItem> */}

          <SidebarListItem
            active={location.pathname === "/chit-form-approval"}
            component={Link}
            to="/chit-form-approval"
          >
            <SidebarListItemIcon>
              <ChitFormApproval />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Chit Form Approval" />
          </SidebarListItem>
          <SidebarListItem
            active={location.pathname === "/chitgroup"}
            component={Link}
            to="/chitgroup"
          >
            <SidebarListItemIcon>
              <ChitGroup />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Chit Group" />
          </SidebarListItem>
          {/* <SidebarListItem
            active={location.pathname === "/chitbranch"}
            component={Link}
            to="/chitbranch"
          >
            <SidebarListItemIcon>
              <ChitBranch />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Chit Branch " />
          </SidebarListItem>
          <SidebarListItem
            active={location.pathname === "/crm/branchlist"}
            component={Link}
            to="/crm/branchlist"
          >
            <SidebarListItemIcon>
              <EmployeeManagement />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Employee Management" />
          </SidebarListItem> */}
          <SidebarListItem
            active={location.pathname === "/auction"}
            component={Link}
            to="/auction"
          >
            <SidebarListItemIcon>
              <Auction />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Auction" />
          </SidebarListItem>
          {/* <SidebarListItem
            active={location.pathname === "/arrears"}
            component={Link}
            to="/arrears"
          >
            <SidebarListItemIcon>
              <Arrears />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Arrears" />
          </SidebarListItem> */}

          {/* <SidebarListItem
            active={location.pathname === "/task-management"}
            component={Link}
            to="/task-management"
          >
            <SidebarListItemIcon>
              <TaskManagementIcon />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Task Management" />
          </SidebarListItem>
          <SidebarListItem
            active={location.pathname === "/user-management"}
            onClick={() => handleNavigation("/user-management")}
          >
            <SidebarListItemIcon>
              <UserManagementIcon />
            </SidebarListItemIcon>
            <SidebarListItemText primary="User Management " />
          </SidebarListItem> */}
        </List>
      </Box>
      {/* <Divider sx={{ marginY: 5 }} /> */}

      <Button
        onClick={handleLogout}
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
          color: "whitesmoke",
          backgroundColor: "transparent",
          border: "none",
          padding: "10px",
          paddingLeft: "20px",
          marginBottom: "57px",
          // marginLeft: "3px",
          gap: "12px",
          textTransform: "none",
          justifyContent: "flex-start",
          width: "100%",
          "&:hover": { backgroundColor: "#6069E5", color: "white" },
        }}
      >
        <Logout />
        Log out
      </Button>
    </Box>
  );
};

export default Sidebar;
