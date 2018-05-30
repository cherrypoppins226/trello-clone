import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import Popover from "@material-ui/core/Popover";
import { connect } from "react-redux";
import { fileAbsolute } from "paths.macro";

import * as actions from "./actions";
import * as labels from "./labels";
import { moduleName } from "./utils";
import QuickEditCard from "./QuickEditCard";
import ActionsMenu from "./CardsList/ActionsMenu";
import EditCard from "./EditCard";
import CardsList from "./CardsList";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

const ActionsMenuPopover = connect(
  state => ({
    listBeingEdited: state.listBeingEdited
  }),
  dispatch => ({
    finishEditList: () => dispatch(actions.finishEditList())
  })
)(props => {
  if (!props.listBeingEdited) return null;
  return (
    <Popover
      disableAutoFocus
      anchorReference="anchorPosition"
      anchorPosition={{
        top: props.listBeingEdited.anchorElementBox.bottom,
        left: props.listBeingEdited.anchorElementBox.left
      }}
      open={true}
      onClose={props.finishEditList}
      TransitionProps={{ timeout: 0 }}
      elevation={1}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <ActionsMenu />
    </Popover>
  );
});

const EditCardModal = connect(
  state => ({
    cardBeingEdited: state.cardBeingEdited
  }),
  dispatch => ({
    finishEditCard: () => dispatch(actions.finishEditCard())
  })
)(
  props =>
    !props.cardBeingEdited ? null : (
      <Modal
        style={{ overflow: "auto" }}
        open={true}
        onClose={props.finishEditCard}
        BackdropProps={{ id: "editCardBackdrop" }}
      >
        <EditCard {...props.cardBeingEdited} />
      </Modal>
    )
);

const QuickEditCardModal = connect(
  state => ({
    cardBeingQuickEdited: state.cardBeingQuickEdited
  }),
  dispatch => ({
    finishQuickEditCard: () => dispatch(actions.finishQuickEditCard())
  })
)(
  props =>
    !props.cardBeingQuickEdited ? null : (
      <Modal
        open={true}
        onClose={props.finishQuickEditCard}
        BackdropProps={{ id: "quickEditCardBackdrop" }}
      >
        <QuickEditCard {...props.cardBeingQuickEdited} />
      </Modal>
    )
);

const styles = {
  root: {
    padding: 8,
    height: "100%",
    flexWrap: "nowrap",
    display: "flex",
    alignItems: "flex-start",
    "& > *": {
      margin: 8,
      flex: "0 0 auto",
      width: 270,
      maxHeight: "calc(100% - 16px)"
    }
  }
};

const View = props => {
  return (
    <>
      <div className={props.classes.root}>
        {props.lists.map(list => <CardsList key={list.id} list={list} />)}
      </div>
      <div style={{ display: "none" }}>
        {Object.values(labels).map((obj, idx) => (
          <div id={obj.id} key={idx}>
            {obj.text}
          </div>
        ))}
      </div>
      <ActionsMenuPopover />
      <EditCardModal />
      <QuickEditCardModal />
    </>
  );
};

const Styled = withStyles(styles)(View);

Styled.displayName = moduleName(fileAbsolute);

Styled.propTypes = {
  lists: PropTypes.array.isRequired
};

export default Styled;
