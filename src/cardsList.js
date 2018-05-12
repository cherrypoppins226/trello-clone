import React from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import List from "material-ui/List";
import grey from "material-ui/colors/grey";
import PropTypes from "prop-types";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import CardsListCard from "./cardsListCard";
import CardsListActionsMenu from "./cardsListActionsMenu";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "100%",
    background: "rgb(226, 228, 230)"
  },
  listHeader: {
    display: "flex",
    flexShrink: 0
  },
  openActionMenuButton: {
    alignSelf: "flex-start",
    marginTop: 8,
    marginRight: 8,
    // Reusable styles
    borderWidth: 0,
    background: "none",
    outline: "none",
    cursor: "pointer",
    borderRadius: 4,
    padding: 3,
    paddingBottom: 0,
    "&:hover": {
      background: "#D6D6D6"
    }
  },
  openActionMenuIcon: {
    // Reusable styles
    padding: 3,
    width: "0.8em",
    height: "0.8em",
    color: grey[700]
  },
  title: {
    margin: 8,
    fontWeight: 700
  },
  cardsList: {
    padding: 1,
    overflowY: "scroll"
  },
  addCard: {
    justifyContent: "left",
    textTransform: "none"
  }
};

export const LIST_ACTIONS_MENU_LABEL = "open-list-actions-menu";

const View = class extends React.Component {
  constructor(props) {
    super(props);
    this.openActionsMenu = this.openActionsMenu.bind(this);
    this.closeActionsMenu = this.closeActionsMenu.bind(this);
    this.state = {
      actionsMenuAnchor: null,
      counter: props.cards.length,
      cards: props.cards.map((description, idx) =>
        this.newCard(idx, description)
      )
    };
  }

  newCard(id, description = undefined) {
    return (
      <CardsListCard
        key={id}
        description={description}
        onEditCard={this.props.onEditCard}
      />
    );
  }

  addCard(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      counter: prevState.counter + 1,
      cards: [...prevState.cards, this.newCard(prevState.counter + 1)]
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cards.length < this.state.cards.length)
      this.cardsListEnd.scrollIntoView();
  }

  openActionsMenu(event) {
    this.setState({ actionsMenuAnchor: event.target });
  }

  closeActionsMenu() {
    this.setState({ actionsMenuAnchor: null });
  }

  render() {
    const { classes, title } = this.props;
    return (
      <Paper elevation={1} className={classes.container}>
        <div className={classes.listHeader}>
          <Typography className={classes.title}>{title}</Typography>
          <button
            onClick={this.openActionsMenu}
            className={classes.openActionMenuButton}
            aria-labelledby={LIST_ACTIONS_MENU_LABEL}
            aria-owns={this.state.actionsMenuAnchor ? "cardlist-actions" : null}
            aria-haspopup={true}
          >
            <MoreHoriz className={classes.openActionMenuIcon} />
          </button>
          <CardsListActionsMenu
            id="cardlist-actions"
            onClose={this.closeActionsMenu}
            anchor={this.state.actionsMenuAnchor}
          />
        </div>
        <List className={classes.cardsList}>
          <div data-testid="cards-list">{this.state.cards}</div>
          {/* The sole purpose of this div is to allow scrolling to bottom */}
          <div
            style={{ float: "left", clear: "both" }}
            ref={node => (this.cardsListEnd = node)}
          />
        </List>
        <Button className={classes.addCard} onClick={this.addCard.bind(this)}>
          Add a card...
        </Button>
      </Paper>
    );
  }
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  onEditCard: PropTypes.func.isRequired
};

export default withStyles(styles)(View);
