import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloLink, concat } from "@apollo/client";

import { useUser } from "@clerk/clerk-react";
import { useSession } from "@clerk/nextjs";
import React, { ReactChild } from "react";

const hasuraGraphqlApi = "https://solid-narwhal-13.hasura.app/v1/graphql";

export const ApolloProviderWrapper = ({
  children,
}: {
  children: ReactChild;
}) => {
  const { session } = useSession();

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = session?.getToken({ template: "hasura" });

    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: hasuraGraphqlApi,
  });

  const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
