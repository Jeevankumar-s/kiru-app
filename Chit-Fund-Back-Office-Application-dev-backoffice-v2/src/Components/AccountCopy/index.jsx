import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SmallSideBar from "../PermanentContent/SmallSidebar.jsx";
import SideBar from "../PermanentContent/Sidebar.jsx";
import { useCRM } from "../../Context/CRMContext.jsx";

import {
  Box,
} from "@mui/material";
import Branch from "./Branch.jsx";
import Investments from "./Investments.jsx";
import Bank from "./Bank.jsx";
import OtherItems from "./OtherItems.jsx";
import ChitLedger from "./ChitLedger.jsx";
import CompanyFormanChit from "./CompanyFormanChit.jsx";
import DecreeDebtors from "./DecreeDebtors.jsx";
import SundriesAdvancesLedger from "./SundriesAdvancesLedger.jsx";
import Stamp from "./Stamp.jsx";
import ProfitLoss from "./ProfitLoss.jsx";
import CashLedger from "./CashLedger.jsx";
import DayBook from "./DayBook.jsx";

import { getAllBranches } from "../API/Api.jsx";

const App = () => {
  const { openSidebar } = useCRM();
  const { path } = useParams();

  const fetchingBranch = async () => {
    const response = await getAllBranches();
    const sortedBranches = response.data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    console.log("Branches fetched:", sortedBranches);
  };

  // When filters or search change, reset page to 1
  useEffect(() => {
    fetchingBranch();
  }, []);
  // Whenever page or sort changes, fetch the data

    const renderComponent = () => {
    switch (path) {
      case "branch":
        return <Branch />;
      case "investments":
        return <Investments />;
      case "bank":
        return <Bank />;
      case "other-items":
        return <OtherItems />;
      case "chit-ledger":
        return <ChitLedger />;
      case "company-forman-chit":
        return <CompanyFormanChit />;
      case "decree-debtors":
        return <DecreeDebtors />;
      case "sundries-advances-ledger":
        return <SundriesAdvancesLedger />;
      case "stamp":
        return <Stamp />;
      case "profit-loss":
        return <ProfitLoss />;
      case "cash-ledger":
        return <CashLedger />;
      case "day-book":
        return <DayBook />;
      default:
        return <div>Select a section</div>;
    }
  };

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
          {renderComponent()}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
