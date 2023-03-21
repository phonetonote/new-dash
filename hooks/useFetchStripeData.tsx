import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const STRIPE_URL =
  "https://app.phonetonote.com/payments/user-subscription-data";

const useFetchStripeData = () => {
  const [data, setData] = useState();
  const [error, setError] = useState<string>();
  const { getToken } = useAuth();

  useEffect(() => {
    const doFetchAsync = async () => {
      try {
        const response = await fetch(STRIPE_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await getToken()}}`,
          },
        });
        const responseData = await response.json();
        setData(responseData);
      } catch (caughtError) {
        setError(`${caughtError}`);
      }
    };

    doFetchAsync();
  }, [getToken]);

  return { data, error };
};

export default useFetchStripeData;
