import gql from "graphql-tag";
import merge from "deepmerge";
import { makeExecutableSchema } from "graphql-tools";

const typeDefs = gql`
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
`;

const makeResolvers = (initialStore = { lists: [] }) => {
  const store = merge({}, initialStore);

  let lastCardId = store.lists
    .map(list => list.cards)
    .reduce((acc, cards) => acc.concat(cards), [])
    .map(card => card.id)
    .reduce((x, y) => Math.max(x, y), 0);

  const findList = id => store.lists.find(list => list.id === id);

  return {
    Query: {
      lists: () => store.lists,
      list: (obj, args, context) => {
        return findList(args.id);
      }
    },
    Mutation: {
      addCard: (obj, args, context) => {
        const newCard = { id: ++lastCardId, title: args.title };
        const list = findList(args.listId);
        list.cards.push(newCard);
        return newCard;
      }
    }
  };
};

const makeSchema = (initialStore, options = {}) =>
  makeExecutableSchema({
    ...options,
    typeDefs,
    resolvers: makeResolvers(initialStore)
  });

export default makeSchema;
