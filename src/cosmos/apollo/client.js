import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";

import data from "./data";
import { schema, makeResolver } from "./schema";

export default new ApolloClient({
  cache: new InMemoryCache(),
  /*
  If an "apollo" key is defined in a cosmos fixture, this link will get replaced
  by a mock link which simply returns objects specified in the fixture
  (https://github.com/react-cosmos/react-cosmos#react-apollo-graphql).

  It's better to not mock return values with cosmos since this link includes a
  full graphql execution environment which will validate our queries.
  */
  link: new SchemaLink({ schema, rootValue: makeResolver(data) })
});
