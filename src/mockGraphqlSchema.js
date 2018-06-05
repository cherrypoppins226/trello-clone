import faker from "faker";
import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";

faker.seed(1);

export const store = [];

let nextCardId = 1;

for (let i = 1; i < 7; i++) {
  const list = {
    id: i,
    title: faker.lorem.sentence(),
    cards: []
  };
  for (let j = 0; j < faker.random.number({ min: 2, max: 50 }); j++) {
    list.cards.push({
      id: nextCardId++,
      title: faker.lorem.sentence()
    });
  }
  store.push(list);
}

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

let lastCardId = store
  .map(list => list.cards)
  .reduce((acc, cards) => acc.concat(cards), [])
  .map(card => card.id)
  .reduce((x, y) => Math.max(x, y), 0);

const findList = id => store.find(list => list.id === id);

const resolvers = {
  Query: {
    lists: () => store,
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
