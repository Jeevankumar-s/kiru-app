import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SideBar from "../../Components/PermanentContent/SmallSidebar";
import ProductPageSideBar from "./SideBar";
import { Box } from "@mui/material";
import FillingFees from "./FillingFees";
import FDRelease from "./FDRelease";
import RCMDepositRelease from "./RCMDepositRelease";
import DepositVoucher from "./DepositVoucher";
import DecreeCourtCostDebit from "./Decree&CourtDebit";
import DecreeCourtCostCredit from "./Decree&CourtCredit";
import CashChequeAdvise from "./CashChequeAdvise";
import TestingAdvise from "./TestingAdviseVoucher";
import Adjustment from "./Adjustment";
import Investment from "./Investment";
import YearEnd from "./YearEndingAfterClosing";
import PortalVoucherEntry from "./PortalVoucherEntry";
import Salary from "./Salary";
import UndoVoucher from "./UndoVoucher";
import { TopContainerForAllPages, TopModuleName } from "../../StyledElement";
const App = () => {
  const location = useLocation();

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
            // minHeight: "calc(100vh - 10px)",
            position: "relative",
            gap: "7px",
            marginTop: "7px",
            borderRadius: "16px",
            borderRight: "9px solid #F5F6FF",
          }}
        >
          <TopContainerForAllPages
            sx={{
              position: "fixed",
              top: 0,
              left: "114px", // aligns with your sidebar
              right: 0,
              zIndex: 1100, // ensures it stays on top
              // backgroundColor: "#F5F6FF",
              padding: "16px",
              marginTop: "8px",
              marginRight: "8px",
              height: "43px", // fixed height (can be customized)
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              {/* <IconButton
                onClick={() => navigate(-1)}
                sx={{ color: "#8654e0" }}
              >
                <img
                  src={BackIcon}
                  alt="Home-icon"
                  height="24px"
                  width="24px"
                />{" "}
              </IconButton> */}
              {/* <Tooltip title={productTitle} placement="top">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#3d2a74",
                    flexGrow: 1,

                    minWidth: 0, // 🧠 required to make text-overflow work in flex

                    whiteSpace: "nowrap", // Prevents wrapping
                    overflow: "hidden", // Hides overflow
                    textOverflow: "ellipsis", // Displays "..." when text overflows
                  }}
                >
                  {productTitle}
                </Typography>
              </Tooltip> */}

              <TopModuleName>Chit Group</TopModuleName>
            </Box>
            {/* <IconButton
              sx={{ color: "white", "&:hover": { color: "#007bff" } }}
            >
              <img
                src={Notification}
                alt="Notification"
                style={{ size: "20px" }}
              />
            </IconButton> */}
            {/* <NotificationsNoneRoundedIcon sx={{ color: "#8654e0" }} /> */}
          </TopContainerForAllPages>
          <Box>
            <Box
              sx={{
                // minHeight: "calc(100vh - 0px)",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                position: "relative",
                top: "84px",
                backgroundColor: "#F5F6FF",
              }}
            >
              <ProductPageSideBar />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  flexGrow: 1,
                  marginLeft: "188px",
                  // minHeight: "calc(100vh - 0px)",
                  position: "relative",
                  gap: "10px",
                  borderRadius: "16px",
                  marginBottom: "8px",
                }}
              >
                {location.pathname == "/voucher/filling-fee" && <FillingFees />}
                {location.pathname == "/voucher/fixed-deposit-release" && (
                  <FDRelease />
                )}
                {location.pathname == "/voucher/rcm-deposit-release" && (
                  <RCMDepositRelease />
                )}
                {location.pathname == "/voucher/deposit-voucher" && (
                  <DepositVoucher />
                )}
                {location.pathname == "/voucher/decree-court-cost-debit" && (
                  <DecreeCourtCostDebit />
                )}
                {location.pathname == "/voucher/decree-court-cost-credit" && (
                  <DecreeCourtCostCredit />
                )}
                {location.pathname == "/voucher/cash-cheque-advise" && (
                  <CashChequeAdvise />
                )}
                {location.pathname == "/voucher/testing-advise" && (
                  <TestingAdvise />
                )}
                {location.pathname == "/voucher/adjustment" && <Adjustment />}
                {location.pathname == "/voucher/investment" && <Investment />}
                {location.pathname == "/voucher/year-end-after-closing" && (
                  <YearEnd />
                )}
                {location.pathname == "/voucher/portal-voucher-entry" && (
                  <PortalVoucherEntry />
                )}
                {location.pathname == "/voucher/salary" && <Salary />}
                {location.pathname == "/voucher/undo-voucher" && <UndoVoucher />}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
