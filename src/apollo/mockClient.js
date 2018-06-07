import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";

import mockData from "./mockData";
import makeSchema from "./mockGraphqlSchema";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema: makeSchema(mockData) })
});

export default client;
