import { bindActionCreators } from "redux";
import { handleActions, createActions } from "redux-actions";

const identity = args => args;

const makeActions = actionNames => {
  const obj = {};
  actionNames.forEach(name => (obj[name] = identity));
  return createActions(obj);
};

const actions = makeActions([
  "ADD_CARD",
  "START_EDIT_LIST",
  "FINISH_EDIT_LIST",
  "START_EDIT_CARD",
  "FINISH_EDIT_CARD",
  "START_QUICK_EDIT_CARD",
  "FINISH_QUICK_EDIT_CARD"
]);

// Convenient default that makes all actionCreators available under
// props.actions
export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

const nextCardId = cards =>
  cards.reduce((max, card) => Math.max(max, card.id), 0) + 1;

const reducersMap = {
  [actions.addCard]: (state, { payload }) => {
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

  [actions.startEditList]: (state, { payload }) => {
    return { ...state, listBeingEdited: payload };
  },

  [actions.finishEditList]: state => {
    return { ...state, listBeingEdited: null };
  },

  [actions.startEditCard]: (state, { payload }) => {
    return { ...state, cardBeingEdited: payload };
  },

  [actions.finishEditCard]: state => {
    return { ...state, cardBeingEdited: null };
  },

  [actions.startQuickEditCard]: (state, { payload }) => {
    return { ...state, cardBeingQuickEdited: payload };
  },

  [actions.finishQuickEditCard]: state => {
    return { ...state, cardBeingQuickEdited: null };
  }
};

export const reducer = handleActions(reducersMap, {
  lists: [],
  listBeingEdited: null,
  cardBeingEdited: null,
  cardBeingQuickEdited: null
});
