import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Analytics from "../helpers/analytics";
import { gql, useQuery } from "@apollo/client";
import { subscriptionQuery } from "../helpers/queries/subscription-query";
import { ApolloProviderWrapper } from "../helpers/apollo-client";
import { DashboardHeading } from "./headings/DashboardHeading";
import { SubscriptionBadge } from "./widgets/SubscriptionBadge";
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  StatHelpText,
  VStack,
  useColorModeValue,
  Spinner,
  useColorMode,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { dashboardQuery } from "../helpers/queries/dashboard-query";
import { MESSAGE_ENUM } from "../helpers/message-enum";
import { mutedText, PtnKey } from "./widgets/PtnKey";
import { DashboardSection } from "./DashboardSection";
import { FiCircle } from "react-icons/fi";
import colors from "../styles/themes/colors";

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

  const channelColors = {
    notReady: useColorModeValue(colors.ptnRed["500"], colors.ptnRed["500"]),
    ready: useColorModeValue(colors.ptnAqua["700"], colors.ptnAqua["300"]),
    received: useColorModeValue(colors.ptnGreen["700"], colors.ptnGreen["500"]),
  };

  return (
    <VStack align={"stretch"} spacing={"12"}>
      <DashboardSection title="usage">
        <>
          <SubscriptionBadge
            loading={subscriptionLoading}
            data={subscriptionData}
          />

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
                <Box key={inputMethod} shadow="thinOutline" rounded="md" p="5">
                  <VStack align="stretch" spacing={"2"}>
                    <Flex justify="space-between" align="baseline">
                      <Heading color={mutedText()} size="md">
                        {inputMethod}
                      </Heading>
                      {/* #TODO once a message has been received, additional not ready channels should not be red */}
                      <Box
                        border="4px solid"
                        borderColor={channelColors.received}
                        rounded="full"
                        height="16px"
                        width="16px"
                      ></Box>
                    </Flex>
                    <HStack align={"baseline"}>
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                      {/* <Heading>{numberString}</Heading>
                      <Box fontSize={"sm"}>
                        message{numberString === "1" ? "" : "s"} this month
                        <br />
                        {MESSAGE_ENUM[inputMethod]?.desc}
                      </Box> */}
                    </HStack>
                    <Stack>
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                    </Stack>
                  </VStack>
                </Box>
              );
            })}
          </SimpleGrid>
        </>
      </DashboardSection>
      <DashboardSection title="installation">
        <PtnKey
          ptnKey={liveData?.["roam_keys"]?.[0]?.key ?? "loading..."}
        ></PtnKey>
      </DashboardSection>
    </VStack>
  );
};
