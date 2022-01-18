import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useUser } from "@clerk/clerk-react";
import React, { ReactChild } from "react";

const hasuraGraphqlApi = "https://solid-narwhal-13.hasura.app/v1/graphql";

export const ApolloProviderWrapper = ({
  children,
}: {
  children: ReactChild;
}) => {
  const user = useUser();
  const authMiddleware = setContext(async (_, { headers }) => {
    const token = await user.getToken("hasura");
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
        "x-hasura-admin-secret":
          "5adde4da04b639f6de55e6388af4b6ac9ba56a554cc0f81b239456abda1ccff5", //#TODO REMOVE THIS
      },
    };
  });

  const httpLink = new HttpLink({
    uri: hasuraGraphqlApi,
  });

  const apolloClient = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
