import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { fileAbsolute } from "paths.macro";
import { observable, action, decorate } from "mobx";
import { Provider, observer, inject } from "mobx-react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import * as labels from "./labels";
import { moduleName, handleGraphQLResponse } from "./utils";
import QuickEditCard from "./QuickEditCard";
import ActionsMenu from "./CardsList/ActionsMenu";
import EditCard from "./EditCard";
import CardsList from "./CardsList";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

export class AppState {
  listBeingEdited = null;

  startListEdit = payload => (this.listBeingEdited = payload);

  finishListEdit = () => (this.listBeingEdited = null);

  cardBeingEdited = null;

  startCardEdit = payload => (this.cardBeingEdited = payload);

  finishCardEdit = () => (this.cardBeingEdited = null);

  cardBeingQuickEdited = null;

  startQuickCardEdit = payload => (this.cardBeingQuickEdited = payload);

  finishQuickCardEdit = () => (this.cardBeingQuickEdited = null);
}

decorate(AppState, {
  listBeingEdited: observable,
  startListEdit: action,
  finishListEdit: action,
  cardBeingEdited: observable,
  startCardEdit: action,
  finishCardEdit: action,
  cardBeingQuickEdited: observable,
  startQuickCardEdit: action,
  finishQuickCardEdit: action
});

const ActionsMenuPopover = inject("appState")(
  observer(
    props =>
      !props.appState.listBeingEdited ? null : (
        <ClickAwayListener onClickAway={props.appState.finishListEdit}>
          <ActionsMenu
            {...props}
            style={{
              position: "absolute",
              // prettier-ignore
              top: `${props.appState.listBeingEdited.anchorElementBox.bottom}px`,
              left: `${props.appState.listBeingEdited.anchorElementBox.left}px`
            }}
          />
        </ClickAwayListener>
      )
  )
);

const EditCardModal = inject("appState")(
  observer(
    props =>
      !props.appState.cardBeingEdited ? null : (
        <Modal
          style={{ overflow: "auto" }}
          open={true}
          onClose={props.appState.finishCardEdit}
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
  )
);

const QuickEditCardModal = inject("appState")(
  observer(
    props =>
      !props.appState.cardBeingQuickEdited ? null : (
        <Modal
          open={true}
          onClose={props.appState.finishQuickCardEdit}
          BackdropProps={{ id: "quickEditCardBackdrop" }}
        >
          <QuickEditCard
            {...props}
            style={{
              position: "absolute",
              // prettier-ignore
              top: `${props.appState.cardBeingQuickEdited.anchorElementBox.top}px`,
              // prettier-ignore
              left: `${props.appState.cardBeingQuickEdited.anchorElementBox.left}px`
            }}
          />
        </Modal>
      )
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

const appState = new AppState();

const LIST_IDS = gql`
  query ListIds {
    lists {
      id
    }
  }
`;

const View = ({ classes, data: { lists } }) => {
  return (
    <Provider appState={appState}>
      <div className={classes.root}>
        <div className={classes.lists}>
          {lists.map(list => <CardsList key={list.id} id={list.id} />)}
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
    </Provider>
  );
};

const Component = compose(
  graphql(LIST_IDS),
  handleGraphQLResponse(),
  withStyles(styles)
)(View);

Component.displayName = moduleName(fileAbsolute);

export default Component;
