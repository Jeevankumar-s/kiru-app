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
          active={location.pathname == "/for-removal/suggestion-of-subscriber"}
          component={Link}
          to={"/for-removal/suggestion-of-subscriber"}
        >
          <ProductPageSidebarListItemText primary="Suggestion" />
        </ProductPageSidebarListItem>
        <ProductPageSidebarListItem
          active={location.pathname.endsWith(
            "/for-removal/approval-of-subscriber"
          )}
          component={Link}
          to={"/for-removal/approval-of-subscriber"}
        >
          <ProductPageSidebarListItemText primary="Approval" />
        </ProductPageSidebarListItem>
        <ProductPageSidebarListItem
          active={location.pathname == "/for-removal/allocation-of-subscriber"}
          component={Link}
          to={"/for-removal/allocation-of-subscriber"}
        >
          <ProductPageSidebarListItemText primary="Allocation" />
        </ProductPageSidebarListItem>
      </List>
    </InnerSideBarContainer>
  );
};

export default Sidebar;
