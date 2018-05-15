import React from "react";
import path from "path";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Modal from "material-ui/Modal";
import * as Labels from "./labels";

const styles = {};

const View = ({ classes, container, card = null }) => {
  return (
    <Modal
      aria-describedby={Labels.fullyEditCardDescription.id}
      open={Boolean(card)}
      container={container}
    >
      <div />
    </Modal>
  );
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  card: PropTypes.object,
  container: PropTypes.object.isRequired
};

View.displayName = path.basename(__filename, path.extname(__filename));

export default withStyles(styles)(View);
