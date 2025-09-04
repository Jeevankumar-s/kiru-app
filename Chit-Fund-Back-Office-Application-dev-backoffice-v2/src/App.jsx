import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import { UserProvider } from "./Context/userContext"; // Import the context provider
import ChitFormApproval from "./Components/ChitFormApproval";
import { CRMContextProvider } from "./Context/CRMContext";
import ChitGroup from "./Components/ChitGroup";
import Auction from "./Components/Auction";
import WinnerList from "./Components/WinnerList";
import Receipts from "./Components/Receipts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Subscriber from "./Components/Subscriber";
import Vouchers from "./Components/Vouchers";
import BillCollection from "./Components/BillCollection";
import Payments from "./Components/Payments";
import SubscriberA from "./Components/SubscriberA";
import ForRemovalSubscriber from "./Components/ForRemovalSubscriber";
import ForTransferSubscriber from "./Components/ForTransfer";
import Diary from "./Components/Diary";
import Booklets from "./Components/Booklet";
import Register from "./Components/Register";
import DayBook from "./Components/DayBook";
import DrawlsAndPrizedMoneyRegister from "./Components/DrawlsAndPrizedMoneyRegister.jsx";
import BillCollectorArrear from "./Components/BillCollectorArrear";
import BranchArrear from "./Components/BranchArrear";
import AccountCopyBranch from "./Components/AccountCopy/index.jsx"; 

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <UserProvider>
        <Router>
          <CRMContextProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/chit-form-approval"
                element={<ChitFormApproval />}
              />
              <Route
                path="/chit-form-approval/suggestion-of-subscriber"
                element={<ChitFormApproval />}
              />
              <Route path="/chitgroup" element={<ChitGroup />} />
              <Route path="/chitgroup/:groupId" element={<ChitGroup />} />
              <Route path="/auction" element={<Auction />} />
              <Route
                path="/auction/participants/:auctionId"
                element={<Auction />}
              />
              <Route
                path="/winnerlist/personal-details/:auctionId/:winningDetailsId/:userId"
                element={<WinnerList />}
              />
              <Route
                path="/winnerlist/attachments-and-deductions/:winnerId"
                element={<WinnerList />}
              />
              <Route
                path="/backoffice/billing/receipts"
                element={<Receipts />}
              />
              <Route path="/addition-of-subscriber" element={<Subscriber />} />
              <Route
                path="/suggestion-of-subscriber"
                element={<Subscriber />}
              />
              <Route path="/approval-of-subscriber" element={<Subscriber />} />
              <Route
                path="/allocation-of-subscriber"
                element={<Subscriber />}
              />
              <Route path="/voucher/filling-fee" element={<Vouchers />} />
              <Route
                path="/voucher/fixed-deposit-release"
                element={<Vouchers />}
              />
              <Route
                path="/voucher/rcm-deposit-release"
                element={<Vouchers />}
              />
              <Route path="/voucher/deposit-voucher" element={<Vouchers />} />
              <Route
                path="/voucher/decree-court-cost-debit"
                element={<Vouchers />}
              />
              <Route
                path="/voucher/decree-court-cost-credit"
                element={<Vouchers />}
              />
              <Route
                path="/voucher/cash-cheque-advise"
                element={<Vouchers />}
              />
              <Route path="/voucher/testing-advise" element={<Vouchers />} />
              <Route path="/voucher/adjustment" element={<Vouchers />} />
              <Route path="/voucher/investment" element={<Vouchers />} />
              <Route
                path="/voucher/year-end-after-closing"
                element={<Vouchers />}
              />
              <Route
                path="/voucher/portal-voucher-entry"
                element={<Vouchers />}
              />
              <Route path="/voucher/salary" element={<Vouchers />} />
              <Route path="/voucher/undo-voucher" element={<Vouchers />} />
              <Route path="/bill-collection" element={<BillCollection />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/subscribers" element={<SubscriberA />} />
              <Route path="/adding-new-subscriber" element={<SubscriberA />} />
              <Route
                path="/adding-new-subscriber/:id"
                element={<SubscriberA />}
              />

              <Route
                path="/for-removal/suggestion-of-subscriber"
                element={<ForRemovalSubscriber />}
              />
              <Route
                path="/for-removal/approval-of-subscriber"
                element={<ForRemovalSubscriber />}
              />
              <Route
                path="/for-removal/allocation-of-subscriber"
                element={<ForRemovalSubscriber />}
              />
              <Route
                path="/for-transfer/suggestion-of-subscriber"
                element={<ForTransferSubscriber />}
              />
              <Route
                path="/for-transfer/approval-of-subscriber"
                element={<ForTransferSubscriber />}
              />
              <Route
                path="/for-transfer/allocation-of-subscriber"
                element={<ForTransferSubscriber />}
              />
              <Route path="/booklets" element={<Booklets />} />
              <Route path="/diary" element={<Diary />} />
              <Route path="/cr-or-tr-register" element={<Register />} />
              <Route
                path="/drawls-and-prized-money-register"
                element={<DrawlsAndPrizedMoneyRegister />}
              />

              <Route path="/day-book" element={<DayBook />} />

              <Route
                path="/bill-collector-arrear"
                element={<BillCollectorArrear />}
              />

              <Route path="/branch-arrear" element={<BranchArrear />} />

              <Route
                path="/account-copy/:path"
                element={<AccountCopyBranch />}
              />
            </Routes>
          </CRMContextProvider>
        </Router>
      </UserProvider>
    </LocalizationProvider>
  );
}

export default App;
