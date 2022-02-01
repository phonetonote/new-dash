import { useQuery } from "@apollo/client";
import {
  Alert,
  AlertIcon,
  Box,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { FiKey, FiPackage, FiSend } from "react-icons/fi";
import Analytics from "../../helpers/analytics";
import { dashboardQuery } from "../../helpers/queries/dashboard-query";
import { DashboardSection } from "../DashboardSection";
import { ChannelStatus } from "../widgets/ChannelStatus";
import { ClientInfo } from "../widgets/ClientInfo";
import { PtnKey } from "../widgets/PtnKey";
import useScrollableArea, {
  ActiveTitleContext,
} from "../../hooks/useScrollableArea";

import { loadStripe } from "@stripe/stripe-js";
import useParams from "../../hooks/useParams";
import { AllData, useFetchData } from "../../hooks/useFetchData";
import { Plan, Subscription } from "../widgets/SubscriptionBadge";
import { MyLink } from "../MyLink";

export const inputMethods = [
  "sms",
  "facebook",
  "alfred",
  "telegram",
  "zapier",
  "email",
] as const;

export type AggregateCount = {
  aggregate: {
    count: number;
  };
};

type MessagesAllowed = { [k in Plan]: number };

export const messagesAllowedMap: MessagesAllowed = {
  free: 10,
  standard: 1000,
  pro: 10000,
  enterprise: 10000,
};

export const DashboardArea = () => {
  const [activeTitle, setActiveTitle] = useScrollableArea();
  const [justPaid, setJustPaid] = useState(false);
  const user = useUser();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_KEY ?? "CANNOT FIND STRIPE KEY"
  );

  const {
    payment_intent: paymentIntentId,
    payment_intent_client_secret: paymentIntentClientSecret,
  } = useParams();

  const { data: liveData, loading, refetch } = useFetchData();
  const totalSentMessages = liveData?.totalCount.aggregate.count ?? 0;
  const totalMonthlyCount = liveData?.totalMonthylMessages.aggregate.count ?? 0;

  const liveSubscription: Subscription | undefined =
    liveData?.subscriptions?.[0];
  const currentPlan: Plan = liveSubscription
    ? (liveSubscription.stripe_data.plan.product.name as Plan)
    : "free";
  const messagesAllowed: number = messagesAllowedMap[currentPlan];

  const shouldRenderOverage = totalMonthlyCount > messagesAllowed && !justPaid;

  useEffect(() => {
    Analytics.identify(user.id);

    const params = new URLSearchParams(`${window.location.search}`);
    if (params.get("signedUp") && user && user.id) {
      Analytics.track("loadedDashboardAfterSignup");
    }
  }, [Analytics, user]);

  useEffect(() => {
    if (paymentIntentClientSecret) {
      stripePromise.then((stripe) => {
        if (stripe) {
          stripe
            .retrievePaymentIntent(paymentIntentClientSecret)
            .then((res) => {
              if (
                res &&
                res.paymentIntent &&
                res.paymentIntent.status === "succeeded"
              ) {
                Analytics.track("paymentSucceeded");
                setJustPaid(true);
              } else {
                alert("there was a billing error, please contact ptr support");
                Analytics.track("stripeError", res);
              }
            });
        }
      });
    }
  }, [paymentIntentClientSecret]);

  const overageAlert = (
    <Alert status="warning" rounded="md">
      <AlertIcon />
      <Text>
        too many messages sent this month,{" "}
        <MyLink
          href={`${process.env.NEXT_PUBLIC_OLD_MARKETING_SITE}/pages/pricing`}
        >
          please consider upgrading your plan
        </MyLink>
        .
      </Text>
    </Alert>
  );

  return (
    <VStack align="stretch" spacing="20">
      <ActiveTitleContext.Provider value={activeTitle.toString()}>
        <DashboardSection title="channels" icon={<FiSend />}>
          <>
            {justPaid && (
              <Alert status="success" rounded="md">
                <AlertIcon />
                payment successful, thanks for subscribing!
              </Alert>
            )}

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
              {inputMethods.map((inputMethod) => {
                const aggCount: number = (
                  liveData?.[
                    `${inputMethod}Count` as keyof AllData
                  ] as AggregateCount
                )?.aggregate?.count;

                return (
                  <ChannelStatus
                    inputMethod={inputMethod}
                    data={liveData}
                    user={user}
                    loading={loading}
                    key={inputMethod}
                  />
                );
              })}
            </SimpleGrid>
            <Skeleton isLoaded={!loading}>
              {shouldRenderOverage && overageAlert}
            </Skeleton>
          </>
        </DashboardSection>
        <DashboardSection title="ptn-key" icon={<FiKey />}>
          <PtnKey ptnKey={liveData?.["roam_keys"]?.[0]?.key ?? "loading..."} />
        </DashboardSection>
        <DashboardSection title="clients" icon={<FiPackage />}>
          <>
            <ClientInfo
              totalSentMessages={totalSentMessages}
              loading={loading}
            />
            <Skeleton isLoaded={!loading}>
              {shouldRenderOverage && overageAlert}
            </Skeleton>
          </>
        </DashboardSection>
        <Box height={"650px"}></Box>
      </ActiveTitleContext.Provider>
    </VStack>
  );
};
