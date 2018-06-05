/*
 * This module assumes DOM API globals such as those provided by jsdom are set.
 * E.g. window, document, ...
 */

import * as testingLibrary from "react-testing-library";
import { createContext } from "react-cosmos-loader";

import proxies from "../cosmosProxies";

const customRender = (renderer, fixture) => {
  const { mount, ...context } = createContext({ renderer, fixture, proxies });

  return (async () => {
    await mount();
    return { ...context.getWrapper(), ...context, rerender: mount };
  })();
};

export const render = fixture => customRender(testingLibrary.render, fixture);

export const renderIntoDocument = fixture =>
  customRender(testingLibrary.renderIntoDocument, fixture);
