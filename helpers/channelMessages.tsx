import { inputMethods } from "../components/areas/DashboardArea";
import { ChannelStatusTypes } from "../components/widgets/ChannelStatus";
import { MyLink } from "../components/MyLink";
import { CopyText } from "../components/widgets/CopyText";
import { Alert, AlertIcon, Badge, Box, Text, VStack } from "@chakra-ui/react";

export type InputMethod = typeof inputMethods[number];

export const channelMessages = (
  count: number
): {
  [key in InputMethod]: {
    [key in ChannelStatusTypes]: string | React.ReactElement;
  };
} => {
  const copyPhoneNumber = <CopyText text="+1 (310) 919-1008" />;
  const copyEmail = <CopyText text="hello@inbound.phonetonote.com" />;
  const facebookDown = (
    <Box>
      <Alert status="warning" rounded="md">
        <AlertIcon />
        <Text>
          facebook bot is broken and can't onboard new accounts. we have a
          support ticket open with twilio. check back soon!
        </Text>
      </Alert>
    </Box>
  );

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
    facebook: {
      notReady: facebookDown,
      ready: (
        <VStack align="stretch" spacing="6">
          <Box>
            facebook connected, send messages{" "}
            <MyLink href="http://m.me/phonetonote">to our facebook bot</MyLink>.
          </Box>
        </VStack>
      ),
      received: (
        <Box>
          <Badge variant="outline">{`${count}`}</Badge> received. continiue{" "}
          <MyLink href="http://m.me/phonetonote">sending us messages</MyLink>.
        </Box>
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
          and edit the script to include your ptn key.
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
    telegram: {
      notReady: (
        <Box>
          send your ptn key to our{" "}
          <MyLink href="https://telegram.me/phonetoroam_bot">
            telegram bot
          </MyLink>{" "}
          to get started. send your ptn key with nothing else.
        </Box>
      ),
      ready: (
        <VStack align="stretch" spacing="4">
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
        <Box>
          <Badge variant="outline">{`${count}`}</Badge> received. continue
          sending messages to our{" "}
          <MyLink href="https://telegram.me/phonetoroam_bot">
            telegram bot
          </MyLink>
          .
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
