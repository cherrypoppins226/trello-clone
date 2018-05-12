import React from "react";
import { render } from "./testHelpers.js";
import CardsListActionsMenu from "./cardsListActionsMenu";

it("initial render", () => {
  const container = render(<div />).container.firstElementChild;
  render(
    <CardsListActionsMenu
      anchor={container}
      container={container}
      onClose={jest.fn()}
    />
  );
  expect(container.firstElementChild).not.toBe(null);
  expect(container).toMatchSnapshot();
});
