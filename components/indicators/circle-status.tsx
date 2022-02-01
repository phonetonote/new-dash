import { Box, useColorModeValue } from "@chakra-ui/react";
import { useChannelColors } from "../../hooks/useChannelColors";
import colors from "../../styles/themes/colors";
import { ChannelStatusTypes } from "../widgets/ChannelStatus";

type Status = "green" | "yellow" | "red";

type CircleStatus = {
  type: ChannelStatusTypes;
};

export const CircleStatus = (props: CircleStatus) => {
  const { type } = props;

  const channelColors = useChannelColors();
  let color = channelColors.ready;
  if (type === "received") {
    color = channelColors.received;
  } else if (type === "notReady") {
    color = channelColors.notReady;
  }

  return (
    <Box
      border="4px solid"
      borderColor={color}
      rounded="full"
      height="16px"
      width="16px"
    ></Box>
  );
};
