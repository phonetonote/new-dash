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
  emailCount: AggregateCount;
  telegramChannels: AggregateCount;
  roam_keys: {
    key: string;
  }[];
};

export const useFetchData = () => {
  const user = useUser();

  const {
    data,

    loading,
  }: {
    data?: AllData;
    loading: boolean;
  } = useQuery(dashboardQuery, {
    variables: {
      clerkId: user.id,
    },
    pollInterval: 2000,
  });

  return { data, loading };
};
