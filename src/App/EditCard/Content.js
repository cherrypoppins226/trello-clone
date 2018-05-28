import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Description from "./Description";
import Attachments from "./Attachments";
import Checklist from "./Checklist";
import Comments from "./Comments";
import ViewHeadline from "@material-ui/icons/ViewHeadline";
import Attachment from "@material-ui/icons/Attachment";
import CheckBox from "@material-ui/icons/CheckBox";
import Comment from "@material-ui/icons/Comment";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Typography from "@material-ui/core/Typography";
import { icon, lightColor } from "../styles";

const styles = {
  section: {
    marginBottom: 25
  },
  subheading: {
    marginBottom: 10,
    display: "flex",
    alignItems: "flex-start",
    fontWeight: 700,
    "& svg": { ...icon, ...lightColor }
  },
  content: {
    marginLeft: 35
  }
};

const Activity = () => <div />;

const View = ({ classes, className = "" }) => {
  return (
    <div className={className}>
      {[
        ["Description", Description, ViewHeadline],
        ["Attachments", Attachments, Attachment],
        ["Checklist", Checklist, CheckBox],
        ["Add Comment", Comments, Comment],
        ["Activity", Activity, FormatListBulleted]
      ].map(([title, Component, Icon], idx) => (
        <section key={idx} className={classes.section}>
          <Typography
            className={classes.subheading}
            variant="subheading"
            children={title}
          >
            <Icon />
            {title}
          </Typography>
          <div className={classes.content}>
            <Component />
          </div>
        </section>
      ))}
    </div>
  );
};

const Content = withStyles(styles)(View);

export default Content;
