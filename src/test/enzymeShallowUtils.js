import { shallow as enzymeShallow } from "enzyme";

export const shallow = component => enzymeShallow(component).dive();

export const mockEvent = { preventDefault: () => {} };

const containsText = text => node => {
  return node
    .text()
    .toLowerCase()
    .includes(text.toLowerCase());
};

const shortestText = (previous, node) => {
  return node.text().length < previous.text().length ? node : previous;
};

export const findByText = (text, node) => {
  return node
    .findWhere(containsText(text))
    .map(node => (node.name() === null ? node.parent() : node))
    .reduce(shortestText);
};

export const testId = id => `[data-testid="${id}"]`;
export const ariaLabel = label => `[aria-label="${label}"]`;
export const ariaLabelledBy = label => `[aria-labelledby="${label}"]`;
