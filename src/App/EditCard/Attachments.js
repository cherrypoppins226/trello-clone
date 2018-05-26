import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Attachment from "@material-ui/icons/Attachment";

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
    }
  },
  addAttachment: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 7,
    minHeight: 50,
    marginLeft: 35,
    border: "2px dashed #C4C9CC"
  }
};

const Attachments = ({ classes }) => (
  <div className={classes.root}>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Attachment />
      <Typography variant="subheading">Attachments</Typography>
    </div>
    <div className={classes.addAttachment}>
      <Typography align="center">Drag and drop or choose your files</Typography>
    </div>
  </div>
);

const View = withStyles(styles)(Attachments);

export default View;
