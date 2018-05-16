import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Title from "./Title";
import { cardDescription } from "../CardsList/Card";
import * as Labels from "../labels";

const styles = { root: {} };

const EditCard = ({ classes, card = null, ...extra }) => {
  return (
    <div
      aria-describedby={Labels.editCardDescription.id}
      className={classes.root}
      {...extra}
    >
      <Title text={cardDescription(card)} />
    </div>
  );
};

const View = withStyles(styles)(EditCard);

View.propTypes = {
  card: PropTypes.object
};

export default View;
