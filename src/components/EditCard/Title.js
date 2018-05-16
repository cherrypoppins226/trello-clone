import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import TextArea from "../TextArea";
import EditableText from "../EditableText";

const styles = {};

const Title = ({ classes, text, ...props }) => {
  return <EditableText component={TextArea} value={text} {...props} />;
};

const View = withStyles(styles)(Title);

View.propTypes = {
  text: PropTypes.string.isRequired
};

export default View;
