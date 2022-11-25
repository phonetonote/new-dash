import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Plan, Subscription } from "../../types/SubscriptionTypes";
import { ActionButton } from "./billing/ActionButton";
import { PricingCard } from "./billing/PricingCard";
import { SubscriptionBadge } from "./SubscriptionBadge";
import { SubscriptionLink } from "./SubscriptionLink";
import { CalmSkeleton } from "../indicators/CalmSkeleton";
import { MyLink } from "../MyLink";
import { DurationSwitcher } from "./billing/DurationSwitcher";
import { useState } from "react";

type BillingWidgetProps = {
  user: { id: string };
  subscriptionLoading: boolean;
  stripeData: Subscription["stripe_data"];
  currentPlan: Plan;
};

const ROAM_DEPOT_COUPON_ID = "YldsnRLT";

export const BillingWdiget = (props: BillingWidgetProps) => {
  const { currentPlan, user, subscriptionLoading, stripeData } = props;

  const [isYearly, setIsYearly] = useState<boolean>(false);

  const has_subscription =
    stripeData && !stripeData?.status?.includes("expired");

  const hasRoamDepotCoupon =
    stripeData?.customer?.discount?.coupon?.id === ROAM_DEPOT_COUPON_ID;

  const standardPrice = isYearly ? "$50" : "$5";
  const proPrice = isYearly ? "$100" : "$10";
  const myDuration = isYearly ? "year" : "month";

  return (
    <VStack spacing="4" align="stretch">
      <SubscriptionBadge
        loading={subscriptionLoading}
        status={stripeData?.status ?? "starter"}
        nickname={stripeData?.plan?.nickname ?? "free"}
        hasRoamDepotCoupon={hasRoamDepotCoupon}
      />
      <CalmSkeleton isLoaded={!subscriptionLoading}>
        {has_subscription && <SubscriptionLink clerkId={user.id} />}
      </CalmSkeleton>

      <CalmSkeleton isLoaded={!subscriptionLoading}>
        {has_subscription && (
          <Alert status="info" rounded="md" mb="20">
            <AlertIcon />
            <Text>
              please email{" "}
              <MyLink href="mailto:ambassadors@phonetonote.com">
                ambassadors@phonetonote.com
              </MyLink>{" "}
              to learn more about our affiliate program.
              <br />
              your audience gets a ptn discount, and you get a portion of the
              revenue.
            </Text>
          </Alert>
        )}
      </CalmSkeleton>

      {!subscriptionLoading && (
        <Box>
          <Flex
            direction="column"
            align={{ base: "flex-start", md: "center" }}
            maxW="2xl"
            mx="auto"
            mb="12"
            mt="-12"
          >
            <DurationSwitcher
              onChange={(e) => {
                setIsYearly(!isYearly);
              }}
            ></DurationSwitcher>
          </Flex>
          <Box as="section" py="0" px={{ base: "2", md: "0" }}>
            <SimpleGrid
              columns={{ base: 1, lg: 3 }}
              spacing={{ base: "8", lg: "0" }}
              maxW="7xl"
              mx="2"
              justifyItems="center"
              alignItems="center"
            >
              <PricingCard
                data={{
                  price: "free",
                  name: "starter",
                  features: ["10 monthly messages", "sms", "email"],
                }}
                button={<></>}
              />
              <PricingCard
                zIndex={1}
                isPopular
                transform={{ lg: "scale(1.05)" }}
                data={{
                  price: standardPrice,
                  name: "standard",
                  features: [
                    "1,000 monthly messages",
                    "sms",
                    "email",
                    "telegram",
                    "facebook",
                    "alfred",
                    "zapier",
                  ],
                }}
                button={
                  <>
                    {currentPlan === "standard" ? (
                      <></>
                    ) : (
                      <ActionButton planName="standard" duration={myDuration}>
                        subscribe
                      </ActionButton>
                    )}
                  </>
                }
                duration={myDuration}
              />
              <PricingCard
                isPro
                data={{
                  price: proPrice,
                  name: "pro",
                  features: [
                    "10,000 monthly messages",
                    "sms",
                    "email",
                    "telegram",
                    "facebook",
                    "alfred",
                  ],
                }}
                duration={myDuration}
                button={
                  currentPlan === "pro" ? (
                    <></>
                  ) : (
                    <ActionButton
                      variant="outline"
                      borderWidth="2px"
                      planName="pro"
                      duration={myDuration}
                    >
                      subscribe
                    </ActionButton>
                  )
                }
              />
            </SimpleGrid>
          </Box>
        </Box>
      )}
    </VStack>
  );
};
