import { Box, Button, Flex, Skeleton, Text, VStack } from "@chakra-ui/react";
import { FiCreditCard, FiSend, FiSettings } from "react-icons/fi";
import { DashboardSection } from "../DashboardSection";
import {
  Plan,
  Subscription,
  SubscriptionBadge,
} from "../widgets/SubscriptionBadge";
import { ClerkProfile } from "../widgets/ClerkProfile";
import { useQuery } from "@apollo/client";
import { subscriptionQuery } from "../../helpers/queries/subscription-query";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { SubscriptionLink } from "../widgets/SubscriptionLink";
import useScrollableArea, {
  ActiveTitleContext,
} from "../../hooks/useScrollableArea";
import router from "next/router";
import { BillingWdiget } from "../widgets/BillingWidget";

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
          <VStack align="stretch">
            <Box minH="600px">
              <ActiveTitleContext.Consumer>
                {(value) => {
                  return (
                    <ClerkProfile
                      only="account"
                      activeTitle={value}
                    ></ClerkProfile>
                  );
                }}
              </ActiveTitleContext.Consumer>
            </Box>

            <Flex width="840px" mt="4" justifyContent="right">
              <SignOutButton
                signOutCallback={() =>
                  router.push(`${process.env.NEXT_PUBLIC_OLD_MARKETING_SITE}`)
                }
              >
                <Button my="4">sign out</Button>
              </SignOutButton>
            </Flex>
          </VStack>
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
          <BillingWdiget
            subscriptionLoading={subscriptionLoading}
            user={user}
            stripeData={stripeData}
          />
        </DashboardSection>
        <DashboardSection
          id="preferences"
          title="preferences"
          icon={<FiSettings />}
        >
          <Text>check back soon for monthly backup preferences and more.</Text>
        </DashboardSection>
        <Box height={"800px"}></Box>
      </ActiveTitleContext.Provider>
    </VStack>
  );
};
