import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import TextArea from "react-textarea-autosize";
import { fileAbsolute } from "paths.macro";
import { inject } from "mobx-react";
import { compose, setPropTypes, setDisplayName } from "recompose";
import { graphql } from "react-apollo";

import { queries } from "../../cosmos/apollo/schema";
import {
  handleGraphQLResponse,
  makeFixtures,
  renderLabels,
  labelId,
  moduleName
} from "../../utils";
import { buttonIconSmall, headerTextarea } from "../styles";

const modulePath = moduleName(fileAbsolute);

export const labels = {
  editList: {
    id: labelId(modulePath, "edit-list"),
    text: "Edit List"
  }
};

const styles = {
  root: {
    display: "flex",
    flexShrink: 0,
    "& [role='heading']": {
      ...headerTextarea,
      margin: 3,
      marginRight: 8
    },
    "& button": {
      ...buttonIconSmall,
      alignSelf: "flex-start"
    }
  }
};

const Header = ({ classes, className = "", appState, listId, listTitle }) => {
  return (
    <div className={`${classes.root} ${className}`}>
      {renderLabels(labels)}
      <Typography
        role="heading"
        defaultValue={listTitle}
        component={TextArea}
        spellCheck={false}
        onFocus={e => e.target.select()}
        onChange={e => {}}
      />
      <button
        aria-haspopup={true}
        aria-labelledby={labels.editList.id}
        onClick={e => {
          const box = e.currentTarget.getBoundingClientRect();
          const { top, left, bottom, right } = box;
          appState.startListEdit({
            id: listId,
            anchorElementBox: { top, left, bottom, right }
          });
        }}
      >
        <MoreHoriz />
      </button>
    </div>
  );
};

const Component = compose(
  setDisplayName(modulePath),
  setPropTypes({
    listId: PropTypes.number.isRequired,
    listTitle: PropTypes.string.isRequired
  }),
  graphql(queries.list, {
    options: props => ({ variables: { id: props.listId } })
  }),
  handleGraphQLResponse(),
  inject("appState"),
  withStyles(styles)
)(Header);

export const fixtures = makeFixtures(Component, {
  default: {
    props: {
      listId: 1,
      listTitle: "Repellat quisquam recusandae alias consequuntur corporis."
    },
    stores: {
      appState: {
        startEditList: () => {}
      }
    }
  }
});

export default Component;
