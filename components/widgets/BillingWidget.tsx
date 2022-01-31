import {
  Box,
  Button,
  HStack,
  Skeleton,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ClerkProp, ClerkProviderProps } from "@clerk/nextjs";
import { ReactChild } from "react";
import { ActiveTitleContext } from "../../hooks/useScrollableArea";
import user from "../../pages/user";
import { DashboardHeading } from "../headings/DashboardHeading";
import { Subscription, SubscriptionBadge } from "./SubscriptionBadge";
import { SubscriptionLink } from "./SubscriptionLink";

type BillingWidgetProps = {
  user: { id: string };
  subscriptionLoading: boolean;
  stripeData: Subscription["stripe_data"];
};

export const BillingWdiget = (props: BillingWidgetProps) => {
  const { user, subscriptionLoading, stripeData } = props;

  return (
    <>
      {/* #TODO <OverageAlert> */}
      <SubscriptionBadge
        loading={subscriptionLoading}
        status={stripeData?.status ?? "starter"}
        nickname={stripeData?.plan?.nickname ?? "free"}
      />
      <Skeleton isLoaded={!subscriptionLoading}>
        {stripeData ? (
          <SubscriptionLink clerkId={user.id} />
        ) : (
          <Button
            as="a"
            href={`${process.env.NEXT_PUBLIC_OLD_MARKETING_SITE}/pages/pricing`}
          >
            view pricing
          </Button>
        )}
      </Skeleton>
    </>
  );
};
