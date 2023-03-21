import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { dashboardQuery } from "../helpers/queries/dashboard-query";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Subscription } from "../types/SubscriptionTypes";

const STRIPE_URL =
  "https://app.phonetonote.com/payments/user-subscription-data";

export const useFetchSubscriptionData = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<Subscription | null>(
    null
  );
  const getStripeDataAsync = async () => {
    const response = await fetch(STRIPE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getToken()}}`,
      },
    });
    const res: Subscription = await response.json();
    setLoading(false);
    setSubscriptionData(res);
  };

  getStripeDataAsync();

  return { subscriptionData, loading };
};
