import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import * as Labels from "../labels";

const styles = {};

let EditCard = ({ classes, card = null }) => {
  return <div aria-describedby={Labels.editCardDescription.id} />;
};

const View = withStyles(styles)(EditCard);

View.propTypes = {
  card: PropTypes.object
};

export default View;
