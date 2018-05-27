import React from "react";
import ViewHeadline from "@material-ui/icons/ViewHeadline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextArea from "react-textarea-autosize";
import { textarea5 } from "../styled";

// TODO: Reuse styles with Attachment
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
    "& textarea": textarea5
  }
};

const Description = ({ classes }) => (
  <div className={classes.root}>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <ViewHeadline />
      <Typography variant="subheading">Description</Typography>
    </div>
    <Typography
      component={TextArea}
      placeholder="Add a more detailed description..."
    />
  </div>
);

const View = withStyles(styles)(Description);

export default View;
