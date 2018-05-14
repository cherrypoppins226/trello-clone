import React from "react";
import { Simulate } from "react-testing-library";
import { render } from "../testHelpers.js";
import CardsList, { LIST_ACTIONS_MENU_LABEL } from "./CardsList";

jest.mock("./CardsListCard", () => () => "CardsListCard");
jest.mock("./CardsListActionsMenu", () => () => "CardsListActionMenu");

const title = "List title";
const cards = ["card1", "card2"];

it("initial render", () => {
  const { container } = render(
    <CardsList title={title} cards={cards} onEditCard={jest.fn()} />
  );
  expect(container).toMatchSnapshot();
});

describe("", () => {
  beforeAll(() => {
    jest.unmock("./CardsListCard");
    jest.resetModules();
  });

  afterAll(() => {
    jest.mock("./CardsListCard");
    jest.resetModules();
  });

  it("adds a card", () => {
    const CardsList = require("./CardsList").default;
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

describe("", () => {
  beforeAll(() => {
    jest.unmock("./CardsListActionsMenu");
    jest.resetModules();
  });

  afterAll(() => {
    jest.mock("./CardsListActionsMenu");
    jest.resetModules();
  });

  it("opens actions menu", () => {
    const CardsList = require("./CardsList").default;
    const { container } = render(
      <CardsList
        title="Title"
        cards={["card1", "card2"]}
        onEditCard={jest.fn()}
      />
    );
    const actionsMenuButton = container.querySelector(
      `[aria-labelledby="${LIST_ACTIONS_MENU_LABEL}"]`
    );
    Simulate.click(actionsMenuButton);
    expect(document.body).toMatchSnapshot();
  });
});

it("opens edit title text area", () => {
  const CardsList = require("./CardsList").default;
  const { container } = render(
    <CardsList
      title="Title"
      cards={["card1", "card2"]}
      onEditCard={jest.fn()}
    />
  );
  const getTitle = node => node.querySelector("[role='heading']");
  Simulate.click(getTitle(container));
  expect(getTitle(container).tagName).toBe("TEXTAREA");
});
