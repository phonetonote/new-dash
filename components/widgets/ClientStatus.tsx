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
  SimpleGrid,
} from "@chakra-ui/react";
import colors from "../../styles/themes/colors";
import { CircleStatus } from "../indicators/circle-status";
import { getChannelColors } from "./ChannelStatus";
import { mutedText } from "./PtnKey";

type ClientStatus = {};

export const ClientStatus = (props: ClientStatus) => {
  const channelColors = getChannelColors();

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Flex justify="space-between" align="baseline">
            <Heading color={mutedText()} size="md">
              status
            </Heading>
            <CircleStatus type="green"></CircleStatus>
          </Flex>
          <Skeleton height="20px" />
        </VStack>
      </Box>
      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Heading color={mutedText()} size="md">
            roam
          </Heading>
        </VStack>
      </Box>
      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Heading color={mutedText()} size="md">
            logseq
          </Heading>
        </VStack>
      </Box>
      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Heading color={mutedText()} size="md">
            craft
          </Heading>
        </VStack>
      </Box>
    </SimpleGrid>
  );
};
