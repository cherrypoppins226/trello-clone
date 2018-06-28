import { Simulate, render, getByText } from "react-testing-library";

import { fixtures, labels } from "./NewCard";
import { labelledBy } from "../../utils";
import mount from "../../cosmos/mount";
import client from "../../cosmos/apollo/client";
import { queries } from "../../cosmos/apollo/schema";

const getCards = () =>
  client
    .query({
      query: queries.list,
      variables: { id: fixtures.default.props.cardBeingAdded.listId }
    })
    .then(({ data }) => data.list.cards);

it("abandons changes on close button / escape key", async () => {
  const { container } = await mount(render, fixtures.default);
  const cardsBefore = await getCards();
  container.querySelector("textarea").value = "New Card";

  Simulate.click(container.querySelector(labelledBy(labels.close.id)));
  await expect(getCards()).resolves.toEqual(cardsBefore);

  Simulate.keyDown(container.querySelector("textarea"), { key: "Escape" });
  await expect(getCards()).resolves.toEqual(cardsBefore);
});

it("saves new card on add button / enter key", async () => {
  const { container } = await mount(render, fixtures.default);
  const findCard = title => cards => cards.find(c => c.title === title);

  container.querySelector("textarea").value = "Violets";
  Simulate.click(getByText(container, "Add"));
  await expect(
    getCards().then(findCard("Violets"))
  ).resolves.not.toBeUndefined();

  container.querySelector("textarea").value = "Roses";
  Simulate.keyDown(container.querySelector("textarea"), { key: "Enter" });
  await expect(getCards().then(findCard("Roses"))).resolves.not.toBeUndefined();
});
