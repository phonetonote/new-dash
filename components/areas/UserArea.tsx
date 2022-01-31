import { Box, Button, Skeleton, VStack } from "@chakra-ui/react";
import { FiCreditCard, FiSend } from "react-icons/fi";
import { DashboardSection } from "../DashboardSection";
import {
  Plan,
  Subscription,
  SubscriptionBadge,
} from "../widgets/SubscriptionBadge";
import { ClerkProfile } from "../widgets/ClerkProfile";
import { useQuery } from "@apollo/client";
import { subscriptionQuery } from "../../helpers/queries/subscription-query";
import { useUser } from "@clerk/nextjs";
import { SubscriptionLink } from "../widgets/SubscriptionLink";
import useScrollableArea, {
  ActiveTitleContext,
} from "../../hooks/useScrollableArea";

export const UserArea = () => {
  const [activeTitle, setActiveTitle] = useScrollableArea();

  const user = useUser();

  const {
    data: subscriptionData,
    refetch: refetchSubscriptionData,
    loading: subscriptionLoading,
  } = useQuery(subscriptionQuery, {
    variables: {
      clerkId: user.id,
    },
    pollInterval: 2000,
  });

  const liveSubscription: Subscription = subscriptionData?.subscriptions?.[0];
  const stripeData = liveSubscription?.stripe_data;

  return (
    <VStack align="stretch" spacing="20" p="0">
      <ActiveTitleContext.Provider value={activeTitle.toString()}>
        <Box id="account">
          <ActiveTitleContext.Consumer>
            {(value) => {
              return (
                <ClerkProfile only="account" activeTitle={value}></ClerkProfile>
              );
            }}
          </ActiveTitleContext.Consumer>
        </Box>
        <Box id="security">
          <ActiveTitleContext.Consumer>
            {(value) => {
              return (
                <ClerkProfile
                  only="security"
                  activeTitle={value}
                ></ClerkProfile>
              );
            }}
          </ActiveTitleContext.Consumer>
        </Box>
        <DashboardSection id="billing" title="billing" icon={<FiCreditCard />}>
          <>
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
        </DashboardSection>
        <Box height={"800px"}></Box>
      </ActiveTitleContext.Provider>
    </VStack>
  );
};
