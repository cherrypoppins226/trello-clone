export const addCard = listId => ({
  type: "ADD_CARD",
  listId
});

export const startEditList = (id, topLeft) => ({
  type: "START_EDIT_LIST",
  id,
  topLeft
});

export const finishEditList = () => ({
  type: "FINISH_EDIT_LIST"
});

export const startEditCard = id => ({
  type: "START_EDIT_CARD",
  id
});

export const finishEditCard = () => ({
  type: "FINISH_EDIT_CARD"
});

export const startQuickEditCard = id => ({
  type: "START_QUICK_EDIT_CARD",
  id
});

export const finishQuickEditCard = () => ({
  type: "FINISH_QUICK_EDIT_CARD"
});
