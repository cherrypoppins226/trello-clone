const rootReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_CARD":
      return { ...state, cardBeingEdited: action.id };
    case "FINISH_EDIT_CARD":
      return { ...state, cardBeingEdited: null };
    case "QUICK_EDIT_CARD":
      return { ...state, cardBeingQuickEdited: action.id };
    case "FINISH_QUICK_EDIT_CARD":
      return { ...state, cardBeingQuickEdited: null };
    default:
      return state;
  }
};

export default rootReducer;
