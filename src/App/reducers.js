const rootReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_LIST":
      return {
        ...state,
        listBeingEdited: {
          id: action.id,
          topLeft: action.topLeft
        }
      };
    case "FINISH_EDIT_LIST":
      return { ...state, listBeingEdited: null };
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
