import { Box, useColorModeValue } from "@chakra-ui/react";
import colors from "../../styles/themes/colors";
import { ChannelStatusTypes } from "../widgets/ChannelStatus";

type Status = "green" | "yellow" | "red";

type CircleStatus = {
  type: ChannelStatusTypes;
};

const getChannelColors = (): { [key in ChannelStatusTypes]: string } => ({
  notReady: useColorModeValue(colors.ptnRed["500"], colors.ptnRed["500"]),
  ready: useColorModeValue(colors.ptnYellow["400"], colors.ptnYellow["300"]),
  received: useColorModeValue(colors.ptnGreen["500"], colors.ptnGreen["600"]),
});

export const CircleStatus = (props: CircleStatus) => {
  const { type } = props;

  const channelColors = getChannelColors();
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
