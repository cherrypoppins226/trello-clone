import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";

import mockData from "./mockData";

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

let lastCardId = mockData.lists
  .map(list => list.cards)
  .reduce((acc, cards) => acc.concat(cards), [])
  .map(card => card.id)
  .reduce((x, y) => Math.max(x, y), 0);

const findList = id => mockData.lists.find(list => list.id === id);

const resolvers = {
  Query: {
    lists: () => mockData.lists,
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

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
