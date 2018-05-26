import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Description from "./Description";
import Attachments from "./Attachments";
import Checklist from "./Checklist";
import Comments from "./Comments";
import Activity from "./Activity";

const styles = {
  root: {
    padding: "0px 8px",
    "& > div": {
      marginBottom: 25
    }
  }
};

const Content = ({ classes, ...props }) => {
  const { className, ...rest } = props;
  return (
    <div className={`${classes.root} ${className || ""}`} {...rest}>
      <Description />
      <Attachments />
      <Checklist />
      <Comments />
      <Activity />
    </div>
  );
};

const View = withStyles(styles)(Content);

export default View;
