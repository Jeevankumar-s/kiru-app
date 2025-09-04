import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Paper } from "@mui/material";
import {
  TopContainerForAllPages,
  FilledButton,
  StyledPriceTab,
  StyledReceiptsTabs,
  TopModuleName,
} from "../../StyledElement.jsx";
import Credit from "./Credit.jsx";
import Debit from "./Debit.jsx";
import { CustomDatePicker } from "../Reusable/Reusable.jsx";

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

export default function DayBookCentre() {
  const [value, setValue] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const tabs = ["Credit", "Debit"];

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#F5F6FF" }}>
      {/* Header */}
      <TopContainerForAllPages>
        <TopModuleName>Day book</TopModuleName>
      </TopContainerForAllPages>
      <Box sx={{ width: "100%", p: 0, mt: 1 }}>
        <StyledReceiptsTabs
          value={value}
          onChange={handleChange}
          variant="fullWidth" // ✅ makes tabs stretch full width
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          {tabs.map((tab, index) => (
            <StyledPriceTab
              key={index}
              label={
                <Box display="flex" alignItems="center" gap="5px">
                  {tab}
                </Box>
              }
              $isFirst={index === 0}
              $isLast={index === tabs.length - 1}
            />
          ))}
        </StyledReceiptsTabs>
      </Box>
      <Paper
        elevation={1}
        sx={{
          minHeight: "calc(100vh - 180px)",
          padding: "20px 18px",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            px: 2,
          }}
        >
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, sm: 5 }}>
                <CustomDatePicker
                  label="Start date"
                  value={startDate ? new Date(startDate) : null}
                  onChange={(newValue) =>
                    setStartDate(
                      newValue instanceof Date && !isNaN(newValue)
                        ? newValue.toISOString()
                        : ""
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 5 }}>
                <CustomDatePicker
                  label="End date"
                  value={endDate ? new Date(endDate) : null}
                  onChange={(newValue) =>
                    setEndDate(
                      newValue instanceof Date && !isNaN(newValue)
                        ? newValue.toISOString()
                        : ""
                    )
                  }
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ gap: 2, alignItems: "flex-end", ml: "auto" }}>
            <FilledButton sx={{ alignItems: "flex-end" }}>Export</FilledButton>
          </Box>
        </Box>
        {value === 0 && <Credit />}
        {value === 1 && <Debit />}
      </Paper>
    </Box>
  );
}
