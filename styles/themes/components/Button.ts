import {
  mode,
  SystemStyleInterpolation,
  transparentize,
} from "@chakra-ui/theme-tools";
import type {
  SystemStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools";
import { ComponentSingleStyleConfig } from "@chakra-ui/theme";
import typography from "../foundations/typography";
import { space } from "@chakra-ui/react";
import colors from "../colors";

const baseStyle: SystemStyleObject = {
  lineHeight: "1.2",
  borderRadius: "md",
  cursor: "pointer",
  fontWeight: typography.fontWeights.normal,
  transitionProperty: "common",
  transitionDuration: "normal",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    _disabled: {
      bg: "initial",
    },
  },
};

const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  if (c === "gray") {
    return {
      color: mode(`blackAlpha.900`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props),
        color: mode(`black`, `ptnGreen.200`)(props),
      },
      _active: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        color: mode(`blackAlpha.800`, `ptnGreen.300`)(props),
      },
    };
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme);
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme);

  return {
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: "transparent",
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props),
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props),
    },
  };
};

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.400`, `whiteAlpha.300`)(props);
  return {
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor",
    ...variantGhost(props),
  };
};

const varaintPtn: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  const borderColor = mode(`ptnTeal.400`, `ptnGreen.500`)(props);
  const backgroundColor = mode(`ptnTeal.600`, `ptnGreen.300`)(props);
  const activeBackgroundColor = mode(`ptnTeal.800`, `ptnGreen.100`)(props);
  const color = mode(`white`, `ptnGreen.900`)(props);
  const boxShadowColor = mode(
    colors.ptnTeal["800"],
    colors.ptnGreen["100"]
  )(props);

  return {
    border: "3px solid",
    padding: "18px",
    borderRadius: "12px",
    borderColor: c === "gray" ? borderColor : "currentColor",
    backgroundColor: c === "gray" ? backgroundColor : "gray.400",
    color: c === "gray" ? color : "currentColor",
    _hover: {
      color: c === "gray" ? color : "currentColor",
      boxShadow: `-3px 3px 0px ${boxShadowColor}`,
    },
    _active: {
      color: c === "gray" ? color : "currentColor",
      boxShadow: "none",
      backgroundColor: activeBackgroundColor,
    },
  };
};

type AccessibleColor = {
  bg?: string;
  color?: string;
  hoverBg?: string;
  activeBg?: string;
};

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600",
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600",
  },
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;

  if (c === "gray") {
    const bg = mode(`gray.100`, `whiteAlpha.200`)(props);

    return {
      color: mode("gray.600", "ptnGreen.200")(props),
      bg,
      _hover: {
        color: mode(`gray.700`, `ptnGreen.300`)(props),
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg,
        },
      },
      _active: {
        bg: mode(`gray.300`, `whiteAlpha.400`)(props),
        color: mode(`gray.800`, `ptnGreen.400`)(props),
      },
    };
  }

  const {
    bg = `${c}.500`,
    color = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] ?? {};

  const background = mode(bg, `${c}.200`)(props);

  return {
    bg: background,
    color: mode(color, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) },
  };
};

const variantLink: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none",
      },
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props),
    },
  };
};

const variantUnstyled = {
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: 0,
  p: 0,
};

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  ptn: varaintPtn,
  unstyled: variantUnstyled,
};

const defaultProps = {
  variant: "solid",
  size: "md",
  colorScheme: "gray",
};

const toExport: ComponentSingleStyleConfig = {
  baseStyle,
  variants,
  ...defaultProps,
};

export default { ...toExport };
