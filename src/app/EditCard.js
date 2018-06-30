import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { fileAbsolute } from "paths.macro";
import { compose } from "recompose";
import { inject } from "mobx-react";

import { makeFixtures, labelId, moduleName } from "../utils";
import Header from "./editCard/Header";
import Sidebar from "./editCard/Sidebar";
import Content from "./editCard/Content";

const modulePath = moduleName(fileAbsolute);

export const labels = {
  description: {
    id: labelId(modulePath, "description"),
    text: "Edit card: Change title, descriptions, labels, attachments, and more"
  }
};

const styles = {
  root: {
    width: 750,
    backgroundColor: "rgb(237, 239, 240)",
    borderRadius: 2,
    outline: "none"
  }
};

const EditCard = ({ classes, boardState, style = {} }) => (
  <div
    style={style}
    aria-describedby={labels.description.id}
    className={classes.root}
    tabIndex={-1}
  >
    <Header
      className={classes.header}
      cardId={boardState.cardBeingEdited.id}
      cardTitle={boardState.cardBeingEdited.title}
    />
    <div style={{ display: "flex" }}>
      <Content style={{ width: "100%", padding: "0px 10px" }} />
      <Sidebar style={{ flexBasis: 220 }} />
    </div>
  </div>
);

const Component = compose(inject("boardState"), withStyles(styles))(EditCard);

export const fixtures = makeFixtures(modulePath, Component, {
  default: {
    props: {},
    stores: {
      boardState: {
        cardBeingEdited: { id: 1, title: "Ut sunt qui amet." }
      }
    }
  }
});

export default Component;
