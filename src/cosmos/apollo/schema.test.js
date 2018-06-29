import { execute as importedExecute } from "graphql";

import { schema, makeResolver, queries } from "./schema";

const execute = async (resolver, query, variables = {}) => {
  expect(query).not.toBeUndefined();
  const result = await importedExecute(
    schema,
    query,
    resolver,
    null,
    variables
  );
  if (result.errors) throw Error(result.errors);
  return result;
};

// Fixtures
const card = { id: 1, title: "Card" };
const list = { id: 1, title: "List", cards: [card] };
const lists = [list];
const store = { lists };

it("makeResolver doesn't throw with empty data", () => {
  expect(() => makeResolver()).not.toThrow();
});

const getCard = (resolver, id) =>
  execute(resolver, queries.card, { id }).then(result => result.data.card);

const getList = (resolver, id) =>
  execute(resolver, queries.list, { id }).then(result => result.data.list);

it("lists", async () => {
  const result = await execute(makeResolver(store), queries.lists);
  expect(result.data.lists).toEqual(lists);
});

it("list", async () => {
  await expect(getList(makeResolver(store), list.id)).resolves.toEqual(list);
});

it("card", async () => {
  await expect(getCard(makeResolver(store), card.id)).resolves.toEqual(card);
});

it("newCard", async () => {
  const resolver = makeResolver(store);
  await execute(resolver, queries.newCard, {
    listId: list.id,
    title: "Roses"
  });
  const cards = await getList(resolver, list.id).then(list => list.cards);
  expect(cards).toEqual([card, { id: card.id + 1, title: "Roses" }]);
});

it("updateList", async () => {
  const update = { title: "Violets" };
  const resolver = makeResolver(store);
  await execute(resolver, queries.updateList, { id: list.id, update });
  await expect(getList(resolver, list.id)).resolves.toEqual({
    ...list,
    ...update
  });
});

it("updateCard", async () => {
  const update = { title: "Violets" };
  const resolver = makeResolver(store);
  await execute(resolver, queries.updateCard, { id: card.id, update });
  await expect(getCard(resolver, card.id)).resolves.toEqual({
    ...card,
    ...update
  });
});

describe("moveCard", async () => {
  it("moves card from one list to another", async () => {
    const card2 = { id: 10, title: "Card2" };
    const list2 = { id: 10, title: "List2", cards: [card2] };
    const before = [list, list2];
    const moveCardVariables = {
      id: 1,
      listId: 10,
      index: 1
    };
    const after = [{ ...list, cards: [] }, { ...list2, cards: [card2, card] }];
    const resolver = makeResolver({ lists: before });

    const result = await execute(resolver, queries.moveCard, moveCardVariables);
    expect(result.data.moveCard).toEqual({ success: true });

    const lists = await execute(resolver, queries.lists);
    expect(lists.data.lists).toEqual(after);
  });

  it("doesn't move card from same position", async () => {
    const list2 = {
      id: 1,
      title: "List",
      cards: [
        { id: 1, title: "Card1" },
        { id: 2, title: "Card2" },
        { id: 3, title: "Card3" }
      ]
    };
    const moveCardVariables = {
      id: 2,
      listId: 1,
      index: 1
    };
    const resolver = makeResolver({ lists: [list2] });

    const result = await execute(resolver, queries.moveCard, moveCardVariables);
    expect(result.data.moveCard).toEqual({ success: true });

    const lists = await execute(resolver, queries.lists);
    expect(lists.data.lists).toEqual([list2]);
  });

  it("fails on invalid parameters", async () => {
    const invalidVariables = {
      id: 10,
      listId: 100,
      index: 100
    };
    const resolver = makeResolver(store);

    const result = await execute(resolver, queries.moveCard, invalidVariables);
    expect(result.data.moveCard).toEqual({ success: false });
  });
});
