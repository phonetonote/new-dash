import {
  Alert,
  AlertIcon,
  Box,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { FiKey, FiPackage, FiSend } from "react-icons/fi";
import Analytics from "../../helpers/analytics";
import { DashboardSection } from "../DashboardSection";
import { ChannelStatus } from "../widgets/ChannelStatus";
import { ClientInfo } from "../widgets/ClientInfo";
import { PtnKey } from "../widgets/PtnKey";

import { useFetchData } from "../../hooks/useFetchData";
import { MyLink } from "../MyLink";
import router from "next/router";

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

  const maybeHasUser = useUser();
  const user = maybeHasUser?.user;

  const { data: liveData, loading } = useFetchData();

  const totalSentMessages = liveData?.totalCount.aggregate.count ?? 0;

  useEffect(() => {
    if (user) {
      Analytics.identify(user.id);
    }

    const params = new URLSearchParams(`${window.location.search}`);
    if (params.get("signedUp") && user && user.id) {
      Analytics.track("loadedDashboardAfterSignup");
    }
  }, [user]);

  const noPhone = user && user.phoneNumbers.length === 0;
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
        </>
      </DashboardSection>
      <Box height={"650px"}></Box>
    </VStack>
  );
};
