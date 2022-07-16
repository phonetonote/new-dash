import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import { useSession } from "@clerk/nextjs";
import * as React from "react";
import { useEffect, useState } from "react";

interface ActionButtonProps extends ButtonProps {
  duration?: string;
  planName: string;
}

export const ActionButton = (props: ActionButtonProps) => {
  const correctScheme = useColorModeValue("ptnDarkGreen", "ptnLightGreen");
  const { duration = "month", planName, ...rest } = props;
  const { session } = useSession();
  const [token, setToken] = useState("");

  useEffect(() => {
    const generateAndSetToken = async () => {
      if (session) {
        const newToken = await session.getToken();

        if (newToken) {
          setToken(token);
        }
      }
    };
    if (!token) {
      generateAndSetToken();
    }
  }, [token]);

  return (
    <form
      action={`${process.env.NEXT_PUBLIC_APP_URL}/payments/create_checkout_session.json`}
      method="POST"
      id="create-checkout-session-form"
    >
      <input type="hidden" name="plan" value={planName} />
      <input type="hidden" name="duration" value={duration} />
      <input type="hidden" name="session_token" value={token} />
      <input type="hidden" name="session_id" value={session?.id} />

      <Button
        type="submit"
        colorScheme={`${correctScheme}`}
        size="lg"
        w="full"
        fontWeight="extrabold"
        py={{ md: "8" }}
        {...rest}
      />
    </form>
  );
};
