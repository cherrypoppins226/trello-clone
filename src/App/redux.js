import { bindActionCreators } from "redux";
import { handleActions, createActions } from "redux-actions";

const nop = () => {};

const actions = createActions({
  ADD_CARD: listId => ({ listId }),

  START_EDIT_LIST: (id, anchorElementBox) => ({
    id,
    anchorElementBox
  }),

  FINISH_EDIT_LIST: nop,

  START_EDIT_CARD: (id, title) => ({
    id,
    title
  }),

  FINISH_EDIT_CARD: nop,

  START_QUICK_EDIT_CARD: (id, title, anchorElementBox) => ({
    id,
    title,
    anchorElementBox
  }),

  FINISH_QUICK_EDIT_CARD: nop
});

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
    return { ...state, listBeingEdited: { ...payload } };
  },

  [actions.finishEditList]: state => {
    return { ...state, listBeingEdited: null };
  },

  [actions.startEditCard]: (state, { payload }) => {
    return { ...state, cardBeingEdited: { ...payload } };
  },

  [actions.finishEditCard]: state => {
    return { ...state, cardBeingEdited: null };
  },

  [actions.startQuickEditCard]: (state, { payload }) => {
    return { ...state, cardBeingQuickEdited: { ...payload } };
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
