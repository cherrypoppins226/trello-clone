/* 
 * Cosmos proxies (https://github.com/react-cosmos/react-cosmos#proxies)
 */
import { createStore } from "redux";
import createReduxProxy from "react-cosmos-redux-proxy";
import reducer from "./App/reducers";

export default [
  createReduxProxy({
    createStore: mockState => createStore(reducer, mockState)
  })
];
