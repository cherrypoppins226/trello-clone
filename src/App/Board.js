import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CardsList, { listType } from "./CardsList";

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

const Board = ({ classes, lists }) => {
  return (
    <div className={classes.root}>
      {lists.map(list => <CardsList key={list.id} list={list} />)}
    </div>
  );
};

const View = withStyles(styles)(Board);

View.propTypes = {
  lists: PropTypes.arrayOf(listType).isRequired
};

export default View;
