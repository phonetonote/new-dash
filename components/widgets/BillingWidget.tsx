import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  SimpleGrid,
  Text,
  useRadio,
  VStack,
} from "@chakra-ui/react";

import { Subscription } from "../../types/SubscriptionTypes";
import { ActionButton } from "./billing/ActionButton";
import { PricingCard } from "./billing/PricingCard";
import { SubscriptionBadge } from "./SubscriptionBadge";
import { SubscriptionLink } from "./SubscriptionLink";
import { SiHive, SiMicrosoft, SiMarketo } from "react-icons/si";
import { CalmSkeleton } from "../indicators/CalmSkeleton";
import { MyLink } from "../MyLink";
import { DurationSwitcher } from "./billing/DurationSwitcher";
import { useState } from "react";

type BillingWidgetProps = {
  user: { id: string };
  subscriptionLoading: boolean;
  stripeData: Subscription["stripe_data"];
};

export const BillingWdiget = (props: BillingWidgetProps) => {
  const { user, subscriptionLoading, stripeData } = props;

  const [isYearly, setIsYearly] = useState<boolean>(false);

  const has_subscription =
    stripeData && !stripeData?.status?.includes("expired");

  const standardPrice = isYearly ? "$50" : "$5";
  const proPrice = isYearly ? "$100" : "$10";
  const myDuration = isYearly ? "year" : "month";

  return (
    <VStack spacing="4" align="stretch">
      <SubscriptionBadge
        loading={subscriptionLoading}
        status={stripeData?.status ?? "starter"}
        nickname={stripeData?.plan?.nickname ?? "free"}
      />
      <CalmSkeleton isLoaded={!subscriptionLoading}>
        {has_subscription && <SubscriptionLink clerkId={user.id} />}
      </CalmSkeleton>

      <CalmSkeleton isLoaded={!subscriptionLoading}>
        {has_subscription && (
          <Alert status="info" rounded="md">
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

      {!has_subscription && (
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
                  ],
                }}
                button={
                  <ActionButton planName="standard">subscribe</ActionButton>
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
                  <ActionButton
                    variant="outline"
                    borderWidth="2px"
                    planName="pro"
                    duration={myDuration}
                  >
                    subscribe
                  </ActionButton>
                }
              />
            </SimpleGrid>
          </Box>
        </Box>
      )}
    </VStack>
  );
};
