/*
 * This module assumes DOM API globals such as those provided by jsdom are set.
 * E.g. window, document, ...
 */

import { render as renderer } from "react-testing-library";
import { createContext } from "react-cosmos-loader";

export const render = (fixture, proxies = []) => {
  const { mount, ...context } = createContext({ renderer, fixture, proxies });

  return (async () => {
    await mount();
    return { ...context.getWrapper(), ...context, rerender: mount };
  })();
};
