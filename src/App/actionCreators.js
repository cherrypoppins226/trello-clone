const { bindActionCreators } = require("redux");

module.exports.addCard = listId => ({
  type: "ADD_CARD",
  listId
});

module.exports.startEditList = (id, anchorElementBox) => ({
  type: "START_EDIT_LIST",
  id,
  anchorElementBox
});

module.exports.finishEditList = () => ({
  type: "FINISH_EDIT_LIST"
});

module.exports.startEditCard = (id, title) => ({
  type: "START_EDIT_CARD",
  id,
  title
});

module.exports.finishEditCard = () => ({
  type: "FINISH_EDIT_CARD"
});

module.exports.startQuickEditCard = (id, title, anchorElementBox) => ({
  type: "START_QUICK_EDIT_CARD",
  id,
  title,
  anchorElementBox
});

module.exports.finishQuickEditCard = () => ({
  type: "FINISH_QUICK_EDIT_CARD"
});

// Convenient default that makes all actionCreators available under
// props.actions
module.exports.mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(module.exports, dispatch)
});
