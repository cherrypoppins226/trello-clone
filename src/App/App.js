import React from "react";
import Board from "./Board";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import Popover from "@material-ui/core/Popover";
import * as Labels from "./labels";
import QuickEditCard from "./QuickEditCard";
import ActionsMenu from "./CardsList/ActionsMenu";
import EditCard from "./EditCard";
import { cardDescription } from "./CardsList/Card";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

const styles = {
  cardsListActionsPopover: {
    backgroundColor: "transparent"
  }
};

class App extends React.Component {
  state = {
    listBeingEdited: null,
    cardBeingEdited: null,
    cardBeingQuickEdited: null
  };

  render() {
    const { classes, lists } = this.props;
    const cardTitle = (v => (v ? cardDescription(v) : ""))(
      this.state.cardBeingEdited || this.state.cardBeingQuickEdited
    );
    return (
      <>
        <Board
          lists={lists}
          onEditList={list => this.setState({ listBeingEdited: list })}
          onEditCard={card => this.setState({ cardBeingEdited: card })}
          onQuickEditCard={card =>
            this.setState({ cardBeingQuickEdited: card })
          }
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
          container={this.parent}
          open={Boolean(this.state.listBeingEdited)}
          onClose={_ => this.setState({ listBeingEdited: null })}
          TransitionProps={{ timeout: 0 }}
          elevation={1}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{ classes: { root: classes.cardsListActionsPopover } }}
        >
          <ActionsMenu
            onMenuItemClick={_ => this.setState({ listBeingEdited: null })}
          />
        </Popover>
        <Modal
          container={this.parent}
          open={Boolean(this.state.cardBeingQuickEdited)}
          onClose={_ => this.setState({ cardBeingQuickEdited: null })}
          BackdropProps={{ id: "quickEditCardBackdrop" }}
        >
          <QuickEditCard
            title={cardTitle}
            anchorEl={this.state.cardBeingQuickEdited}
          />
        </Modal>
        <Modal
          style={{ overflow: "auto" }}
          container={this.parent}
          open={Boolean(this.state.cardBeingEdited)}
          onClose={_ => this.setState({ cardBeingEdited: null })}
          BackdropProps={{ id: "editCardBackdrop" }}
        >
          <EditCard title={cardTitle} />
        </Modal>
      </>
    );
  }
}

const View = withStyles(styles)(App);

export default View;
