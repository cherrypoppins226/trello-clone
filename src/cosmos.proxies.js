/*
 * Cosmos proxies (https://github.com/react-cosmos/react-cosmos#proxies)
 */
import { createStore } from "redux";
import createReduxProxy from "react-cosmos-redux-proxy";
import { reducer } from "./App/redux";
import { isObjectEmpty } from "./App/utils";

// react-cosmos passes an empty object to the root reducer to get back the
// default state, but redux-actions will only return the default state if
// `undefined` is passed
const compatibleReducer = (state, action) =>
  reducer(isObjectEmpty(state) ? undefined : state, action);

export default [
  createReduxProxy({
    createStore: mockState => createStore(compatibleReducer, mockState)
  })
];
