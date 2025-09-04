import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, IconButton } from "@mui/material";
import TickIcon from "../../assets/TabTick.svg";
import {
  TopContainerForAllPages,
  StyledPriceTab,
  StyledReceiptsTabs,
  TopModuleName,
} from "../../StyledElement.jsx";
import ApproveVoucher from "./ApproveVoucher.jsx";
import ViewApprovedVoucher from "./ViewApprovedVoucher.jsx";

const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export default function WinnerListDetails() {
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const tabs = ["Approve voucher", "View approved voucher"];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "red" }}>
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
        {/* Header */}
        <TopContainerForAllPages>
          <TopModuleName>Bill collection</TopModuleName>

          <IconButton sx={{ color: "white", "&:hover": { color: "#007bff" } }}>
            {/* <img
              src={Notification}
              alt="Notification"
              style={{ size: "20px" }}
            /> */}
          </IconButton>
        </TopContainerForAllPages>

        <Box sx={{ width: "100%", p: 0, mt: 1 }}>
          <StyledReceiptsTabs
            value={value}
            onChange={handleChange}
  variant="fullWidth"   // ✅ makes tabs stretch full width
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            {tabs.map((tab, index) => (
              <StyledPriceTab
                key={index}
                label={
                  <Box display="flex" alignItems="center" gap="5px">
                    {tab}
                    {status === "approved" && (
                      <img src={TickIcon} alt="tick" height="14" width="14" />
                    )}
                  </Box>
                }
                $status={status}
                $isFirst={index === 0}
                $isLast={index === tabs.length - 1}
              />
            ))}
          </StyledReceiptsTabs>
        </Box>
        <Paper
          elevation={1}
          sx={{
            minHeight: "100vh",
            padding: "20px 18px",
            mb: 3,
            boxShadow: "none",
          }}
        >
          {value === 0 && <ApproveVoucher />}
          {value === 1 && <ViewApprovedVoucher />}
        </Paper>
      </Box>
    </Box>
  );
}
