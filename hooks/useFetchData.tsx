import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import * as React from "react";
import { AggregateCount } from "../components/areas/DashboardArea";
import { dashboardQuery } from "../helpers/queries/dashboard-query";
import { Subscription } from "../types/SubscriptionTypes";

export type AllData = {
  subscriptions: Subscription[];
  totalMonthylMessages: AggregateCount;
  totalCount: AggregateCount;
  smsCount: AggregateCount;
  facebookCount: AggregateCount;
  facebookChannels: AggregateCount;
  alfredCount: AggregateCount;
  telegramCount: AggregateCount;
  zapierCount: AggregateCount;
  chromeCount: AggregateCount;
  emailCount: AggregateCount;
  telegramChannels: AggregateCount;
  roam_keys: {
    key: string;
  }[];
};

export const useFetchData = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    const { data, loading } = useQuery(dashboardQuery, {
      variables: {
        clerkId: user?.id,
      },
      pollInterval: 10000,
    });

    return { data, loading };
  }

  return {
    data: undefined,
    loading: false,
  };
};
