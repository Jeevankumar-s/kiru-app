import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SmallSideBar from "../PermanentContent/SmallSidebar.jsx";
import SideBar from "../PermanentContent/Sidebar.jsx";
import { Box } from "@mui/material";
import PaymentCentre from "./PaymentCentre.jsx";
import { useCRM } from "../../Context/CRMContext.jsx";

const App = () => {
  const { openSidebar } = useCRM();

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
        {openSidebar ? <SideBar /> : <SmallSideBar />}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "#fff",
            flexGrow: 1,
            marginLeft: openSidebar ? "214px" : "114px",
            minHeight: "calc(100vh - 10px)",
            position: "relative",
            gap: "7px",
            marginTop: "7px",
            borderRadius: "16px",
            overflow: "hidden",
            borderRight: "9px solid #F5F6FF",
          }}
        >
          {location.pathname === "/payments" && <PaymentCentre />}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
