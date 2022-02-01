import { ChannelStatusTypes } from "../components/widgets/ChannelStatus";

export const determineStatusWithTwoCounts = (
  countOfResources: number,
  countOfMessages: number
): ChannelStatusTypes => {
  if (countOfResources === 0) {
    return "notReady";
  }

  if (countOfMessages === 0) {
    return "ready";
  }

  return "received";
};

export const determineStatusWithOneCount = (
  countOfMessages: number
): ChannelStatusTypes => {
  if (countOfMessages === 0) {
    return "ready";
  }

  return "received";
};
