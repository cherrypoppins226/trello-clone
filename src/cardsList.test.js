import React from "react";
import { Simulate } from "react-testing-library";
import { render } from "./testHelpers.js";
import CardsList from "./cardsList";

jest.mock("./cardsListCard", () => () => "CardsListCard");

const title = "List title";
const cards = ["card1", "card2"];

it("initial render", () => {
  const { container } = render(
    <CardsList title={title} cards={cards} onEditCard={jest.fn()} />
  );
  expect(container).toMatchSnapshot();
});

describe("adds a card", () => {
  beforeAll(() => {
    jest.unmock("./cardsListCard");
    jest.resetModules();
  });

  afterAll(() => {
    jest.mock("./cardsListCard");
    jest.resetModules();
  });

  it("", () => {
    const CardsList = require("./cardsList").default;
    const { getByText, getByTestId } = render(
      <CardsList
        title="Title"
        cards={["card1", "card2"]}
        onEditCard={jest.fn()}
      />
    );
    const liveList = getByTestId("cards-list");
    const countBefore = liveList.childElementCount;
    const lastBefore = liveList.lastElementChild;
    Simulate.click(getByText("Add a card..."));
    expect(liveList.childElementCount).toBe(countBefore + 1);
    expect(liveList.lastElementChild).not.toBe(lastBefore);
    expect(liveList.lastElementChild.tagName).toBe(lastBefore.tagName);
  });
});
