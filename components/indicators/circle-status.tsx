import { Box } from "@chakra-ui/react";
import { getChannelColors } from "../widgets/ChannelStatus";

type Status = "green" | "yellow" | "red";

type CircleStatus = {
  type: Status;
};

export const CircleStatus = (props: CircleStatus) => {
  const { type } = props;

  const channelColors = getChannelColors();
  let color = channelColors.ready;
  if (type === "green") {
    color = channelColors.received;
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
