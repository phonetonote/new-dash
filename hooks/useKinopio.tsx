import { useFormik } from "formik";
import * as React from "react";
import { useAuth } from "@clerk/nextjs";

type KinopioStatus = "idle" | "loading" | "submitting";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const useKinopio = () => {
  const [status, setStatus] = React.useState<KinopioStatus>("loading");
  const [key, setKey] = React.useState<string | null>(null);
  const { getToken } = useAuth();
  const [userToken, setUserToken] = React.useState<string | null>(null);

  const kinopioForm = useFormik({
    initialValues: {
      kinopioApiKey: "",
    },
    onSubmit: (values) => {
      if ((values?.kinopioApiKey?.length ?? 0) < 1 || !userToken) {
        return;
      }

      fetch(`${APP_URL}/kinopios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          kinopio: {
            api_key: values.kinopioApiKey,
          },
        }),
      })
        .then((r) => {
          if (r.ok) {
            return r.json();
          }
        })
        .then((data) => {
          if (data?.kinopio?.masked_api_key?.length ?? 0 > 0) {
            setKey(data.kinopio.masked_api_key);
          }
        })
        .finally(() => {
          setStatus("idle");
        });
    },
  });

  React.useEffect(() => {
    const loadtokenAsync = async () => {
      const token = await getToken();
      setUserToken(token);
    };

    loadtokenAsync();
  }, [getToken, setUserToken]);

  React.useEffect(() => {
    const loadAsync = async () => {
      if (!userToken) {
        return;
      }

      fetch(`${APP_URL}/kinopios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
      })
        .then((r) => {
          if (r.ok) {
            return r.json();
          }
        })
        .then((data) => {
          if (data?.kinopio?.masked_api_key?.length ?? 0 > 0) {
            setKey(data.kinopio.masked_api_key);
          }
        })
        .finally(() => {
          setStatus("idle");
        });
    };

    loadAsync();
  }, [userToken]);

  return {
    kiniopioStatus: status,
    kinopioForm,
    kinopioKey: key,
  };
};
