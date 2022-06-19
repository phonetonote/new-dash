import { Skeleton, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

type CalmSkeletonProps = {
  children: React.ReactNode;
  isLoaded: boolean;
};
export const CalmSkeleton = (props: CalmSkeletonProps) => {
  const { children, isLoaded } = props;
  return (
    <Skeleton
      startColor={useColorModeValue("whiteAlpha.100", "blackAlpha.100")}
      endColor={useColorModeValue("whiteAlpha.200", "blackAlpha.700")}
      speed={1.2}
      isLoaded={isLoaded}
    >
      {children}
    </Skeleton>
  );
};
