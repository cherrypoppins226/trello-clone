import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { fileAbsolute } from "paths.macro";
import { Provider, observer, inject } from "mobx-react";
import { graphql } from "react-apollo";
import { compose, setDisplayName } from "recompose";
import gql from "graphql-tag";

import { makeFixtures, handleGraphQLResponse, moduleName } from "./utils";
import State from "./App.state.js";
import CardsList from "./app/CardsList";
import ActionsMenu from "./app/cardsList/ActionsMenu";
import EditCard from "./app/EditCard";
import QuickEditCard from "./app/QuickEditCard";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

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

const state = new State();

const LIST_IDS = gql`
  query ListIds {
    lists {
      id
    }
  }
`;

const App = ({ classes, data: { lists } }) => {
  return (
    <Provider appState={state}>
      <div className={classes.root}>
        <div className={classes.lists}>
          {lists.map(list => <CardsList key={list.id} id={list.id} />)}
        </div>
        <ActionsMenuPopover />
        <EditCardModal />
        <QuickEditCardModal />
      </div>
    </Provider>
  );
};

const Component = compose(
  setDisplayName(moduleName(fileAbsolute)),
  withStyles(styles),
  graphql(LIST_IDS),
  handleGraphQLResponse()
)(App);

export const fixtures = makeFixtures(Component, {
  default: {}
});

export default Component;
