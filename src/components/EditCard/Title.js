import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import TextArea from "../TextArea";

const styles = {};

const Title = ({ classes, text }) => {
  return <TextArea rows={1} value={text} />;
};

const View = withStyles(styles)(Title);

View.propTypes = {
  text: PropTypes.string.isRequired
};

export default View;
