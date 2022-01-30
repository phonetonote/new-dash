import { VStack } from "@chakra-ui/react";

type AreaStackProps = {
  children: React.ReactNode;
};

export const AreaStack = (props: AreaStackProps) => {
  const { children } = props;

  return (
    <VStack align="stretch" spacing="20" pt="4" pb="8">
      {children}
    </VStack>
  );
};
