import {
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { MdContactSupport } from "react-icons/md";
import { BillingCard, BillingCardProps } from "./BillingCard";

export interface PricingCardData {
  features: string[];
  iconFeatures?: string[];
  name: string;
  price: string;
}

interface PricingCardProps extends BillingCardProps {
  data: PricingCardData;
  button: React.ReactElement;
  isPro?: boolean;
  duration?: string;
}

export const PricingCard = (props: PricingCardProps) => {
  const { data, button, isPro, duration = "month", ...rest } = props;
  const { features, price, name } = data;
  const accentColor = useColorModeValue("ptnGreen.700", "ptnGreen.300");
  const freeCard = data.price === "free";

  return (
    <BillingCard
      rounded={{ sm: "xl" }}
      {...rest}
      minH={{ lg: "600px", md: "0" }}
    >
      <VStack spacing={3}>
        <Heading size="md" fontWeight="extrabold">
          {name}
        </Heading>
      </VStack>
      <Flex
        align="flex-end"
        justify="center"
        fontWeight="extrabold"
        color={accentColor}
        my="8"
      >
        {!freeCard && (
          <>
            <Heading size="2xl" fontWeight="inherit" lineHeight="0.9em">
              {price}
            </Heading>

            <Text fontWeight="thin" fontSize="xl" pl="2">
              / {duration}
            </Text>
          </>
        )}
        {freeCard && (
          <Text fontWeight="thin" fontSize="xl">
            {price}
          </Text>
        )}
      </Flex>
      <List spacing="4" mb="8" maxW="28ch" mx="auto">
        {features.map((feature, index) => (
          <ListItem fontWeight="medium" key={index}>
            <ListIcon
              fontSize="xl"
              as={HiCheckCircle}
              marginEnd={2}
              color={accentColor}
            />
            {feature}
          </ListItem>
        ))}

        {isPro && (
          <ListItem fontWeight="medium" key={features.length + 1}>
            <ListIcon
              fontSize="xl"
              as={MdContactSupport}
              marginEnd={2}
              color={accentColor}
            />
            priority support
          </ListItem>
        )}
      </List>
      {button}
    </BillingCard>
  );
};
