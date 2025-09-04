import React from "react";
import { Link, useLocation } from "react-router-dom";
import { List } from "@mui/material";
import {
  ProductPageSidebarListItem,
  ProductPageSidebarListItemText,
  InnerSideBarContainer,
} from "../../StyledElement.jsx";

const Sidebar = () => {
  const location = useLocation();
  return (
    <InnerSideBarContainer>
      <List sx={{ flexGrow: 1 }}>
        <ProductPageSidebarListItem
          active={location.pathname == "/for-transfer/suggestion-of-subscriber"}
          component={Link}
          to={"/for-transfer/suggestion-of-subscriber"}
        >
          <ProductPageSidebarListItemText primary="Suggestion" />
        </ProductPageSidebarListItem>
        <ProductPageSidebarListItem
          active={location.pathname.endsWith(
            "/for-transfer/approval-of-subscriber"
          )}
          component={Link}
          to={"/for-transfer/approval-of-subscriber"}
        >
          <ProductPageSidebarListItemText primary="Approval" />
        </ProductPageSidebarListItem>
        <ProductPageSidebarListItem
          active={location.pathname == "/for-transfer/allocation-of-subscriber"}
          component={Link}
          to={"/for-transfer/allocation-of-subscriber"}
        >
          <ProductPageSidebarListItemText primary="Allocation" />
        </ProductPageSidebarListItem>
      </List>
    </InnerSideBarContainer>
  );
};

export default Sidebar;
