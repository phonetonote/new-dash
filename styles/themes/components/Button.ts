import { mode, transparentize } from "@chakra-ui/theme-tools";
import type {
  SystemStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools";
import colors from "../colors";
import typography from "../foundations/typography";

const baseStyle: SystemStyleObject = {
  lineHeight: "1.2",
  borderRadius: "md",
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
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
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
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
  return {
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor",
    ...variantGhost(props),
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
    const bg = mode(`gray.100`, `whiteAlpha.900`)(props);

    return {
      bg,
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.800`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.700`)(props) },
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

const ptnButton = {
  borderRadius: "12px",
  border: "3px solid",
};

const ptnPrimary: SystemStyleFunction = (props) => {
  return {
    ...ptnButton,
    backgroundColor: mode(colors.ptnTeal["600"], colors.ptnGreen["300"])(props),
    color: mode(colors.ptnGreen["100"], colors.ptnGreen["900"])(props),
    borderColor: mode(colors.ptnTeal["400"], colors.ptnGreen["500"])(props),

    _hover: {
      boxShadow: mode(
        `-3px 3px 0 0 ${colors.ptnTeal["800"]}`,
        `-3px 3px 0 0 ${colors.ptnGreen["100"]}`
      )(props),
    },
    _active: {
      backgroundColor: mode(
        colors.ptnTeal["800"],
        colors.ptnGreen["100"]
      )(props),
    },
  };
};

const ptnSecondary: SystemStyleFunction = (props) => {
  return {
    ...ptnButton,
    backgroundColor: mode(
      colors.ptnOrange["500"],
      colors.ptnOrange["300"]
    )(props),
    color: mode(colors.ptnYellow["100"], colors.ptnOrange["800"])(props),
    borderColor: mode(colors.ptnOrange["300"], colors.ptnOrange["500"])(props),

    _hover: {
      boxShadow: mode(
        `-3px 3px 0 0 ${colors.ptnOrange["700"]}`,
        `-3px 3px 0 0 ${colors.ptnYellow["100"]}`
      )(props),
    },
    _active: {
      backgroundColor: mode(
        colors.ptnOrange["700"],
        colors.ptnYellow["100"]
      )(props),
    },
  };
};

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  ptnPrimary: ptnPrimary,
  ptnSecondary: ptnSecondary,
};

const defaultProps = {
  variant: "solid",
  size: "md",
  colorScheme: "gray",
};

export default {
  baseStyle,
  variants,
  defaultProps,
};
