import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useUser } from "@clerk/clerk-react";
import { useSession } from "@clerk/nextjs";
import React, { ReactChild } from "react";

const hasuraGraphqlApi = "https://solid-narwhal-13.hasura.app/v1/graphql";

export const ApolloProviderWrapper = ({
  children,
}: {
  children: ReactChild;
}) => {
  const { user } = useUser();
  const { session } = useSession();
  const authMiddleware = setContext(async (_, { headers }) => {
    const token = await session?.getToken({ template: "hasura" });
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
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
