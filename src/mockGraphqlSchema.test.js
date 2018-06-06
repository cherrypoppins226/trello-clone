import { graphql as importedGraphql } from "graphql";
import makeSchema from "./mockGraphqlSchema";

// Query helpers

const cardQueries = {};
cardQueries.fields = "id title";
cardQueries.get = "";

const listQueries = {};
listQueries.fields = `id title cards { ${cardQueries.fields} }`;
listQueries.get = id => `{ list(id: ${id}) { ${listQueries.fields} } }`;
listQueries.addCard = (listId, title) => `
  mutation {
    addCard(listId: ${listId}, title: "${title}") {
      ${cardQueries.fields}
    }
  }
`;

const listsQueries = {};
listsQueries.fields = `lists { ${listQueries.fields} }`;
listsQueries.get = `{ ${listsQueries.fields} }`;

const graphql = async (...args) => {
  const result = await importedGraphql(...args);
  if (result.errors) throw Error(result.errors);
  return result;
};

it("schema doesn't throw with empty data", () => {
  expect(() => makeSchema()).not.toThrow();
});

// Fixtures
const card = { id: 1, title: "Card" };
const list = { id: 1, title: "List", cards: [card] };
const lists = [list];
const store = { lists };

it("gets lists", async () => {
  const result = await graphql(makeSchema(store), listsQueries.get);
  expect(result.data.lists).toEqual(lists);
});

it("gets list", async () => {
  const result = await graphql(makeSchema(store), listQueries.get(list.id));
  expect(result.data.list).toEqual(list);
});

it("adds a card", async () => {
  const schema = makeSchema(store);
  await graphql(schema, listQueries.addCard(list.id, "Card2"));
  const result = await graphql(schema, listQueries.get(list.id));

  expect(result.data.list.cards).toHaveLength(list.cards.length + 1);
  expect(result.data.list.cards[0]).toEqual(card);
  expect(result.data.list.cards[1]).toEqual({
    id: card.id + 1,
    title: "Card2"
  });
});
