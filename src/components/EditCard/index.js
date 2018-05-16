import React from "react";
import path from "path";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Modal from "material-ui/Modal";
import * as Labels from "../labels";

const styles = {};

let View = ({ classes, container, card = null }) => {
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

View = withStyles(styles)(View);

View.propTypes = {
  card: PropTypes.object,
  container: PropTypes.object.isRequired
};

View.displayName = path.basename(__filename, path.extname(__filename));

export default View;
