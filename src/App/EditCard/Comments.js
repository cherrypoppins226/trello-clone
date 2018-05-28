import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import merge from "deepmerge";
import TextArea from "react-textarea-autosize";
import { textareaCommon } from "../styled";

const styles = {
  commentArea: merge(textareaCommon, {
    minHeight: 75,
    marginBottom: 10,
    outline: "none",
    padding: "9px 11px",
    paddingBottom: 0,
    boxShadow: "0 1px 2px rgba(0,0,0,.23)"
  }),
  saveComment: {
    textTransform: "none",
    fontWeight: 700
  }
};

const Comments = ({ classes }) => (
  <>
    <Typography
      className={classes.commentArea}
      component={TextArea}
      placeholder="Write a comment..."
    />
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
  </>
);

const View = withStyles(styles)(Comments);

export default View;
