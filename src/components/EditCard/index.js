import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Modal from "material-ui/Modal";
import * as Labels from "../labels";

const styles = {};

let EditCard = ({ classes, container, card = null }) => {
  return (
    <Modal
      aria-describedby={Labels.editCardDescription.id}
      open={Boolean(card)}
      container={container}
    >
      <div />
    </Modal>
  );
};

const View = withStyles(styles)(EditCard);

View.propTypes = {
  card: PropTypes.object,
  container: PropTypes.object.isRequired
};

export default View;
