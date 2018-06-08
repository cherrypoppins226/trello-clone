import { execute as importedExecute } from "graphql";

import { schema, makeResolver, queries } from "./schema";

const execute = async (resolver, query, variables = {}) => {
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

it("lists", async () => {
  const result = await execute(makeResolver(store), queries.lists);
  expect(result.data.lists).toEqual(lists);
});

it("list", async () => {
  const result = await execute(makeResolver(store), queries.list, {
    id: list.id
  });
  expect(result.data.list).toEqual(list);
});

it("addCard", async () => {
  const resolver = makeResolver(store);
  await execute(resolver, queries.addCard, {
    listId: list.id,
    title: "Roses"
  });
  const result = await execute(resolver, queries.list, { id: list.id });
  expect(result.data.list.cards).toEqual([
    card,
    { id: card.id + 1, title: "Roses" }
  ]);
});

it("updateList", async () => {
  const update = { title: "Violets" };
  const resolver = makeResolver(store);
  await execute(resolver, queries.updateList, { id: list.id, update });
  const result = await execute(resolver, queries.list, { id: list.id });
  expect(result.data.list).toEqual({ ...list, ...update });
});
