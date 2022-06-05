import { Badge, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

type SubscriptionBadgeProps = {
  status: String;
  nickname: String;
  loading: boolean;
};

export const SubscriptionBadge = (props: SubscriptionBadgeProps) => {
  const { status, nickname, loading } = props;

  return (
    <>
      <Skeleton noOfLines={1} isLoaded={!loading}>
        <HStack>
          <Badge variant="outline">{status?.replaceAll("_", " ")}</Badge>
          <Badge variant="outline">{nickname?.replaceAll("_", " ")}</Badge>
        </HStack>
      </Skeleton>
    </>
  );
};
