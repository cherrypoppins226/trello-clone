import React from "react";
import PropTypes from "prop-types";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import Popover from "@material-ui/core/Popover";
import { connect } from "react-redux";
import _ from "lodash";

import Board from "./Board";
import { finishQuickEditCard, finishEditCard } from "./actions";
import * as Labels from "./labels";
import QuickEditCard from "./QuickEditCard";
import ActionsMenu from "./CardsList/ActionsMenu";
import EditCard from "./EditCard";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

class App extends React.Component {
  state = {
    listBeingEdited: null
  };

  render() {
    // TODO: Remove when the list of cards is in the redux store
    const allCards = _.flatten(this.props.lists.map(list => list.cards));
    const cardBeingEdited = allCards.find(
      card => card.id === this.props.cardBeingEdited
    );
    const cardBeingQuickEdited = allCards.find(
      card => card.id === this.props.cardBeingQuickEdited
    );
    return (
      <div style={{ height: "100%" }}>
        <Board
          lists={this.props.lists}
          onEditList={list => this.setState({ listBeingEdited: list })}
        />
        <div style={{ display: "none" }}>
          {Object.values(Labels).map((obj, idx) => (
            <div id={obj.id} key={idx}>
              {obj.text}
            </div>
          ))}
        </div>
        <Popover
          anchorEl={this.state.listBeingEdited}
          container={this}
          open={Boolean(this.state.listBeingEdited)}
          onClose={_ => this.setState({ listBeingEdited: null })}
          TransitionProps={{ timeout: 0 }}
          elevation={1}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <ActionsMenu
            onMenuItemClick={_ => this.setState({ listBeingEdited: null })}
          />
        </Popover>
        <Modal
          container={this}
          open={Boolean(cardBeingQuickEdited)}
          onClose={this.props.finishQuickEditCard}
          BackdropProps={{ id: "quickEditCardBackdrop" }}
        >
          {cardBeingQuickEdited && (
            <QuickEditCard card={cardBeingQuickEdited} />
          )}
        </Modal>
        <Modal
          style={{ overflow: "auto" }}
          container={this}
          open={Boolean(cardBeingEdited)}
          onClose={this.props.finishEditCard}
          BackdropProps={{ id: "editCardBackdrop" }}
        >
          {cardBeingEdited && <EditCard card={cardBeingEdited} />}
        </Modal>
      </div>
    );
  }
}

App.propTypes = {
  lists: PropTypes.array.isRequired,
  cardBeingEdited: PropTypes.number,
  cardBeingQuickEdited: PropTypes.number
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  finishEditCard: () => dispatch(finishEditCard()),
  finishQuickEditCard: () => dispatch(finishQuickEditCard())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
