import { render as renderer } from "react-testing-library";
import { createContext } from "react-cosmos-loader";

export const render = (fixture, proxies = []) => {
  const { mount, ...context } = createContext({ renderer, fixture, proxies });

  return (async () => {
    await mount();
    return { ...context.getWrapper(), ...context, rerender: mount };
  })();
};

export const NativeEvents = {
  mouse: {
    click: new MouseEvent("click", { bubbles: true, cancelable: true })
  }
};

export const getByRole = (node, role) => {
  return node.querySelector(`[role="${role}"]`);
};

export const getByAriaLabelled = (node, id) => {
  return node.querySelector(`[aria-labelledby="${id}"]`);
};

export const getByAriaDescribed = (node, id) => {
  return node.querySelector(`[aria-describedby="${id}"]`);
};
