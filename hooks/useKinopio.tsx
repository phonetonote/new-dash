import { useFormik } from "formik";
import * as React from "react";
import { useAuth } from "@clerk/nextjs";

type KinopioStatus = "idle" | "loading" | "submitting";

const KINOPIO_URL = `${process.env.NEXT_PUBLIC_APP_URL}/kinopios`;

const generateHeaders = (token: string) => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${token}`,
});

export const useKinopio = () => {
  const [status, setStatus] = React.useState<KinopioStatus>("loading");
  const [key, setKey] = React.useState<string | null>(null);
  const { getToken } = useAuth();

  const deleteForm = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      const asyncSubmit = async () => {
        const userToken = await getToken();

        if (!userToken) {
          return;
        }

        fetch(`${KINOPIO_URL}`, {
          method: "DELETE",
          headers: generateHeaders(userToken),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data?.kinopio?.masked_api_key?.length ?? 0 > 0) {
              setKey(data.kinopio.masked_api_key);
            } else {
              setKey(null);
            }
          })
          .finally(() => {
            setStatus("idle");
          });
      };

      asyncSubmit();
    },
  });
  const newForm = useFormik({
    initialValues: {
      kinopioApiKey: "",
    },
    onSubmit: (values) => {
      if ((values?.kinopioApiKey?.length ?? 0) < 1) {
        return;
      }

      const asyncSubmit = async () => {
        const userToken = await getToken();

        if (!userToken) {
          return;
        }

        fetch(KINOPIO_URL, {
          method: "POST",
          headers: generateHeaders(userToken),
          body: JSON.stringify({
            kinopio: {
              api_key: values.kinopioApiKey,
            },
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data?.kinopio?.masked_api_key?.length ?? 0 > 0) {
              setKey(data.kinopio.masked_api_key);
            }
          })
          .finally(() => {
            setStatus("idle");
          });
      };

      asyncSubmit();
    },
  });

  React.useEffect(() => {
    const loadAsync = async () => {
      const userToken = await getToken();

      if (!userToken) {
        return;
      }

      fetch(KINOPIO_URL, {
        method: "GET",
        headers: generateHeaders(userToken),
      })
        .then((r) => r.json())
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
  }, [getToken]);

  return {
    kiniopioStatus: status,
    deleteForm,
    newForm,
    kinopioKey: key,
  };
};
