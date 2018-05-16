import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import { MenuList, MenuItem } from "material-ui/Menu";
import grey from "material-ui/colors/grey";

const styles = {
  heading: {
    paddingTop: 8,
    color: grey[700]
  },
  menu: {
    width: 300,
    "& *": {
      fontWeight: 700
    },
    "& hr": {
      margin: 5,
      marginLeft: 10,
      marginRight: 10
    },
    "& [role='menuitem']": {
      padding: 3,
      paddingLeft: 10,
      transition: "",
      "&:hover": {
        backgroundColor: "rgb(41, 143, 202)",
        "& p": { color: "white" }
      }
    }
  }
};

const ActionsMenu = ({ classes, onMenuItemClick }) => {
  return (
    <>
      <Typography role="heading" align="center" className={classes.heading}>
        List Actions
      </Typography>
      <MenuList className={classes.menu} dense={true} onClick={onMenuItemClick}>
        {[
          "",
          "Add Card...",
          "Copy List...",
          "Move List...",
          "Watch",
          "",
          "Sort By",
          "",
          "Move All Cards in This List...",
          "Archive All Cards in This List...",
          "",
          "Archive This List"
        ].map((item, idx) => {
          if (!Boolean(item)) return <Divider key={idx} />;
          return (
            <MenuItem key={idx}>
              <Typography> {item} </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </>
  );
};

const View = withStyles(styles)(ActionsMenu);

View.propTypes = {
  onMenuItemClick: PropTypes.func.isRequired
};

export default View;
