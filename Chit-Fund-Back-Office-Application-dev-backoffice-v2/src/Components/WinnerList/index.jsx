import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SideBar from "../../Components/PermanentContent/SmallSidebar";
import { Box } from "@mui/material";
import AttachmentsAndDeductions from "./AttachmentsAndDeduction";
import PersonalDetails from "./WinnerDetails";
const App = () => {
  const location = useLocation();
  const { auctionId, winningDetailsId, userId } = useParams(); // Extract productId from route

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F6FF" }}>
      {/* <Navbar /> */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          position: "relative",
          // top: "80px",
        }}
      >
        <SideBar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "#fff",
            flexGrow: 1,
            marginLeft: "114px",
            minHeight: "calc(100vh - 10px)",
            position: "relative",
            gap: "7px",
            marginTop: "7px",
            borderRadius: "16px",
            overflow: "hidden",
            borderRight: "9px solid #F5F6FF",
          }}
        >
          {location.pathname ===
            `/winnerlist/personal-details/${auctionId}/${winningDetailsId}/${userId}` && <PersonalDetails />}
          {location.pathname ===
            `/winnerlist/attachments-and-deductions/${auctionId}` && (
            <AttachmentsAndDeductions />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
