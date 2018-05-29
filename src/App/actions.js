export const addCard = listId => ({
  type: "ADD_CARD",
  listId
});

export const editList = (id, topLeft) => ({
  type: "EDIT_LIST",
  id,
  topLeft
});

export const finishEditList = () => ({
  type: "FINISH_EDIT_LIST"
});

export const editCard = id => ({
  type: "EDIT_CARD",
  id
});

export const finishEditCard = () => ({
  type: "FINISH_EDIT_CARD"
});

export const quickEditCard = id => ({
  type: "QUICK_EDIT_CARD",
  id
});

export const finishQuickEditCard = () => ({
  type: "FINISH_QUICK_EDIT_CARD"
});
