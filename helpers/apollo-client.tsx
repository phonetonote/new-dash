import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useUser } from "@clerk/clerk-react";
import { useAuth, useSession } from "@clerk/nextjs";
import React, { ReactChild } from "react";

const hasuraGraphqlApi = "https://solid-narwhal-13.hasura.app/v1/graphql";

export const ApolloProviderWrapper = ({
  children,
}: {
  children: ReactChild;
}) => {
  const { getToken } = useAuth();

  const httpLink = new HttpLink({
    uri: hasuraGraphqlApi,
  });

  const asyncAuthLink = setContext(async () => {
    const token = await getToken({ template: "hasura" });
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: asyncAuthLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
