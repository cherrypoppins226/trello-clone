import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = {};

let EditCard = ({ classes, card = null }) => {
  return <div />;
};

const View = withStyles(styles)(EditCard);

View.propTypes = {
  card: PropTypes.object
};

export default View;
