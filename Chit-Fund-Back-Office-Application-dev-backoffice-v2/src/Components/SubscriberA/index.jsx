import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SmallSideBar from "../../Components/PermanentContent/SmallSidebar";
import SideBar from "../../Components/PermanentContent/Sidebar";
import { Box } from "@mui/material";
import ListOfSubscribers from "./ListOfSubscribers.jsx";
import AddingNewSubscriber from "./AddingSubscriber.jsx";
import SubscriberDetails from "./SubscriberDetails.jsx";
import { useCRM } from "../../Context/CRMContext.jsx";
import { Add } from "@mui/icons-material";

const App = () => {
  const location = useLocation();
  const { openSidebar } = useCRM();

  const { catalogId, productId } = useParams(); // Extract productId from route

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
          {location.pathname === "/subscribers" && <ListOfSubscribers />}
          {location.pathname === "/adding-new-subscriber" && (
            <AddingNewSubscriber />
          )}
          {location.pathname ===
            "/subscriber/subscriber-details/:subscriberId" && (
            <SubscriberDetails />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
