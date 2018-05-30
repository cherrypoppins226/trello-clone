export const addCard = listId => ({
  type: "ADD_CARD",
  listId
});

export const startEditList = (id, anchorElementBox) => ({
  type: "START_EDIT_LIST",
  id,
  anchorElementBox
});

export const finishEditList = () => ({
  type: "FINISH_EDIT_LIST"
});

export const startEditCard = (id, title) => ({
  type: "START_EDIT_CARD",
  id,
  title
});

export const finishEditCard = () => ({
  type: "FINISH_EDIT_CARD"
});

export const startQuickEditCard = (id, title, anchorElementBox) => ({
  type: "START_QUICK_EDIT_CARD",
  id,
  title,
  anchorElementBox
});

export const finishQuickEditCard = () => ({
  type: "FINISH_QUICK_EDIT_CARD"
});
