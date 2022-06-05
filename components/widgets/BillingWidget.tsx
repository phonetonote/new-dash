import { Box, Button, Skeleton, VStack } from "@chakra-ui/react";

import { Subscription } from "../../types/SubscriptionTypes";
import { SubscriptionBadge } from "./SubscriptionBadge";
import { SubscriptionLink } from "./SubscriptionLink";

type BillingWidgetProps = {
  user: { id: string };
  subscriptionLoading: boolean;
  stripeData: Subscription["stripe_data"];
};

export const BillingWdiget = (props: BillingWidgetProps) => {
  const { user, subscriptionLoading, stripeData } = props;

  const has_subscription =
    stripeData && !stripeData?.status?.includes("expired");

  return (
    <>
      <SubscriptionBadge
        loading={subscriptionLoading}
        status={stripeData?.status ?? "starter"}
        nickname={stripeData?.plan?.nickname ?? "free"}
      />
      <Skeleton isLoaded={!subscriptionLoading}>
        <VStack spacing="4" align="stretch">
          {has_subscription && (
            <Box>
              <SubscriptionLink clerkId={user.id} />
            </Box>
          )}

          {!has_subscription && (
            <Box>
              <Button
                as="a"
                href={`${process.env.NEXT_PUBLIC_OLD_MARKETING_SITE}/pages/pricing`}
              >
                view pricing
              </Button>
            </Box>
          )}
        </VStack>
      </Skeleton>
    </>
  );
};
