import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const sleep = (duration: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const poll = async (
  promiseFn: { (): Promise<void>; (): any },
  duration: number
) => {
  try {
    const result = await promiseFn();
    // Validate result before invoking poll again
    await sleep(duration);
    await poll(promiseFn, duration);
  } catch (error) {
    console.error(error);
    // Handle error or retry here
  }
};

const usePollingFetch = (
  url: string,
  options: RequestInit | undefined,
  duration = 10000
) => {
  const [data, setData] = useState();
  const [error, setError] = useState<string>();
  const { getToken } = useAuth();

  useEffect(() => {
    poll(async () => {
      try {
        // const response = await fetch(url, options);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch data");
        // }

        const response = await fetch(url, {
          ...options,
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
    }, duration);
  }, [url, duration, options]);

  return { data, error };
};

export default usePollingFetch;
