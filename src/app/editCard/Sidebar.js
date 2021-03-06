import React from "react";
import Button from "@material-ui/core/Button";
import Person from "@material-ui/icons/Person";
import Label from "@material-ui/icons/Label";
import CheckBox from "@material-ui/icons/CheckBox";
import Timer from "@material-ui/icons/Timer";
import AttachFile from "@material-ui/icons/AttachFile";
import ArrowForward from "@material-ui/icons/ArrowForward";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import Archive from "@material-ui/icons/Archive";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { fileAbsolute } from "paths.macro";
import merge from "deepmerge";

import { button, smallIcon, lightColor } from "../styles";

const styles = {
  root: {
    paddingLeft: 8,
    paddingRight: 16,
    "& h3": {
      fontWeight: 700
    },
    "& ul": {
      padding: 0,
      margin: 0,
      marginBottom: 16,
      listStyleType: "none",
      "& li": {
        marginTop: 8
      },
      "& button": merge(button, {
        width: "100%",
        justifyContent: "left",
        background: "rgb(226, 228, 230)",
        boxShadow: "0 1px 0 0 #C4C9CC",
        color: "#444444",
        "&:hover": {
          color: "#444444",
          background: "#CDD2D4",
          boxShadow: "0 1px 0 0 #a5acb0"
        },
        "& svg": { ...smallIcon, ...lightColor }
      })
    }
  }
};

const buttonsList = buttons => {
  return (
    <ul>
      {buttons.map(([Icon, text], idx) => (
        <li key={idx}>
          <Button size="small">
            <Icon />
            {text}
          </Button>
        </li>
      ))}
    </ul>
  );
};

const Sidebar = ({ classes, className = "", style = {} }) => {
  return (
    <div className={`${classes.root} ${className}`} style={style}>
      <Typography variant="subheading"> Add </Typography>
      {buttonsList([
        [Person, "Members"],
        [Label, "Labels"],
        [CheckBox, "Checklist"],
        [Timer, "Due Date"],
        [AttachFile, "Attachment"]
      ])}
      <Typography variant="subheading"> Actions </Typography>
      {buttonsList([
        [ArrowForward, "Move"],
        [LibraryBooks, "Copy"],
        [RemoveRedEye, "Watch"],
        [Archive, "Archive"]
      ])}
    </div>
  );
};

const Component = withStyles(styles)(Sidebar);

Component.displayName = require("../../utils").moduleName(fileAbsolute);

export default Component;
