import { accordionAnatomy as parts } from "@chakra-ui/anatomy";
import { useColorModeValue } from "@chakra-ui/react";
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";
import colors from "../colors";

const baseStyleContainer: SystemStyleObject = {
  _first: {
    borderTopWidth: "0",
  },
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "0",
  },
};

const baseStyleButton: SystemStyleFunction = (props) => {
  const activeAccordion = {
    borderBottom: "1px solid red",
  };
  return {
    transitionProperty: "common",
    transitionDuration: "normal",
    fontSize: "1rem",
    _expanded: {
      bg: `linear-gradient(90deg, transparent, ${mode(
        colors.blackAlpha["200"],
        colors.whiteAlpha["200"]
      )(props)}, transparent)`,
      borderBottom: "1px solid",
      borderBottomColor: mode(
        colors.ptnTeal["400"],
        colors.ptnGreen["300"]
      )(props),
    },
    _hover: {
      bg: `linear-gradient(90deg, transparent, ${mode(
        colors.blackAlpha["100"],
        colors.whiteAlpha["100"]
      )(props)}, transparent)`,
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    px: 0,
    py: 2,
  };
};

const baseStylePanel: SystemStyleObject = {
  pt: 2,
  px: 0,
  pb: 5,
};

const baseStyleIcon: SystemStyleObject = {
  fontSize: "1.25em",
};

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  container: baseStyleContainer,
  button: baseStyleButton(props),
  panel: baseStylePanel,
  icon: baseStyleIcon,
});

export default {
  parts: parts.keys,
  baseStyle,
};
