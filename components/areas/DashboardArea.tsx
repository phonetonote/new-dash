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

import { loadStripe } from "@stripe/stripe-js";
import useParams from "../../hooks/useParams";
import { AllData, useFetchData } from "../../hooks/useFetchData";
import { MyLink } from "../MyLink";
import { Plan, Subscription } from "../../types/SubscriptionTypes";
import router from "next/router";
import { InfoIcon } from "@chakra-ui/icons";

export const inputMethods = [
  "sms",
  "telegram",
  "alfred",
  "chrome",
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
  useEffect(() => {
    const titles = ["channels", "ptn-key", "clients"];
    for (var i = 0; i < titles.length; i++) {
      const title = titles[i];
      if (router.asPath.includes(title)) {
        document.getElementById(title)?.scrollIntoView();
      }
    }
  }, []);

  const {
    payment_intent: paymentIntentId,
    payment_intent_client_secret: paymentIntentClientSecret,
    checkout_success,
  } = useParams();

  const [justPaid, setJustPaid] = useState(checkout_success);
  const maybeHasUser = useUser();
  const user = maybeHasUser?.user;

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_KEY ?? "CANNOT FIND STRIPE KEY"
  );

  const { data: liveData, loading } = useFetchData();

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
    if (user) {
      Analytics.identify(user.id);
    }

    const params = new URLSearchParams(`${window.location.search}`);
    if (params.get("signedUp") && user && user.id) {
      Analytics.track("loadedDashboardAfterSignup");
    }
  }, [user]);

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
  }, [paymentIntentClientSecret, stripePromise]);

  const noPhone = user && user.phoneNumbers.length === 0;
  const overageAlert = (
    <Alert status="warning" rounded="md">
      <AlertIcon />
      <Text>
        too many messages sent this month,{" "}
        <MyLink href="/user#billing">
          please choose a plan in the billing section
        </MyLink>
        .
      </Text>
    </Alert>
  );

  const ptnKey = liveData?.["roam_keys"]?.[0]?.key ?? "loading...";

  return (
    <VStack align="stretch" spacing="20">
      <DashboardSection title="channels" icon={<FiSend />}>
        <>
          <Alert status="warning" rounded="md">
            <AlertIcon />
            <Text>
              the facebook integration has been deprecated because of stability
              issues.
            </Text>
          </Alert>
          <Alert status="info" rounded="md">
            <AlertIcon />
            <Text>
              a note for international users --- the telegram integration is
              preferred for international users because it is more reliable and
              less costly than sms.
            </Text>
          </Alert>
          {noPhone && (
            <Alert status="warning" rounded="md">
              <AlertIcon />
              <Text>
                you have no phone numbers added, consider adding one{" "}
                <MyLink href="/user#account">
                  <strong>in the user section</strong>
                </MyLink>{" "}
                to start using sms quick capture.
              </Text>
            </Alert>
          )}

          {justPaid && (
            <Alert status="success" rounded="md">
              <AlertIcon />
              payment successful, thanks for subscribing!
            </Alert>
          )}

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
            {inputMethods.map((inputMethod) => {
              return (
                user && (
                  <ChannelStatus
                    inputMethod={inputMethod}
                    data={liveData}
                    user={user}
                    loading={loading}
                    key={inputMethod}
                  />
                )
              );
            })}
          </SimpleGrid>
          <Skeleton isLoaded={!loading}>
            {shouldRenderOverage && overageAlert}
          </Skeleton>
        </>
      </DashboardSection>
      <DashboardSection title="ptn-key" icon={<FiKey />}>
        <PtnKey ptnKey={ptnKey} />
      </DashboardSection>
      <DashboardSection title="clients" icon={<FiPackage />}>
        <>
          <ClientInfo
            totalSentMessages={totalSentMessages}
            loading={loading}
            ptnKey={ptnKey}
          />
          <Skeleton isLoaded={!loading}>
            {shouldRenderOverage && overageAlert}
          </Skeleton>
        </>
      </DashboardSection>
      <Box height={"650px"}></Box>
    </VStack>
  );
};
