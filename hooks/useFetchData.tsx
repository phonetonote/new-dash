import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { dashboardQuery } from "../helpers/queries/dashboard-query";
import { useAuth } from "@clerk/nextjs";

const STRIPE_URL =
  "https://app.phonetonote.com/payments/user-subscription-data";

export const useFetchData = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { data, loading } = useQuery(dashboardQuery, {
    variables: {
      clerkId: user?.id,
    },
    pollInterval: 20000,
  });

  return { data, loading };
};
