import React, { useState, useContext, useEffect } from "react";
import {
  Link,
  matchPath,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
// import DropDownIcon from "../../assets/chevron-down.svg";
// import DropUpIcon from "../../assets/chevron-up.svg";
import {
  Box,
  List,
  IconButton,
  Divider,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItem,
} from "@mui/material";
import {
  FilledButton,
  ProductPageSidebarListItem,
  ProductPageSidebarListItemText,
} from "../../StyledElement.jsx";
// import { useWorkflowContext } from "../WorkflowContext";

const Sidebar = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();
  const { productTitle, productId } = useParams(); // Extract productId from route
  const isBenchmarking = searchParams.get("benchmarking") === "true";
  const title = productTitle?.trim() || "untitled";
  const encodedTitle = encodeURIComponent(title);
  const handleNavigation = (path) => {};
  return (
    <Box
      sx={{
        width: "180px",
        // minHeight: "calc(100% - 99px)",
        maxHeight: "calc(100% - 99px)",
        // height: "100vh",
        backgroundColor: "#FFFFFF",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // paddingTop: "20px",
        borderRadius: "16px",
        position: "fixed",
        zIndex: 1000,
        borderLeft: "none",
      }}
    >
      <List
        sx={{
          pt: "12px",
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
      >
        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/voucher/filling-fee")}
          component={Link}
          to={"/voucher/filling-fee"}
        >
          <ProductPageSidebarListItemText primary="Filling fees" />
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname == "/voucher/fixed-deposit-release"}
          component={Link}
          to={"/voucher/fixed-deposit-release"}
        >
          <ProductPageSidebarListItemText
            active={location.pathname === "/voucher/fixed-deposit-release"}
            primary={
              <Typography>
                Fixed deposit <br /> release
              </Typography>
            }
          />
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/voucher/rcm-deposit-release")}
          component={Link}
          to={"/voucher/rcm-deposit-release"}
        >
          {/* <ProductPageSidebarListItemText primary="RCM deposit release" /> */}
          <ProductPageSidebarListItemText>
            <Typography>
              RCM deposit <br /> release
            </Typography>
          </ProductPageSidebarListItemText>
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname == "/voucher/deposit-voucher"}
          component={Link}
          to={"/voucher/deposit-voucher"}
        >
          <ProductPageSidebarListItemText primary="Deposit voucher" />
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith(
            "/voucher/decree-court-cost-debit"
          )}
          component={Link}
          to={"/voucher/decree-court-cost-debit"}
        >
          <ProductPageSidebarListItemText>
            <Typography>
              Decree & court cost <br /> debit
            </Typography>
          </ProductPageSidebarListItemText>
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith(
            "/voucher/decree-court-cost-credit"
          )}
          component={Link}
          to={"/voucher/decree-court-cost-credit"}
        >
          <ProductPageSidebarListItemText>
            <Typography>
              Decree & court cost <br /> credit
            </Typography>
          </ProductPageSidebarListItemText>
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/voucher/cash-cheque-advise")}
          component={Link}
          to={"/voucher/cash-cheque-advise"}
        >
          <ProductPageSidebarListItemText>
            <Typography>
              Cash/cheque/ <br /> advise voucher
            </Typography>
          </ProductPageSidebarListItemText>
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/voucher/testing-advise")}
          component={Link}
          to={"/voucher/testing-advise"}
        >
          <ProductPageSidebarListItemText>
            <Typography>
              Testing advise <br /> voucher
            </Typography>
          </ProductPageSidebarListItemText>
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/voucher/adjustment")}
          component={Link}
          to={"/voucher/adjustment"}
        >
          <ProductPageSidebarListItemText>
            <Typography>
              Adjustment
              <br /> voucher
            </Typography>
          </ProductPageSidebarListItemText>
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/voucher/portal-voucher-entry")}
          component={Link}
          to={"/voucher/portal-voucher-entry"}
        >
          <ProductPageSidebarListItemText>
            <Typography>
              Portal voucher <br /> entry
            </Typography>
          </ProductPageSidebarListItemText>
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/voucher/salary")}
          component={Link}
          to={"/voucher/salary"}
        >
          <ProductPageSidebarListItemText primary="Salary voucher" />
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/voucher/investment")}
          component={Link}
          to={"/voucher/investment"}
        >
          <ProductPageSidebarListItemText primary="Investment voucher" />
        </ProductPageSidebarListItem>
        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/voucher/undo-voucher")}
          component={Link}
          to={"/voucher/undo-voucher"}
        >
          <ProductPageSidebarListItemText primary="Undo voucher" />
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/voucher/year-end-after-closing")}
          component={Link}
          to={"/voucher/year-end-after-closing"}
        >
          <ProductPageSidebarListItemText>
            <Typography>
              Year ending after <br /> closing
            </Typography>
          </ProductPageSidebarListItemText>
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/preview")}
          component={Link}
          to={`/product-form/${encodedTitle}/${productId}/preview?benchmarking=${isBenchmarking}`}
          sx={{ marginLeft: "0px", paddingRight: "10px" }}
        >
          {/* <FilledButton sx={{ width: "100%" }}>Preview</FilledButton>{" "} */}
        </ProductPageSidebarListItem>
        {/* my catalogs */}
      </List>
    </Box>
  );
};

export default Sidebar;
