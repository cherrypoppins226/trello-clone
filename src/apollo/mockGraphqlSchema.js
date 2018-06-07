import merge from "deepmerge";
import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Card {
    id: Int!
    title: String!
  }

  type CardsList {
    id: Int!
    title: String!
    cards: [Card!]!
  }

  type Query {
    list(id: Int!): CardsList!
    lists: [CardsList!]!
  }

  type Mutation {
    addCard(listId: Int!, title: String!): Card!
  }
`);

export const makeRootValue = (initialStore = { lists: [] }) => {
  const store = merge({}, initialStore);

  let lastCardId = store.lists
    .map(list => list.cards)
    .reduce((acc, cards) => acc.concat(cards), [])
    .map(card => card.id)
    .reduce((x, y) => Math.max(x, y), 0);

  const findList = id => store.lists.find(list => list.id === id);

  return {
    lists: () => store.lists,
    list: ({ id }) => findList(id),
    addCard: ({ listId, title }) => {
      const newCard = { id: ++lastCardId, title };
      const list = findList(listId);
      list.cards.push(newCard);
      return newCard;
    }
  };
};
