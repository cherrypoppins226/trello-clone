import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextArea from "../TextArea";

const styles = {};

const Title = ({ classes, text, ...props }) => {
  return (
    <Typography
      role="heading"
      value={text}
      component={TextArea}
      spellCheck={false}
      variant="title"
      {...props}
    />
  );
};

const View = withStyles(styles)(Title);

View.propTypes = {
  text: PropTypes.string.isRequired
};

export default View;
