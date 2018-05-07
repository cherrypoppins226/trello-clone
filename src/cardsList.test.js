import React from "react";
import { shallow } from "./test/enzymeShallowUtils";
import CardsList from "./cardsList";

const title = "List title";
const cards = ["card1", "card2"];

it("initial render", () => {
  const tree = shallow(<CardsList title={title} cards={cards} />);
  expect(tree).toMatchSnapshot();
});
