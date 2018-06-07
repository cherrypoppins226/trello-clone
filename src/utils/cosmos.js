/*
 * This module assumes DOM API globals such as those provided by jsdom are set.
 * E.g. window, document, ...
 */

import * as testingLibrary from "react-testing-library";
import { createContext } from "react-cosmos-loader";

import proxies from "../cosmos/proxies";

const customRender = renderer => (fixture, clearPrevInstance = true) => {
  // { mount, unmount, getRef, getWrapper, get } = context
  const context = createContext({ renderer, fixture, proxies });

  /*
  From https://github.com/react-cosmos/react-cosmos/blob/master/packages/react-cosmos-loader/src/create-context.js

      Important: Because some proxies are global by nature (eg. fetch-proxy
      mocks window.fetch) there can only be one active context per page. This
      means that mounting a new context will unmount the previous automatically.

  Which means that in:

    const container1 = await context1.mount().getWrapper().container;
    const container2 = await context2.mount().getWrapper().container;

  container1 will get unmounted.

  However, we can hijack the clearPrevInstance argument of mount to bypass this
  behavior
  */
  return (async () => {
    await context.mount(clearPrevInstance);
    // { container, debug, rerender, unmount, getBy..., queryBy... } = wrapper
    const wrapper = context.getWrapper();
    return { ...wrapper, ...context };
  })();
};

export const render = customRender(testingLibrary.render);

export const renderIntoDocument = customRender(
  testingLibrary.renderIntoDocument
);
