import {
  useBoolean,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { ChannelStatusTypes } from "../components/widgets/ChannelStatus";
import colors from "../styles/themes/colors";

export const useChannelColors = (): { [key in ChannelStatusTypes]: string } => {
  return {
    notReady: useColorModeValue(colors.ptnRed["500"], colors.ptnRed["500"]),
    ready: useColorModeValue(colors.ptnYellow["400"], colors.ptnYellow["300"]),
    received: useColorModeValue(colors.ptnGreen["500"], colors.ptnGreen["600"]),
  };
};

export const useMutedColor = (): string =>
  useColorModeValue("blackAlpha.700", "whiteAlpha.700");
