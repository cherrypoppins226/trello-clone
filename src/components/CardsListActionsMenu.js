import React from "react";
import path from "path";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Popover from "material-ui/Popover";
import Divider from "material-ui/Divider";
import { MenuList, MenuItem } from "material-ui/Menu";
import grey from "material-ui/colors/grey";

const styles = {
  container: {
    "& [role='heading']": {
      paddingTop: 8,
      color: grey[700]
    },
    "& [role='menu']": {
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
  }
};

const View = ({ classes, anchor, container, onClose }) => {
  return (
    <Popover
      className={classes.container}
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={onClose}
      transitionDuration={0}
      elevation={1}
      container={container}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Typography role="heading" align="center">
        List Actions
      </Typography>
      <MenuList dense={true} onClick={onClose}>
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
    </Popover>
  );
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  anchor: PropTypes.object,
  container: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

View.displayName = path.basename(__filename, path.extname(__filename));

export default withStyles(styles)(View);
