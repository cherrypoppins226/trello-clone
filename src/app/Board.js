import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Modal from "@material-ui/core/Modal";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { observer, inject } from "mobx-react";
import { compose, branch, renderNothing } from "recompose";
import { fileAbsolute } from "paths.macro";

import {
  makeFixtures,
  moduleName,
  handleGraphQLResponse,
  provideStore
} from "../utils";
import State from "./Board.state.js";
import EditCard from "./EditCard";
import CardsList from "./CardsList";
import QuickEditCard from "./QuickEditCard";
import ActionsMenu from "./cardsList/ActionsMenu";

const renderOn = name =>
  compose(
    inject("boardState"),
    observer,
    branch(({ boardState }) => !boardState[name], renderNothing)
  );

const ActionsMenuPopover = renderOn("listBeingEdited")(props => (
  <ClickAwayListener onClickAway={props.boardState.finishListEdit}>
    <ActionsMenu
      style={{
        position: "absolute",
        top: `${props.boardState.listBeingEdited.anchorElementBox.bottom}px`,
        left: `${props.boardState.listBeingEdited.anchorElementBox.left}px`
      }}
    />
  </ClickAwayListener>
));

const EditCardModal = renderOn("cardBeingEdited")(props => (
  <Modal
    style={{ display: "flex", justifyContent: "center", overflowY: "auto" }}
    open={true}
    onClose={props.boardState.finishCardEdit}
    BackdropProps={{ id: "editCardBackdrop" }}
  >
    <EditCard style={{ position: "absolute", top: "60px" }} />
  </Modal>
));

const QuickEditCardModal = renderOn("cardBeingQuickEdited")(props => (
  <Modal
    open={true}
    onClose={props.boardState.finishQuickCardEdit}
    BackdropProps={{ id: "quickEditCardBackdrop" }}
  >
    <QuickEditCard
      style={{
        position: "absolute",
        top: `${props.boardState.cardBeingQuickEdited.anchorElementBox.top}px`,
        left: `${props.boardState.cardBeingQuickEdited.anchorElementBox.left}px`
      }}
    />
  </Modal>
));

const styles = {
  root: {
    background: "rgb(0, 121, 191)",
    left: 0,
    right: 0,
    height: "100%",
    overflowX: "auto",
    padding: 10,
    display: "flex",
    alignItems: "flex-start",
    "& > *": {
      marginRight: 10,
      flex: "0 0 auto",
      width: 270,
      maxHeight: "100%"
    }
  }
};

const Board = ({ classes, data: { lists } }) => {
  return (
    <React.Fragment>
      <div className={classes.root}>
        {lists.map(list => <CardsList key={list.id} id={list.id} />)}
      </div>
      <ActionsMenuPopover />
      <EditCardModal />
      <QuickEditCardModal />
    </React.Fragment>
  );
};

const Component = compose(
  graphql(gql("query ListIds { lists { id } }")),
  handleGraphQLResponse(),
  provideStore("boardState", State),
  withStyles(styles)
)(Board);

export const fixtures = makeFixtures(moduleName(fileAbsolute), Component, {
  default: {}
});

export default Component;
