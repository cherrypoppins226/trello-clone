/*
 * UI state shared by entire application.
 * It's a separate module to avoid cyclical imports
 */

import { observable, action, decorate } from "mobx";

class State {
  listBeingEdited = null;

  startListEdit = payload => (this.listBeingEdited = payload);

  finishListEdit = () => (this.listBeingEdited = null);

  cardBeingEdited = null;

  startCardEdit = payload => (this.cardBeingEdited = payload);

  finishCardEdit = () => (this.cardBeingEdited = null);

  cardBeingQuickEdited = null;

  startQuickCardEdit = payload => (this.cardBeingQuickEdited = payload);

  finishQuickCardEdit = () => (this.cardBeingQuickEdited = null);
}

decorate(State, {
  listBeingEdited: observable,
  startListEdit: action,
  finishListEdit: action,
  cardBeingEdited: observable,
  startCardEdit: action,
  finishCardEdit: action,
  cardBeingQuickEdited: observable,
  startQuickCardEdit: action,
  finishQuickCardEdit: action
});

export default State;
