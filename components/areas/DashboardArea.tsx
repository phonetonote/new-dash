import { useQuery } from "@apollo/client";
import {
  Box,
  SimpleGrid,
  Spinner,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import { createContext, useEffect, useState } from "react";
import { FiKey, FiPackage, FiSend } from "react-icons/fi";
import Analytics from "../../helpers/analytics";
import { dashboardQuery } from "../../helpers/queries/dashboard-query";
import { DashboardSection } from "../DashboardSection";
import { ChannelStatus } from "../widgets/ChannelStatus";
import { ClientStatus } from "../widgets/ClientStatus";
import { PtnKey } from "../widgets/PtnKey";
import { AreaStack } from "./AreaStack";
import useScrollPosition from "@react-hook/window-scroll";
import { HEADING_CLASS } from "../headings/DashboardHeading";
import { condenseTitle } from "../sidebar/SidebarLink";
import { useRouter } from "next/router";

export const ActiveTitleContext = createContext("foo");

export const DashboardArea = () => {
  const user = useUser();
  const router = useRouter();

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

  const scrollY = useScrollPosition(30);

  const [activeTitle, setActiveTitle] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(`${window.location.search}`);
    console.log("params", params);
    const possibleTitle = params.get("title");
    router.push(`/dashboard#${possibleTitle}`);
  }, []);

  useEffect(() => {
    const headings = document.getElementsByClassName(HEADING_CLASS);
    const sortedHeadings = Array.from(headings).sort(
      (heading) => heading.getBoundingClientRect().top
    );
    const visibleHeadings = Array.from(sortedHeadings)?.filter(
      (heading) => heading.getBoundingClientRect().top > 0
    );

    const topHeading =
      visibleHeadings.length > 0 ? visibleHeadings[0] : sortedHeadings[0];

    if (topHeading) {
      setActiveTitle(condenseTitle(topHeading.innerHTML));

      const newRoute = `/dashboard?title=${condenseTitle(
        topHeading.innerHTML
      )}`;

      console.log("newRoute", newRoute, router.asPath);
      if (newRoute !== router.asPath) {
        router.replace(`${newRoute}`, "", { scroll: false });
      }
    }
  }, [scrollY]);

  return (
    <VStack align="stretch" spacing="20">
      <ActiveTitleContext.Provider value={activeTitle}>
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
