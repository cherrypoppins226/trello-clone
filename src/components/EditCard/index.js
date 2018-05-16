import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import * as Labels from "../labels";

const styles = {};

const EditCard = ({ classes, card = null, ...extra }) => {
  return <div aria-describedby={Labels.editCardDescription.id} {...extra} />;
};

const View = withStyles(styles)(EditCard);

View.propTypes = {
  card: PropTypes.object
};

export default View;
