import {
  Box,
  VStack,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Stack,
  useColorModeValue,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import colors from "../../styles/themes/colors";
import { getChannelColors } from "./ChannelStatus";
import { mutedText } from "./PtnKey";

type ClientStatus = {};

export const ClientStatus = (props: ClientStatus) => {
  const channelColors = getChannelColors();

  return (
    <Box shadow="thinOutline" rounded="md" p="5">
      <VStack align="stretch" spacing={"2"}>
        <Flex justify="space-between" align="baseline">
          <Heading color={mutedText()} size="md">
            client status
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
        </HStack>
        <Accordion allowMultiple>
          <AccordionItem key="foo">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Section 1 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem key="bar">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Section 2 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};
