import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { fileAbsolute } from "paths.macro";
import { observer, inject } from "mobx-react";
import { graphql } from "react-apollo";
import { compose, setDisplayName, branch, renderNothing } from "recompose";
import gql from "graphql-tag";

import {
  makeFixtures,
  handleGraphQLResponse,
  moduleName,
  provideStore
} from "./utils";
import State from "./App.state.js";
import CardsList from "./app/CardsList";
import ActionsMenu from "./app/cardsList/ActionsMenu";
import EditCard from "./app/EditCard";
import QuickEditCard from "./app/QuickEditCard";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

const renderOn = name =>
  compose(
    inject("appState"),
    observer,
    branch(({ appState }) => !appState[name], renderNothing)
  );

const ActionsMenuPopover = renderOn("listBeingEdited")(props => (
  <ClickAwayListener onClickAway={props.appState.finishListEdit}>
    <ActionsMenu
      {...props}
      style={{
        position: "absolute",
        top: `${props.appState.listBeingEdited.anchorElementBox.bottom}px`,
        left: `${props.appState.listBeingEdited.anchorElementBox.left}px`
      }}
    />
  </ClickAwayListener>
));

const EditCardModal = renderOn("cardBeingEdited")(props => (
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
));

const QuickEditCardModal = renderOn("cardBeingQuickEdited")(props => (
  <Modal
    open={true}
    onClose={props.appState.finishQuickCardEdit}
    BackdropProps={{ id: "quickEditCardBackdrop" }}
  >
    <QuickEditCard
      {...props}
      style={{
        position: "absolute",
        top: `${props.appState.cardBeingQuickEdited.anchorElementBox.top}px`,
        left: `${props.appState.cardBeingQuickEdited.anchorElementBox.left}px`
      }}
    />
  </Modal>
));

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

const App = ({ classes, data: { lists } }) => {
  return (
    <div className={classes.root}>
      <div className={classes.lists}>
        {lists.map(list => <CardsList key={list.id} id={list.id} />)}
      </div>
      <ActionsMenuPopover />
      <EditCardModal />
      <QuickEditCardModal />
    </div>
  );
};

const Component = compose(
  setDisplayName(moduleName(fileAbsolute)),
  graphql(gql("query ListIds { lists { id } }")),
  handleGraphQLResponse(),
  provideStore("appState", State),
  withStyles(styles)
)(App);

export const fixtures = makeFixtures(Component, {
  default: {}
});

export default Component;
