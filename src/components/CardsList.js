import React from "react";
import path from "path";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import grey from "material-ui/colors/grey";
import PropTypes from "prop-types";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import CardsListCard from "./CardsListCard";
import CardsListActionsMenu from "./CardsListActionsMenu";
import TextArea from "./TextArea";

const styles = {
  container: {
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
      height: "100%"
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

export const LIST_ACTIONS_MENU_LABEL = "open-list-actions-menu";

const View = class extends React.Component {
  constructor(props) {
    super(props);
    this.openActionsMenu = this.openActionsMenu.bind(this);
    this.closeActionsMenu = this.closeActionsMenu.bind(this);
    this.state = {
      titleBeingEdited: false,
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
    const titleProps = this.state.titleBeingEdited
      ? {
          component: TextArea,
          value: title,
          onClose: _ => this.setState({ titleBeingEdited: false })
        }
      : {
          onClick: _ => this.setState({ titleBeingEdited: true }),
          children: title
        };
    return (
      <Paper component="section" elevation={1} className={classes.container}>
        <div className={classes.listHeader}>
          <Typography role="heading" {...titleProps} />
          <button
            onClick={this.openActionsMenu}
            aria-labelledby={LIST_ACTIONS_MENU_LABEL}
            aria-owns={this.state.actionsMenuAnchor ? "cardlist-actions" : null}
            aria-haspopup={true}
          >
            <MoreHoriz />
          </button>
          <CardsListActionsMenu
            id="cardlist-actions"
            onClose={this.closeActionsMenu}
            anchor={this.state.actionsMenuAnchor}
          />
        </div>
        <div style={{ overflowY: "scroll" }}>
          <ul data-testid="cards-list">{this.state.cards}</ul>
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
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  onEditCard: PropTypes.func.isRequired
};

View.displayName = path.basename(__filename, path.extname(__filename));

export default withStyles(styles)(View);
