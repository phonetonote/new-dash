import { Box, Button } from "@chakra-ui/react";

type SubscriptionLinkProps = {
  clerkId: String;
};
export const SubscriptionLink = (props: SubscriptionLinkProps) => {
  const { clerkId } = props;

  return (
    <form
      target="_blank"
      method="POST"
      action={`https://app.phonetonote.com/payments/create_customer_portal_session?clerk_id=${clerkId}`}
    >
      <Button type="submit">manage billing</Button>
    </form>
  );
};
