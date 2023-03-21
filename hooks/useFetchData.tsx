import { useQuery } from "@apollo/client";
import usePollingFetch from "./useFetchStripeData";
import { useUser } from "@clerk/nextjs";
import { dashboardQuery } from "../helpers/queries/dashboard-query";
import { Subscription } from "../types/SubscriptionTypes";
import useFetchStripeData from "./useFetchStripeData";

export const useFetchData = () => {
  const { user } = useUser();
  const { data, loading } = useQuery(dashboardQuery, {
    variables: {
      clerkId: user?.id,
    },
    pollInterval: 20000,
  });

  const { data: stripeData }: { data?: Subscription; error?: string } =
    useFetchStripeData();

  if (data) {
    data["extraStripeData"] = stripeData;
  }

  return { data, loading };
};
