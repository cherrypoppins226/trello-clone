import React from "react";
import Board from "./Board";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import Popover from "@material-ui/core/Popover";
import * as Labels from "./labels";
import QuickEditCard from "./QuickEditCard";
import ActionsMenu from "./CardsList/ActionsMenu";
import EditCard from "./EditCard";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

class App extends React.Component {
  state = {
    listBeingEdited: null,
    cardBeingEdited: null,
    cardBeingQuickEdited: null
  };

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Board
          lists={this.props.lists}
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
          open={Boolean(this.state.cardBeingQuickEdited)}
          onClose={_ => this.setState({ cardBeingQuickEdited: null })}
          BackdropProps={{ id: "quickEditCardBackdrop" }}
        >
          {this.state.cardBeingQuickEdited ? (
            <QuickEditCard card={this.state.cardBeingQuickEdited} />
          ) : null}
        </Modal>
        <Modal
          style={{ overflow: "auto" }}
          container={this}
          open={Boolean(this.state.cardBeingEdited)}
          onClose={_ => this.setState({ cardBeingEdited: null })}
          BackdropProps={{ id: "editCardBackdrop" }}
        >
          {this.state.cardBeingEdited ? (
            <EditCard card={this.state.cardBeingEdited} />
          ) : null}
        </Modal>
      </div>
    );
  }
}

export default App;
