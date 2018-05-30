import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { connect } from "react-redux";
import { fileAbsolute } from "paths.macro";

import { mapDispatchToProps } from "./actionCreators";
import * as labels from "./labels";
import { moduleName } from "./utils";
import QuickEditCard from "./QuickEditCard";
import ActionsMenu from "./CardsList/ActionsMenu";
import EditCard from "./EditCard";
import CardsList from "./CardsList";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

const ActionsMenuPopover = connect(
  state => ({ listBeingEdited: state.listBeingEdited }),
  mapDispatchToProps
)(
  props =>
    !props.listBeingEdited ? null : (
      <ClickAwayListener onClickAway={props.actions.finishEditList}>
        <ActionsMenu
          {...props}
          style={{
            position: "absolute",
            top: `${props.listBeingEdited.anchorElementBox.bottom}px`,
            left: `${props.listBeingEdited.anchorElementBox.left}px`
          }}
        />
      </ClickAwayListener>
    )
);

const EditCardModal = connect(
  state => ({ cardBeingEdited: state.cardBeingEdited }),
  mapDispatchToProps
)(
  props =>
    !props.cardBeingEdited ? null : (
      <Modal
        style={{ overflow: "auto" }}
        open={true}
        onClose={props.actions.finishEditCard}
        BackdropProps={{ id: "editCardBackdrop" }}
      >
        <EditCard
          {...props}
          style={{
            position: "absolute",
            top: "60px"
          }}
        />
      </Modal>
    )
);

const QuickEditCardModal = connect(
  state => ({ cardBeingQuickEdited: state.cardBeingQuickEdited }),
  mapDispatchToProps
)(
  props =>
    !props.cardBeingQuickEdited ? null : (
      <Modal
        open={true}
        onClose={props.actions.finishQuickEditCard}
        BackdropProps={{ id: "quickEditCardBackdrop" }}
      >
        <QuickEditCard
          {...props}
          style={{
            position: "absolute",
            top: `${props.cardBeingQuickEdited.anchorElementBox.top}px`,
            left: `${props.cardBeingQuickEdited.anchorElementBox.left}px`
          }}
        />
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
