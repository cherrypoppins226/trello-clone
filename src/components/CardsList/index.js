import React from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import grey from "material-ui/colors/grey";
import PropTypes from "prop-types";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Title from "./Title";
import Card from "./Card";
import * as Labels from "../labels";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "100%",
    background: "rgb(226, 228, 230)",
    "& > button": {
      justifyContent: "left",
      textTransform: "none"
    },
    "& ul": {
      padding: 0,
      margin: 0,
      height: "100%",
      "& li": {
        margin: 8,
        marginTop: 2,
        cursor: "pointer"
      }
    }
  },
  listHeader: {
    display: "flex",
    flexShrink: 0,
    justifyContent: "space-between",
    margin: 5,
    "& [role='heading']": {
      flexBasis: "100%",
      fontWeight: 700,
      paddingBottom: 0,
      paddingTop: 3,
      paddingLeft: 5,
      marginRight: 8
    },
    "& p[role='heading']": {
      cursor: "pointer"
    },
    "& button": {
      alignSelf: "flex-start",
      // Reusable styles
      borderWidth: 0,
      background: "none",
      outline: "none",
      cursor: "pointer",
      borderRadius: 4,
      padding: 3,
      "&:hover": {
        background: "#D6D6D6"
      }
    },
    "& svg": {
      // Reusable styles
      padding: 3,
      width: "0.8em",
      height: "0.8em",
      color: grey[700]
    }
  }
};

class CardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.cards.length,
      cards: props.cards.map((card, idx) => ({
        id: idx,
        description: card
      }))
    };
  }

  addCard(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      counter: prevState.counter + 1,
      cards: [
        ...prevState.cards,
        { id: prevState.counter + 1, description: undefined }
      ]
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cards.length < this.state.cards.length)
      this.cardsListEnd.scrollIntoView();
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper
        component="section"
        elevation={1}
        className={classes.root}
        data-testid="CardsList"
      >
        <div className={classes.listHeader}>
          <Title role="heading" text={this.props.title} />
          <button
            onClick={e => this.props.onEditList(e.currentTarget)}
            aria-labelledby={Labels.cardsListActionsMenu.id}
            aria-haspopup={true}
          >
            <MoreHoriz />
          </button>
        </div>
        <div style={{ overflowY: "scroll" }}>
          <ul>
            {this.state.cards.map(({ id, description }) => (
              <li key={id}>
                <Card
                  description={description}
                  onQuickEditCard={this.props.onQuickEditCard}
                  onEditCard={this.props.onEditCard}
                />
              </li>
            ))}
          </ul>
          {/* The sole purpose of this div is to allow scrolling to bottom */}
          <div
            style={{ float: "left", clear: "both" }}
            ref={node => (this.cardsListEnd = node)}
          />
        </div>
        <Button onClick={this.addCard.bind(this)}>Add a card...</Button>
      </Paper>
    );
  }
}

const View = withStyles(styles)(CardsList);

View.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  onEditList: PropTypes.func.isRequired,
  onQuickEditCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired
};

export default View;
