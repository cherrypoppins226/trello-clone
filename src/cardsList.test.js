import React from "react";
import { render } from "./testHelpers.js";
import CardsList from "./cardsList";

jest.mock("./cardsListCard", () => () => "CardsListCard");

const title = "List title";
const cards = ["card1", "card2"];

it("initial render", () => {
  const { container } = render(<CardsList title={title} cards={cards} />);
  expect(container).toMatchSnapshot();
});
