import { Box, VStack, Flex, Heading, HStack, Skeleton } from "@chakra-ui/react";
import colors from "../../styles/themes/colors";
import { CircleStatus } from "../indicators/circle-status";
import { mutedText } from "./PtnKey";
import { UserResource } from "@clerk/types";
import { AggregateCount } from "../areas/DashboardArea";
import {
  determineStatusWithOneCount,
  determineStatusWithTwoCounts,
} from "../../helpers/determineChannelStatus";
import { channelMessages, InputMethod } from "../../helpers/channelMessages";
import { AllData } from "../../hooks/useFetchData";

type ChannelStatusProps = {
  inputMethod: string;
  data: AllData | undefined;
  loading: boolean;
  user: UserResource;
};

export type ChannelStatusTypes = "notReady" | "ready" | "received";

export const ChannelStatus = (props: ChannelStatusProps) => {
  const { inputMethod, data, loading, user } = props;

  const statusByInputMethod = {
    sms: determineStatusWithTwoCounts(
      user.phoneNumbers.length,
      data?.smsCount.aggregate.count ?? 0
    ),
    facebook: determineStatusWithTwoCounts(
      data?.facebookChannels.aggregate.count ?? 0,
      data?.facebookCount.aggregate.count ?? 0
    ),
    alfred: determineStatusWithOneCount(data?.alfredCount.aggregate.count ?? 0),
    telegram: determineStatusWithTwoCounts(
      data?.telegramChannels.aggregate.count ?? 0,
      data?.telegramCount.aggregate.count ?? 0
    ),
    zapier: determineStatusWithOneCount(data?.zapierCount.aggregate.count ?? 0),
    email: determineStatusWithTwoCounts(
      user.emailAddresses.length,
      data?.emailCount.aggregate.count ?? 0
    ),
  };
  const channelStatus: ChannelStatusTypes = statusByInputMethod[
    inputMethod as InputMethod
  ] as ChannelStatusTypes;

  const messages = channelMessages(
    (data?.[`${inputMethod}Count` as keyof AllData] as AggregateCount)
      ?.aggregate.count
  )[inputMethod as InputMethod];

  return (
    <Box key={inputMethod} border="thinborder" rounded="md" p="5">
      <VStack align="stretch" spacing={"2"}>
        <Flex justify="space-between" align="baseline" pb="4">
          <Heading color={mutedText()} size="md">
            {inputMethod}
          </Heading>
          {!loading && <CircleStatus type={channelStatus}></CircleStatus>}
        </Flex>
        <Skeleton isLoaded={!loading}>
          <Box>{messages[channelStatus]}</Box>
        </Skeleton>
      </VStack>
    </Box>
  );
};
