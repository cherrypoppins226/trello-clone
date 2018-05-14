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

describe("cards list", () => {
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

  it("adds a card", () => {
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

describe("actions menu", () => {
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

  it("opens", () => {
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
  let container = null,
    getTitle = null,
    originalElem = null;

  beforeAll(() => {
    jest.unmock("./TextArea");
    jest.resetModules();
    CardsList = require("./CardsList").default;
    container = render(
      <CardsList
        title="Title"
        cards={["card1", "card2"]}
        onEditCard={jest.fn()}
      />
    ).container;
    getTitle = node => node.querySelector("[role='heading']");
    originalElem = getTitle(container);
  });

  afterAll(() => {
    jest.mock("./TextArea");
    jest.resetModules();
    CardsList = require("./CardsList").default;
  });

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
