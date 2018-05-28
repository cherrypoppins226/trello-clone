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
import IconAndText from "./IconAndText";

const styles = {
  section: {
    marginBottom: 25
  },
  subheading: {
    marginBottom: 10
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
          <IconAndText
            className={classes.subheading}
            variant="subheading"
            Icon={Icon}
            children={title}
          />
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
