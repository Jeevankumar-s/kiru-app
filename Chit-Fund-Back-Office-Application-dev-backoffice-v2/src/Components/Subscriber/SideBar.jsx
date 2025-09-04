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
        {/* <ProductPageSidebarListItem
          active={location.pathname.endsWith("/addition-of-subscriber")}
          component={Link}
          to={"/addition-of-subscriber"}
        >
          <ProductPageSidebarListItemText>
            <Typography>Addition of subscriber</Typography>
          </ProductPageSidebarListItemText>
        </ProductPageSidebarListItem> */}

        <ProductPageSidebarListItem
          active={location.pathname == "/suggestion-of-subscriber"}
          component={Link}
          to={"/suggestion-of-subscriber"}
        >
          <ProductPageSidebarListItemText primary="Suggestion" />
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname.endsWith("/approval-of-subscriber")}
          component={Link}
          to={"/approval-of-subscriber"}
        >
          <ProductPageSidebarListItemText primary="Approval" />
        </ProductPageSidebarListItem>

        <ProductPageSidebarListItem
          active={location.pathname == "/allocation-of-subscriber"}
          component={Link}
          to={"/allocation-of-subscriber"}
        >
          <ProductPageSidebarListItemText primary="Allocation" />
        </ProductPageSidebarListItem>
      </List>
    </InnerSideBarContainer>
  );
};

export default Sidebar;
