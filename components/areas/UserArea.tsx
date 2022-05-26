import {
  Box,
  Button,
  Flex,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiCreditCard, FiHelpCircle, FiSend, FiSettings } from "react-icons/fi";
import { DashboardSection } from "../DashboardSection";
import {
  Plan,
  Subscription,
  SubscriptionBadge,
} from "../widgets/SubscriptionBadge";
import { ClerkProfile } from "../widgets/ClerkProfile";
import { useQuery } from "@apollo/client";
import { SignOutButton, useUser } from "@clerk/nextjs";
import useScrollableArea, {
  ActiveTitleContext,
} from "../../hooks/useScrollableArea";
import router from "next/router";
import { BillingWdiget } from "../widgets/BillingWidget";
import { useFetchData } from "../../hooks/useFetchData";
import { IoHelpBuoy } from "react-icons/io5";
import { TwitterButton } from "../TwitterButton";

export const UserArea = () => {
  const [activeTitle, setActiveTitle] = useScrollableArea();

  const user = useUser();

  const { data: liveData, loading, refetch } = useFetchData();

  const liveSubscription: Subscription | undefined =
    liveData?.subscriptions?.[0];
  const stripeData = liveSubscription?.stripe_data;
  const currentPlan: Plan = liveSubscription
    ? (liveSubscription.stripe_data.plan.product.name as Plan)
    : "free";
  const supportEmail =
    currentPlan === "pro"
      ? "prosupport@phonetonote.com"
      : "support@phonetonote.com";

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

            <Flex maxWidth="840px" mt="4" justifyContent="right">
              <HStack spacing="4" align="stretch">
                {/* <TwitterButton /> */}
                <SignOutButton
                  signOutCallback={() =>
                    router.push(`${process.env.NEXT_PUBLIC_OLD_MARKETING_SITE}`)
                  }
                >
                  <Button>sign out</Button>
                </SignOutButton>
              </HStack>
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
            subscriptionLoading={loading}
            user={user}
            stripeData={stripeData as Subscription["stripe_data"]}
          />
        </DashboardSection>
        <DashboardSection
          id="preferences"
          title="preferences"
          icon={<FiSettings />}
        >
          <Text>check back soon for monthly backup preferences and more.</Text>
        </DashboardSection>
        <DashboardSection id="help" title="help" icon={<IoHelpBuoy />}>
          <Text>
            plase email <a href={`mailto:${supportEmail}`}>{supportEmail}</a>{" "}
            for support
          </Text>
        </DashboardSection>
        <Box height={"85vh"}></Box>
      </ActiveTitleContext.Provider>
    </VStack>
  );
};
