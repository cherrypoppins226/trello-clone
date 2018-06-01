import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { connect } from "react-redux";
import { fileAbsolute } from "paths.macro";

import { mapDispatchToProps } from "./redux";
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
      <ClickAwayListener onClickAway={props.actions.cardsList.finishEdit}>
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
        onClose={props.actions.card.finishEdit}
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
        onClose={props.actions.card.finishQuickEdit}
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
    background: "rgb(0, 121, 191)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    overflowY: "hidden"
  },
  lists: {
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

const View = ({ classes, lists }) => {
  return (
    <div className={classes.root}>
      <div className={classes.lists}>
        {lists.map(list => <CardsList key={list.id} list={list} />)}
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
    </div>
  );
};

const mapStateToProps = state => ({
  lists: state.lists
});

const Container = connect(mapStateToProps)(withStyles(styles)(View));

Container.displayName = moduleName(fileAbsolute);

export default Container;
