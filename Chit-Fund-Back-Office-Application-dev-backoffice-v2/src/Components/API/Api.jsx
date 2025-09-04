import axiosInstance from "../ApiAxiosInstance";

export const getAllUser = async (search, sortBy, page = 1) => {
  try {
    const response = await axiosInstance.get("/back-office/users", {
      params: {
        search: search,
        page: page,
        sortBy: sortBy,
      },
    });
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const handleLogout = async () => {
  try {
    const response = await axiosInstance.post("/auth/back-office/logout");
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const getAllBranches = async () => {
  try {
    const response = await axiosInstance.get("/crm/branch/list-branches");
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingAllGroups = async (
  branches,
  sortBy,
  status,
  search,
  page = 1
) => {
  try {
    const params = {
      page: page,
      limit: 10,
      sortBy: sortBy,
    };

    if (branches) {
      params.branch = branches;
    }

    if (status) {
      params.status = status;
    }

    if (search) {
      params.search = search;
    }

    const response = await axiosInstance.get("/back-office/chit-group", {
      params,
    });
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingChitgroupDashboardData = async () => {
  try {
    const response = await axiosInstance.get(
      "/back-office/chit-group/status-summary"
    );
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const getSpecificGroupMemberDetails = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/chit-group/${memberId}/personal-details`
    );
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingAllTheMembersInGroup = async (
  groupId,
  searchValue,
  sortBy,
  // selectedBranches,
  prized,
  page = 1
) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/chit-group/${groupId}/subscriptions`,
      {
        params: {
          search: searchValue,
          // branch: selectedBranches,
          sortBy: sortBy,
          prized: prized,
          page: page,
          limit: 10,
        },
      }
    );
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const createNewGroup = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/back-office/chit-group",
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingAuctionDashboardStack = async () => {
  try {
    const response = await axiosInstance.get(
      "/back-office/auction/dashboard-summary"
    );
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingAuctionDetails = async (auctionId) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/auction/${auctionId}`
    );
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingAuctions = async (
  search,
  sortBy,
  filterStatus,
  // filterDateFrom,
  // filterDateTo,
  // filterIsPrized,
  page = 1,
  limit = 10
) => {
  try {
    const params = {
      search: search,
      sortBy: sortBy,
      // dateFrom: filterDateFrom,
      // dateTo: filterDateTo,
      page: page,
      limit: limit,
    };

    if (filterStatus) {
      params.status = filterStatus;
    }

    const response = await axiosInstance.get("/back-office/auction", {
      params,
    });
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingAuctionsDetails = async (
  auctionId,
  search,
  sortBy,
  page = 1,
  limit = 10
) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/auction/${auctionId}`,
      {
        params: {
          search: search,
          sortBy: sortBy,
          page: page,
          limit: limit,
        },
      }
    );
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const SchedulingAuction = async (payload) => {
  try {
    const response = await axiosInstance.post("/back-office/auction", payload);
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const getAllGrp = async (limit = 10) => {
  try {
    const response = await axiosInstance.get("/back-office/chit-group", {
      params: {
        limit: limit,
      },
    });
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingWinnerPersonalDetails = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/auction/winner-details/${memberId}`
    );
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingAllChitForms = async (
  search,
  status,
  page = 1,
  limit = 10
) => {
  try {
    const response = await axiosInstance.get("/crm/chit-form", {
      params: {
        search: search,
        status: status,
        page: page,
        limit: limit,
        sortBy: "createdAt:desc",
      },
    });
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingChitFormDashboardStack = async () => {
  try {
    const response = await axiosInstance.get("/crm/chit-form/status-summary");
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingKycDetailsById = async (kycId) => {
  try {
    const response = await axiosInstance.get(`/crm/kyc/${kycId}`);
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const ChitFormAddingToGroup = async (payload) => {
  try {
    const response = await axiosInstance.patch(
      "/back-office/chit-forms/",
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const DocumentSendRequest = async (payload) => {
  console.log("api received requesting", payload);

  try {
    const response = await axiosInstance.put(
      "/back-office/auction/request-docs",
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const DeductionSendRequest = async (payload) => {
  try {
    const response = await axiosInstance.patch(
      "/back-office/auction/winner-details/financials",
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingGuarantorDetails = async (winningDetailsId) => {
  try {
    const response = await axiosInstance.get(
      "back-office/auction/winning-details-populated",
      {
        params: {
          winningDetailsId,
        },
      }
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const ApproveReceivedDocuments = async (id, payload) => {
  try {
    const response = await axiosInstance.patch(
      `back-office/auction/update-docs/${id}`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const ApproveGuarantorAndBankDetails = async (id, payload) => {
  try {
    const response = await axiosInstance.patch(
      `back-office/auction/update-status/${id}`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const getAllActiveGroups = async () => {
  try {
    const response = await axiosInstance.get("/back-office/chit-group/groups");
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const getAllChitPlans = async () => {
  try {
    const response = await axiosInstance.get("/chit-plans/list-chit-plans");
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const StartAuction = async (payload) => {
  try {
    const response = await axiosInstance.post("/back-office/auction", payload);
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const gettingExecutiveReport = async (subcriptionId) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/chit-forms/${subcriptionId}`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const getTransactionDetails = async (subcriptionId, payload) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/chit-forms/${subcriptionId}/transactions`,
      {
        params: payload, // ✅ Send payload as query parameters
      }
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GetSpecificGroupDetails = async (groupId) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/chit-group/${groupId}`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const UpdateGroup = async (selectedGroupId, payload) => {
  try {
    const response = await axiosInstance.put(
      `/back-office/chit-group/${selectedGroupId}`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingAllCollectors = async () => {
  try {
    const response = await axiosInstance.get("back-office/money-collector");
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

// new api

export const GettingSubscriber = async (groupId) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/chit-group/${groupId}/subscribers`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingEmployeeTypes = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/chit-group/employee-types`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const AddingSubscriber = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/chit-group/subscriber`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingMoneyCollectorList = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/chit-group/money-collectors`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

// orginal
export const GettingReceiptSeries = async (collectorId) => {
  try {
    const response = await axiosInstance.get(
      "/back-office/receipt-book/receipt-series",
      {
        params: {
          collectorId: collectorId,
        },
      }
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingReceiptNumber = async (receiptSeries) => {
  try {
    const response = await axiosInstance.get(
      "/back-office/receipt/receipt-number"
      // {
      //   params: {
      //     receiptSeries: receiptSeries,
      //   },
      // }
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingCreditHeads = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/head-trees/credit-heads`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingDebitHeads = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/head-trees/debit-heads`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingBank = async () => {
  try {
    const response = await axiosInstance.get(`/back-office/head-trees/banks`);
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const SendGuarantorRequest = async (winningDetailsId, payload) => {
  try {
    const response = await axiosInstance.patch(
      `/back-office/auction/update-status/${winningDetailsId}`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingSubscriberNameById = async (subscriberId) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/receipt/${subscriberId}`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

// original
export const GettingAllTokens = async () => {
  try {
    const response = await axiosInstance.get(
      "/back-office/head-trees/chit-number"
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GenerateReceipt = async (payload) => {
  try {
    const response = await axiosInstance.post(`/back-office/receipt`, payload);
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingNotApprovedVouchers = async () => {
  try {
    const response = await axiosInstance.get(`/back-office/chit-forms`);
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingAllSubscribers = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/chit-group/subscriber`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GetSubscriberDetails = async (subscriberId) => {
  try {
    const response = await axiosInstance.get(
      `/back-office/chit-group/subscriber/${subscriberId}`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

// booklet

export const GettingBooklet = async () => {
  try {
    const response = await axiosInstance.get(`/back-office/chit-group/booklet`);
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

// voucher

export const FillingFee = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/filing-fee`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const FixedDepositRelease = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/fixed-deposit-release`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const RCMDepositRelease = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/rcm-deposit-release`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const Deposit = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/deposit-voucher`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const DecreeAndCourtCost = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/legal-transaction`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const CashChequeAdviceVoucher = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/cash-cheque-advice`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const TestingAdviceVoucher = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/test-advice-voucher`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const AdjustmentVoucher = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/adjustment-voucher`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const InvestmentVoucher = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/investment-voucher`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const YearEndVoucher = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/year-end-voucher`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const SalaryVoucher = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/back-office/salary-voucher`,
      payload
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingCourtVoucherNumber = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/legal-transaction/number`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const GettingCashChequeAdviceVoucherNumber = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/cash-cheque-advice-voucher/next-voucher-number`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const TestingAdviceVoucherNumber = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/test-advice-voucher/next-voucher-number`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const AdjustmentVoucherNumber = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/adjustment-voucher/next-voucher-number`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const InvestmentVoucherNumber = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/investment-voucher/next-voucher-number`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const YearEndVoucherNumber = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/year-end-closing/next-voucher-number`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};

export const SalaryVoucherNumber = async () => {
  try {
    const response = await axiosInstance.get(
      `/back-office/salary-voucher/next-voucher-number`
    );
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
};


export const GettingEmployees = async () => {
  try {
    const response = await axiosInstance.get(`/back-office/employees`);
    return response.data; // Returns the API response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch catalogs.";
    throw new Error(errorMessage);
  }
} 
