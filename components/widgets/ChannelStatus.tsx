import {
  Box,
  VStack,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import colors from "../../styles/themes/colors";
import { CircleStatus } from "../indicators/circle-status";
import { mutedText } from "./PtnKey";

type ChannelStatusProps = {
  inputMethod: string;
  count: string;
};

export const getChannelColors = () => ({
  notReady: useColorModeValue(colors.ptnRed["500"], colors.ptnRed["500"]),
  ready: useColorModeValue(colors.ptnAqua["700"], colors.ptnAqua["300"]),
  received: useColorModeValue(colors.ptnGreen["700"], colors.ptnGreen["500"]),
});

export const ChannelStatus = (props: ChannelStatusProps) => {
  const { inputMethod, count } = props;

  const channelColors = getChannelColors();

  return (
    <Box key={inputMethod} border="thinborder" rounded="md" p="5">
      <VStack align="stretch" spacing={"2"}>
        <Flex justify="space-between" align="baseline">
          <Heading color={mutedText()} size="md">
            {inputMethod}
          </Heading>
          {/* #TODO once a message has been received, additional not ready channels should not be red */}
          <CircleStatus type="green"></CircleStatus>
        </Flex>
        <HStack align={"baseline"}>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          {/* <Heading>{count}</Heading>
                      <Box fontSize={"sm"}>
                        message{count === "1" ? "" : "s"} this month
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
};
