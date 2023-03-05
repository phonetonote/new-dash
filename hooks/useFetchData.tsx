import { useQuery } from "@apollo/client";
import usePollingFetch from "./usePollingFetch";
import { useUser } from "@clerk/nextjs";
import { dashboardQuery } from "../helpers/queries/dashboard-query";
import { Subscription } from "../types/SubscriptionTypes";

export const useFetchData = () => {
  const { user } = useUser();
  const { data, loading } = useQuery(dashboardQuery, {
    variables: {
      clerkId: user?.id,
    },
    pollInterval: 10000,
  });

  const { data: stripeData }: { data?: Subscription; error?: string } =
    usePollingFetch(
      "https://app.phonetonote.com/payments/user-subscription-data",
      {}
    );

  console.log("stripeData", stripeData);

  if (data) {
    data["stripeData"] = stripeData;
  }

  return { data, loading };
};
