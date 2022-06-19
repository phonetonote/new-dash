import {
  Badge,
  HStack,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import { CalmSkeleton } from "../indicators/CalmSkeleton";

type SubscriptionBadgeProps = {
  status: String;
  nickname: String;
  loading: boolean;
};

export const SubscriptionBadge = (props: SubscriptionBadgeProps) => {
  const { status, nickname, loading } = props;

  return (
    <CalmSkeleton isLoaded={!loading}>
      <HStack>
        <Badge variant="outline">{status?.replaceAll("_", " ")}</Badge>
        <Badge variant="outline">{nickname?.replaceAll("_", " ")}</Badge>
      </HStack>
    </CalmSkeleton>
  );
};
