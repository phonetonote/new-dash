import {
  Alert,
  AlertIcon,
  Badge,
  HStack,
  Skeleton,
  SkeletonText,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { CalmSkeleton } from "../indicators/CalmSkeleton";

type SubscriptionBadgeProps = {
  status: String;
  nickname: String;
  loading: boolean;
  hasRoamDepotCoupon: boolean;
};

const getExtraWords = (
  nickname: String,
  hasRoamDepotCoupon: boolean
): string => {
  if (!hasRoamDepotCoupon) {
    return "";
  } else {
    if (nickname.includes("standard")) {
      return "your standard subscription is free!";
    } else if (nickname.includes("pro")) {
      return "thanks for supporting with a pro subscription, the coupon has been automatically applied";
    }
    return "discount applied at stripe checkout";
  }
};

export const SubscriptionBadge = (props: SubscriptionBadgeProps) => {
  const { status, nickname, loading, hasRoamDepotCoupon } = props;

  const extraWords = getExtraWords(nickname, hasRoamDepotCoupon);

  return (
    <CalmSkeleton isLoaded={!loading}>
      <VStack align="left" style={{ marginBottom: "36px" }}>
        <HStack>
          <Badge variant="outline">{status?.replaceAll("_", " ")}</Badge>
          <Badge variant="outline">{nickname?.replaceAll("_", " ")}</Badge>
        </HStack>

        {hasRoamDepotCoupon && (
          <Alert status="success" variant="subtle">
            <AlertIcon />
            you get an extra $5 off per month from roam depot. {extraWords}
          </Alert>
        )}
      </VStack>
    </CalmSkeleton>
  );
};
