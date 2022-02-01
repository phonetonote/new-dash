import { Badge, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

export type Subscription = {
  stripe_data: {
    plan: {
      product: {
        name: string;
      };
      nickname: string;
    };
    status: string;
  };
};

type SubscriptionBadgeProps = {
  status: String;
  nickname: String;
  loading: boolean;
};

export type PTRDuration = "month" | "year";
export type PaidPlan = "standard" | "pro";
export type Plan = PaidPlan | "free" | "enterprise";

export const SubscriptionBadge = (props: SubscriptionBadgeProps) => {
  const { status, nickname, loading } = props;

  return (
    <>
      <Skeleton noOfLines={1} isLoaded={!loading}>
        <HStack>
          <Badge variant="outline">{status?.replaceAll("_", " ")}</Badge>
          <Badge variant="outline">{nickname?.replaceAll("_", " ")}</Badge>
        </HStack>
      </Skeleton>
    </>
  );
};
