import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import grey from "@material-ui/core/colors/grey";
import { fileAbsolute } from "paths.macro";
import { compose } from "recompose";
import { inject } from "mobx-react";

import { makeFixtures, renderLabels, labelId, moduleName } from "../../utils";

const modulePath = moduleName(fileAbsolute);

export const labels = {
  description: {
    id: labelId(modulePath, "description"),
    text: "Perform actions such as deleting, copying, and moving this list."
  }
};

const styles = {
  root: {
    width: 300,
    "& [role='heading']": {
      paddingTop: 8,
      color: grey[700]
    },
    "& [role='menu']": {
      "& *": {
        fontWeight: 700
      },
      "& hr": {
        margin: "5px 10px"
      },
      "& [role='menuitem']": {
        padding: 3,
        paddingLeft: 10,
        "&:hover": {
          backgroundColor: "rgb(41, 143, 202)",
          "& p": { color: "white" }
        }
      }
    }
  }
};

const ActionsMenu = ({ classes, appState, ...rest }) => {
  return (
    <Paper
      className={classes.root}
      aria-describedby={labels.description.id}
      {...rest}
    >
      {renderLabels(labels)}
      <Typography role="heading" align="center">
        List Actions
      </Typography>
      <MenuList dense={true} onClick={() => appState.finishListEdit()}>
        {[
          "",
          "Add Card...",
          "Copy List...",
          "Move List...",
          "Watch",
          "",
          "Sort By",
          "",
          "Move All Cards in This List...",
          "Archive All Cards in This List...",
          "",
          "Archive This List"
        ].map((item, idx) => {
          if (!Boolean(item)) return <Divider key={idx} />;
          return (
            <MenuItem key={idx}>
              <Typography> {item} </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Paper>
  );
};

const Component = compose(inject("appState"), withStyles(styles))(ActionsMenu);

export const fixtures = makeFixtures(modulePath, Component, {
  default: {
    props: {},
    stores: {
      appState: {
        listBeingEdited: {
          id: 1,
          anchorElementBox: { top: 0, left: 0, bottom: 0, right: 0 }
        },
        finishListEdit: () => {}
      }
    }
  }
});

export default Component;
