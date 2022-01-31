import { useQuery } from "@apollo/client";
import {
  Box,
  SimpleGrid,
  Spinner,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { FiKey, FiPackage, FiSend } from "react-icons/fi";
import Analytics from "../../helpers/analytics";
import { dashboardQuery } from "../../helpers/queries/dashboard-query";
import { DashboardSection } from "../DashboardSection";
import { ChannelStatus } from "../widgets/ChannelStatus";
import { ClientStatus } from "../widgets/ClientStatus";
import { PtnKey } from "../widgets/PtnKey";
import useScrollableArea, {
  ActiveTitleContext,
} from "../../hooks/useScrollableArea";

export const DashboardArea = () => {
  const [activeTitle, setActiveTitle] = useScrollableArea();
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

  type AggregateCount = {
    aggregate: {
      count: number;
    };
  };

  type AggregateData = {
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
    refetch,
    loading,
  }: {
    data?: AggregateData;
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
    <VStack align="stretch" spacing="20">
      <ActiveTitleContext.Provider value={activeTitle.toString()}>
        <DashboardSection title="channels" icon={<FiSend />}>
          <>
            {/* #TODO <OverageAlert> */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
              {/* #TODO sort */}
              {inputMethods.map((inputMethod) => {
                const fallback = loading ? (
                  <Spinner
                    size="xs"
                    color={useColorModeValue(
                      "blackAlpha.300",
                      "whiteAlpha.300"
                    )}
                  />
                ) : (
                  "-"
                );

                const numberString =
                  (
                    liveData?.[
                      `${inputMethod}Count` as keyof AggregateData
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
        <DashboardSection title="ptn-key" icon={<FiKey />}>
          <PtnKey ptnKey={liveData?.["roam_keys"]?.[0]?.key ?? "loading..."} />
        </DashboardSection>
        <DashboardSection title="clients" icon={<FiPackage />}>
          <ClientStatus />
        </DashboardSection>
        <Box height={"650px"}></Box>
      </ActiveTitleContext.Provider>
    </VStack>
  );
};
