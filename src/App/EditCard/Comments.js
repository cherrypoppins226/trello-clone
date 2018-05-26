import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Comment from "@material-ui/icons/Comment";
import TextArea from "../TextArea";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    "& svg": {
      color: "rgb(153, 153, 153)",
      margin: "0px 5px",
      padding: 1
    },
    "& h3": {
      fontWeight: 700,
      marginBottom: 10
    },
    "& textarea": {
      width: "100%",
      minHeight: 75,
      padding: "9px 11px",
      paddingBottom: 0,
      background: "white",
      outline: "none",
      boxShadow: "0 1px 2px rgba(0,0,0,.23)",
      marginBottom: 10,
      "&:focus": {
        boxShadow: "0 1px 3px rgba(0,0,0,.33)"
      }
    }
  },
  saveComment: {
    textTransform: "none",
    fontWeight: 700
  }
};

const Comments = ({ classes }) => (
  <div className={classes.root}>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Comment />
      <Typography variant="subheading">Add Comment</Typography>
    </div>
    <div style={{ marginLeft: 40 }}>
      <Typography component={TextArea} placeholder="Write a comment..." />
      <Typography>
        <Button
          className={classes.saveComment}
          size="small"
          variant="raised"
          disabled
        >
          Save
        </Button>
      </Typography>
    </div>
  </div>
);

const View = withStyles(styles)(Comments);

export default View;
