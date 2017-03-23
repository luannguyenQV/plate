import { List, ListItem } from "material-ui/List";
import React, { PropTypes } from "react";

import Divider from "material-ui/Divider";
import ExpandMoreIcon from "material-ui/svg-icons/hardware/keyboard-arrow-down";
import KeyboardArrowRight
  from "material-ui/svg-icons/hardware/keyboard-arrow-right";

const FooterMobile = props => {
  const {
    quickLinkOpen,
    aboutLinkOpen,
    toggleAboutLink,
    toggleQuickLink
  } = props;

  return (
    <div className="footer-mobile-main">
      <List>
        <ListItem
          primaryText="Quick Links"
          style={{ color: "#bdbdbd" }}
          onNestedListToggle={toggleQuickLink}
          rightIcon={
            quickLinkOpen ? <ExpandMoreIcon /> : <KeyboardArrowRight />
          }
          primaryTogglesNestedList
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Register"
              style={{ color: "#bdbdbd" }}
            />,
            <ListItem
              key={2}
              primaryText="Login"
              style={{ color: "#bdbdbd" }}
            />
          ]}
        />
        <div className="divider-style">
          <Divider />
        </div>
        <ListItem
          primaryText="About Us"
          style={{ color: "#bdbdbd" }}
          onNestedListToggle={toggleAboutLink}
          rightIcon={
            aboutLinkOpen ? <ExpandMoreIcon /> : <KeyboardArrowRight />
          }
          primaryTogglesNestedList
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Register"
              style={{ color: "#bdbdbd" }}
            />,
            <ListItem
              key={2}
              primaryText="Contact Us"
              style={{ color: "#bdbdbd" }}
            />
          ]}
        />
      </List>
      <style jsx>
        {
          `
            .footer-mobile-main {
              background-color: #2E3644;
            }
            .divider-style {
              opacity: 0.1;
              margin-top: 5px;
              margin-bottom: 5px;
            }
          `
        }
      </style>
    </div>
  );
};

FooterMobile.propTypes = {
  quickLinkOpen: PropTypes.bool,
  aboutLinkOpen: PropTypes.bool,
  toggleAboutLink: PropTypes.func,
  toggleQuickLink: PropTypes.func
};

export default FooterMobile;