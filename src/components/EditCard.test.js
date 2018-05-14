import React from "react";
import { render } from "../testHelpers.js";
import EditCard from "./EditCard";
import CardListCard from "./CardsListCard";

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
