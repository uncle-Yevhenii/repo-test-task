import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const graphqlUri =
  import.meta.env.VITE_GRAPHQL_API_URL || "http://localhost:3001";

const httpLink = new HttpLink({
  uri: `${graphqlUri}/graphql`,
});

const authLink = new SetContextLink((_, prevContext) => {
  const username = localStorage.getItem("username");

  return {
    ...prevContext,
    headers: {
      "x-user-name": username || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
