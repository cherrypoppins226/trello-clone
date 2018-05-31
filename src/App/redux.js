import { bindActionCreators } from "redux";
import { handleActions, createActions } from "redux-actions";

const actions = createActions({
  CARDS_LIST: {
    START_EDIT: undefined,
    FINISH_EDIT: undefined
  },
  CARD: {
    ADD: undefined,
    START_EDIT: undefined,
    FINISH_EDIT: undefined,
    START_QUICK_EDIT: undefined,
    FINISH_QUICK_EDIT: undefined
  }
});

const recursiveBindActionCreators = (actionCreators, dispatch) => {
  const bound = {};

  Object.keys(actionCreators).forEach(key => {
    const creator = actionCreators[key];
    if (creator && typeof creator === "object") {
      bound[key] = recursiveBindActionCreators(creator, dispatch);
    } else if (typeof creator === "function") {
      bound[key] = bindActionCreators({ [key]: creator }, dispatch)[key];
    } else {
      throw Error(`Cannot bind to value of type: ${typeof creator}`);
    }
  });

  return bound;
};

// Convenient default that makes all actionCreators available under
// props.actions
export const mapDispatchToProps = dispatch => {
  return { actions: recursiveBindActionCreators(actions, dispatch) };
};

const nextCardId = cards =>
  cards.reduce((max, card) => Math.max(max, card.id), 0) + 1;

const reducersMap = {
  [actions.cardsList.startEdit]: (state, { payload }) => {
    return { ...state, listBeingEdited: payload };
  },

  [actions.cardsList.finishEdit]: state => {
    return { ...state, listBeingEdited: null };
  },

  [actions.card.add]: (state, { payload }) => {
    return {
      ...state,
      lists: state.lists.map(list => {
        if (list.id === payload.listId)
          return {
            ...list,
            cards: [
              ...list.cards,
              { id: nextCardId(list.cards), title: "Title..." }
            ]
          };
        return list;
      })
    };
  },

  [actions.card.startEdit]: (state, { payload }) => {
    return { ...state, cardBeingEdited: payload };
  },

  [actions.card.finishEdit]: state => {
    return { ...state, cardBeingEdited: null };
  },

  [actions.card.startQuickEdit]: (state, { payload }) => {
    return { ...state, cardBeingQuickEdited: payload };
  },

  [actions.card.finishQuickEdit]: state => {
    return { ...state, cardBeingQuickEdited: null };
  }
};

export const reducer = handleActions(reducersMap, {
  lists: [],
  listBeingEdited: null,
  cardBeingEdited: null,
  cardBeingQuickEdited: null
});
