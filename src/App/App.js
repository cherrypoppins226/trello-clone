import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import Popover from "@material-ui/core/Popover";
import { connect } from "react-redux";
import _ from "lodash";
import { fileAbsolute } from "paths.macro";

import * as actions from "./actions";
import * as labels from "./labels";
import { moduleName } from "./utils";
import QuickEditCard from "./QuickEditCard";
import ActionsMenu from "./CardsList/ActionsMenu";
import EditCard from "./EditCard";
import CardsList from "./CardsList";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

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

class View extends React.Component {
  render() {
    // TODO: Remove when the list of cards is in the redux store
    const allCards = _.flatten(this.props.lists.map(list => list.cards));
    const cardBeingEditedObj = allCards.find(
      card => card.id === this.props.cardBeingEdited
    );
    const cardBeingQuickEditedObj = allCards.find(
      card => card.id === this.props.cardBeingQuickEdited
    );
    return (
      <div style={{ height: "100%" }}>
        <div className={this.props.classes.root}>
          {this.props.lists.map(list => (
            <CardsList key={list.id} list={list} />
          ))}
        </div>
        <div style={{ display: "none" }}>
          {Object.values(labels).map((obj, idx) => (
            <div id={obj.id} key={idx}>
              {obj.text}
            </div>
          ))}
        </div>
        <Popover
          anchorReference="anchorPosition"
          anchorPosition={
            this.props.listBeingEdited && this.props.listBeingEdited.topLeft
          }
          container={this}
          open={Boolean(this.props.listBeingEdited)}
          onClose={this.props.finishEditList}
          TransitionProps={{ timeout: 0 }}
          elevation={1}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <ActionsMenu />
        </Popover>
        <Modal
          container={this}
          open={Boolean(cardBeingQuickEditedObj)}
          onClose={this.props.finishQuickEditCard}
          BackdropProps={{ id: "quickEditCardBackdrop" }}
        >
          {cardBeingQuickEditedObj && (
            <QuickEditCard card={cardBeingQuickEditedObj} />
          )}
        </Modal>
        <Modal
          style={{ overflow: "auto" }}
          container={this}
          open={Boolean(cardBeingEditedObj)}
          onClose={this.props.finishEditCard}
          BackdropProps={{ id: "editCardBackdrop" }}
        >
          {cardBeingEditedObj && <EditCard card={cardBeingEditedObj} />}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listBeingEdited: state.listBeingEdited,
  cardBeingEdited: state.cardBeingEdited,
  cardBeingQuickEdited: state.cardBeingQuickEdited
});

const mapDispatchToProps = dispatch => ({
  finishEditList: () => dispatch(actions.finishEditList()),
  finishEditCard: () => dispatch(actions.finishEditCard()),
  finishQuickEditCard: () => dispatch(actions.finishQuickEditCard())
});

const Container = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(View)
);

Container.displayName = moduleName(fileAbsolute);

Container.propTypes = {
  lists: PropTypes.array.isRequired
};

export default Container;
