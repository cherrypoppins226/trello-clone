import React from "react";
import { render } from "./testHelpers.js";
import EditCard from "./editCard";
import CardListCard from "./cardsListCard";

it("initial render", () => {
  const { container } = render(<div />);
  render(
    <EditCard
      card={render(<CardListCard onEditCard={jest.fn()} />).container}
      container={container}
      onClose={jest.fn()}
    />
  );
  expect(container).toMatchSnapshot();
});
