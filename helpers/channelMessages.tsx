import { inputMethods } from "../components/areas/DashboardArea";
import { ChannelStatusTypes } from "../components/widgets/ChannelStatus";
import { MyLink } from "../components/MyLink";
import { CopyText } from "../components/widgets/CopyText";
import { Alert, Badge, Box, Text, VStack } from "@chakra-ui/react";
import styles from "../styles/Channels.module.css";

export type InputMethod = typeof inputMethods[number];

export const channelMessages = (
  count: number
): {
  [key in InputMethod]: {
    [key in ChannelStatusTypes]: string | React.ReactElement;
  };
} => {
  const copyPhoneNumber = <CopyText text="+1 (310) 919-1008" />;
  const copyEmail = <CopyText text="receiver@inbound.phonetonote.com" />;

  return {
    sms: {
      notReady: (
        <Box>
          please{" "}
          <MyLink href="/user?title=account#/profile/phone-numbers">
            add and verify a phone number
          </MyLink>{" "}
          to get started
        </Box>
      ),
      ready: (
        <VStack align="stretch" spacing="6">
          <Box>send sms messages to the number below</Box>
          {copyPhoneNumber}
        </VStack>
      ),
      received: (
        <VStack align="stretch" spacing="6">
          <Box>
            <Badge variant="outline">{`${count}`}</Badge> received. send more to
            the number below
          </Box>
          <Box>{copyPhoneNumber}</Box>
        </VStack>
      ),
    },
    telegram: {
      notReady: (
        <VStack spacing={5}>
          <Box>
            send your ptn key to our{" "}
            <MyLink href="https://telegram.me/phonetoroam_bot">
              telegram bot
            </MyLink>{" "}
            to get started. send your ptn key with nothing else.
          </Box>
        </VStack>
      ),
      ready: (
        <VStack align="stretch" spacing={5}>
          <Box>
            telegram connected, send messages to our{" "}
            <MyLink href="https://telegram.me/phonetoroam_bot">
              telegram bot
            </MyLink>{" "}
            to get started.
          </Box>
        </VStack>
      ),
      received: (
        <VStack align="stretch" spacing={5}>
          <Box>
            <Badge variant="outline">{`${count}`}</Badge> received. continue
            sending messages to our{" "}
            <MyLink href="https://telegram.me/phonetoroam_bot">
              telegram bot
            </MyLink>
          </Box>
        </VStack>
      ),
    },
    alfred: {
      notReady: "",
      ready: (
        <Box>
          download{" "}
          <MyLink href="https://ptn.gumroad.com/l/ptn-alfred">
            alfredtonote
          </MyLink>{" "}
          and edit the script to include your ptn key. please note an internet
          connection is required for alfredtonote to work.
        </Box>
      ),
      received: (
        <Box>
          <Badge variant="outline">{`${count}`}</Badge> received. continue
          sending messages with alfred
        </Box>
      ),
    },
    chrome: {
      notReady: "",
      ready: (
        <Box>
          download{" "}
          <MyLink href="https://chrome.google.com/webstore/detail/chrometonote/gcmgnllgankcoijeoniebkblidmlppbf">
            chrometonote from the chrome webstore
          </MyLink>{" "}
          and add your ptn key in the plugin settings.
        </Box>
      ),
      received: (
        <Box>
          <Badge variant="outline">{`${count}`}</Badge> received. continue using
          the chrometonote extension.
        </Box>
      ),
    },
    zapier: {
      notReady: "",
      ready: (
        <VStack align="stretch" spacing="6">
          <Box>
            get started{" "}
            <MyLink
              href={`${process.env.NEXT_PUBLIC_OLD_MARKETING_SITE}/pages/integrations`}
            >
              with our zapier integration
            </MyLink>{" "}
            to pipe other data to your notes.
          </Box>
          <Box>you will need your ptn key to get started.</Box>
        </VStack>
      ),
      received: (
        <Box>
          <Badge variant="outline">{`${count}`}</Badge> received. continue
          piping messages through zapier.
        </Box>
      ),
    },
    email: {
      notReady: (
        <Box>
          please{" "}
          <MyLink href="/user?title=account#/profile/email-addresses">
            add and verify an email address
          </MyLink>{" "}
          to get started
        </Box>
      ),
      ready: (
        <VStack align="stretch" spacing="6">
          <Box>send emails to the address below</Box>
          {copyEmail}
        </VStack>
      ),
      received: (
        <VStack align="stretch" spacing="8">
          <Box>
            <Badge variant="outline">{`${count}`}</Badge> received. send more to
            the address below
          </Box>
          {copyEmail}
        </VStack>
      ),
    },
  };
};
