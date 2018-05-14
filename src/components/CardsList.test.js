import React from "react";
import { Simulate, fireEvent } from "react-testing-library";
import { render } from "../testHelpers.js";
import { LIST_ACTIONS_MENU_LABEL } from "./CardsList";

let CardsList = require("./CardsList").default;

jest.mock("./TextArea", () => () => "TextArea");
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

describe("adds a card", () => {
  beforeAll(() => {
    jest.unmock("./CardsListCard");
    jest.resetModules();
    CardsList = require("./CardsList").default;
  });

  afterAll(() => {
    jest.mock("./CardsListCard");
    jest.resetModules();
    CardsList = require("./CardsList").default;
  });

  it("test", () => {
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

describe("opens actions menu", () => {
  beforeAll(() => {
    jest.unmock("./CardsListActionsMenu");
    jest.resetModules();
    CardsList = require("./CardsList").default;
  });

  afterAll(() => {
    jest.mock("./CardsListActionsMenu");
    jest.resetModules();
    CardsList = require("./CardsList").default;
  });

  it("test", () => {
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

describe("title text area", () => {
  jest.unmock("./TextArea");
  jest.resetModules();
  CardsList = require("./CardsList").default;

  afterAll(() => {
    jest.mock("./TextArea");
    jest.resetModules();
    CardsList = require("./CardsList").default;
  });

  const { container } = render(
    <CardsList
      title="Title"
      cards={["card1", "card2"]}
      onEditCard={jest.fn()}
    />
  );

  const getTitle = node => node.querySelector("[role='heading']");

  const originalElem = getTitle(container);

  it("opens on title click", () => {
    Simulate.click(originalElem);
    expect(getTitle(container).tagName).toBe("TEXTAREA");
  });

  it("closes when clicked outside", () => {
    const click = new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    });
    fireEvent(document.body, click);
    expect(getTitle(container)).toEqual(originalElem);
  });
});
