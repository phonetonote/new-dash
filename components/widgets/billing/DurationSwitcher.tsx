import {
  Box,
  Center,
  createIcon,
  Flex,
  FlexProps,
  Text,
  useColorModeValue as mode,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from "@chakra-ui/react";
import * as React from "react";
import { ActiveIndicator } from "./ActiveIndicator";

const CurvedLine = createIcon({
  viewBox: "0 0 38 20",
  path: (
    <path
      fill="none"
      d="M1.5 18.5H21C29.8366 18.5 37 11.3366 37 2.5V1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});

export const RadioButton = (
  props: UseRadioProps & { children?: React.ReactNode }
) => {
  const { getInputProps, getCheckboxProps, getLabelProps, state } =
    useRadio(props);
  return (
    <Box as="label" pos="relative" {...getLabelProps()}>
      <input {...getInputProps()} />
      <Center
        {...getCheckboxProps()}
        cursor="pointer"
        pos="relative"
        zIndex={1}
        h="12"
        px="8"
        textAlign="center"
        transition="all 0.2s"
        minW="8rem"
        fontWeight="medium"
        _checked={{
          color: mode("ptnGreen.700", "ptnGreen.300"),
          fontWeight: "bold",
        }}
      >
        {props.children}
      </Center>
      {state.isChecked && (
        <ActiveIndicator
          bg={mode("gray.200", "gray.700")}
          shadow="md"
          layoutId="highlight"
          transition={{ duration: "0.1" }}
        />
      )}
    </Box>
  );
};

export const DurationSwitcher = (props: FlexProps) => {
  const { getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: "monthly",
  });
  return (
    <Box pos="relative">
      {/* <AnimateSharedLayout> */}
      <Flex
        display="inline-flex"
        align="center"
        bg={mode("gray.100", "gray.800")}
        rounded="full"
        {...getRootProps(props)}
      >
        <RadioButton {...getRadioProps({ value: "monthly" })}>
          monthly
        </RadioButton>
        <RadioButton {...getRadioProps({ value: "yearly" })}>
          yearly
        </RadioButton>
      </Flex>
      {/* </AnimateSharedLayout> */}
      <Box
        color={mode("ptnGreen.700", "ptnGreen.300")}
        pos="absolute"
        right="-7rem"
        top="-5"
      >
        <Text lineHeight="1" fontWeight="bold">
          save 17%
        </Text>
        <CurvedLine fontSize="2.5rem" pos="relative" right="8" top="0" />
      </Box>
    </Box>
  );
};
