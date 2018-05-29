import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Header from "./Header";
import Cards from "./Cards";
import { button } from "../styles";
import * as actions from "../actions";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    background: "rgb(226, 228, 230)",
    "& > button": {
      ...button,
      justifyContent: "left",
      fontWeight: 400
    }
  },
  header: {
    margin: 5
  }
};

const CardsList = props => {
  return (
    <Paper
      data-listid={props.list.id}
      component="section"
      elevation={1}
      className={props.classes.root}
    >
      <Header
        className={props.classes.header}
        listId={props.list.id}
        listTitle={props.list.title}
      />
      <div style={{ overflowY: "scroll" }}>
        <Cards cards={props.list.cards} />
      </div>
      <Button onClick={() => props.addCard(props.list.id)}>
        Add a card...
      </Button>
    </Paper>
  );
};

export const listType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
});

CardsList.propTypes = {
  list: listType
};

const mapStateToProps = (state, ownProps) => ({
  list: state.lists.find(list => list.id === ownProps.list.id)
});

const mapDispatchToProps = dispatch => ({
  addCard: id => dispatch(actions.addCard(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(CardsList)
);
