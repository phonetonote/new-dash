import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import type { AllData } from "../components/widgets/ChannelStatus"; // Import the AllData type

export const useFetchData = () => {
  const { user } = useUser();
  const [data, setData] = useState<AllData | undefined>(undefined); // Use AllData type
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      if (!user) return;

      try {
        const token = await getToken();
        if (!token) return; // Ensure token is available

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result: AllData | undefined = await response.json();

        if (!result) {
          throw new Error("Error: Response body is undefined");
        }

        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(undefined); // Reset data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up polling to refresh data every 20 seconds
    intervalId = setInterval(fetchData, 20000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [getToken, user]);

  return { data, loading };
};
