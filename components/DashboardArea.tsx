import { useQuery } from "@apollo/client";
import {
  Box,
  SimpleGrid,
  Spinner,
  useColorModeValue,
  visuallyHiddenStyle,
  VStack,
} from "@chakra-ui/react";
import { UserProfile, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Analytics from "../helpers/analytics";
import { dashboardQuery } from "../helpers/queries/dashboard-query";
import { subscriptionQuery } from "../helpers/queries/subscription-query";
import typography from "../styles/themes/foundations/typography";
import { DashboardSection } from "./DashboardSection";
import { ChannelStatus } from "./widgets/ChannelStatus";
import { ClientStatus } from "./widgets/ClientStatus";
import { PtnKey } from "./widgets/PtnKey";
import { SubscriptionBadge } from "./widgets/SubscriptionBadge";

export const DashboardArea = () => {
  const user = useUser();

  useEffect(() => {
    Analytics.identify(user.id);

    const params = new URLSearchParams(`${window.location.search}`);
    if (params.get("signedUp") && user && user.id) {
      Analytics.track("loadedDashboardAfterSignup");
    }
  }, [Analytics, user]);

  const {
    publicMetadata: { installedAt, installed_at },
    emailAddresses,
    phoneNumbers,
    id,
    update,
  } = user;

  const {
    data: subscriptionData,
    refetch: refetchSubscriptionData,
    loading: subscriptionLoading,
  } = useQuery(subscriptionQuery, {
    variables: {
      clerkId: id,
    },
    pollInterval: 2000,
  });

  type AggregateCount = {
    aggregate: {
      count: number;
    };
  };

  // #TODO rename
  type DataType = {
    smsCount: AggregateCount;
    facebookCountL: AggregateCount;
    alfredCount: AggregateCount;
    telegramCount: AggregateCount;
    zapierCount: AggregateCount;
    emailCount: AggregateCount;
    roam_keys: {
      key: string;
    }[];
  };
  const {
    data: liveData,
    refetch: refetchRoamKey,
    loading,
  }: {
    data?: DataType;
    refetch: Function;
    loading: boolean;
  } = useQuery(dashboardQuery, {
    variables: {
      clerkId: id,
    },
    pollInterval: 2000,
  });

  const inputMethods = [
    "sms",
    "facebook",
    "alfred",
    "telegram",
    "zapier",
    "email",
  ];

  return (
    <VStack align="stretch" spacing="12" pt="4" pb="8">
      <DashboardSection title="channels">
        <>
          {/* #TODO put in subscription area */}
          {/* <SubscriptionBadge
            loading={subscriptionLoading}
            data={subscriptionData}
          /> */}

          {/* <OverageAlert> */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
            {/* #TODO sort */}
            {inputMethods.map((inputMethod) => {
              const fallback = loading ? (
                <Spinner
                  size="xs"
                  color={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
                />
              ) : (
                "-"
              );

              const aggData = liveData;

              const numberString =
                (
                  liveData?.[
                    `${inputMethod}Count` as keyof DataType
                  ] as AggregateCount
                )?.aggregate?.count?.toString() ?? fallback;

              return (
                <ChannelStatus
                  count={numberString}
                  inputMethod={inputMethod}
                  key={inputMethod}
                />
              );
            })}
          </SimpleGrid>
        </>
      </DashboardSection>
      <DashboardSection title="installation">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
          <PtnKey ptnKey={liveData?.["roam_keys"]?.[0]?.key ?? "loading..."} />
          <ClientStatus />
        </SimpleGrid>
      </DashboardSection>
      <DashboardSection title="user settings">
        <Box
          sx={{
            ".cl-component": {
              "--clerk-accounts-background-color": useColorModeValue(
                "colors.gray.100",
                "colors.gray.900"
              ),
              "--clerk-background-color": useColorModeValue(
                "colors.gray.100",
                "colors.gray.900"
              ),
              "--clerk-font-color": useColorModeValue(
                "colors.blackAlpha.700",
                "colors.whiteAlpha.700"
              ),
              "--clerk-font-color-l1": useColorModeValue(
                "colors.blackAlpha.700",
                "colors.whiteAlpha.700"
              ),

              // #TODO text sizing here is a mess
              ".cl-subtitle": {
                fontSize: "1em",
              },
              ".cl-page-heading": {
                // ...visuallyHiddenStyle,
              },

              "h1, h2, h3, h4, h5, h6": {
                fontFamily: typography.fonts.heading,
              },
            },
          }}
        >
          <UserProfile path="/dashboard" />
        </Box>
      </DashboardSection>
    </VStack>
  );
};
