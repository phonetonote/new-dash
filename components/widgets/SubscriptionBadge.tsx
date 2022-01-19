import { Badge, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

type SubscriptionBadgeProps = {
  data: {
    subscriptions: {
      stripe_data: {
        plan: {
          product: {
            name: string;
          };
          nickname: string;
        };
        status: string;
      };
    }[];
  };
  loading: boolean;
};

export type PTRDuration = "month" | "year";
export type PaidPlan = "standard" | "pro";
export type Plan = PaidPlan | "free" | "enterprise";

export const SubscriptionBadge = (props: SubscriptionBadgeProps) => {
  const { data, loading } = props;

  const liveSubscription =
    data &&
    data.subscriptions &&
    data.subscriptions.length > 0 &&
    data.subscriptions[0].stripe_data
      ? data.subscriptions[0]
      : undefined;

  const currentPlan: Plan = liveSubscription
    ? (liveSubscription.stripe_data.plan.product.name as Plan)
    : "free";

  const nickname = liveSubscription
    ? liveSubscription.stripe_data.plan.nickname
    : "free";

  const status: String = liveSubscription
    ? liveSubscription.stripe_data.status
    : "starter";

  return (
    <>
      <Skeleton noOfLines={1} isLoaded={!loading}>
        {/* #TODO lowercase and style */}
        <HStack>
          {/* #TODO link to account management section */}
          <Badge variant="outline">{status}</Badge>
          <Badge variant="subtle">{nickname}</Badge>
        </HStack>

        {/* #TODO link to change plan */}
        {/* #TODO button to remove plan */}
      </Skeleton>
    </>
  );
};
