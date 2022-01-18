import { getColor, mode, transparentize } from "@chakra-ui/theme-tools";
import type {
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";
import typography from "../foundations/typography";

const baseStyle: SystemStyleObject = {
  px: 2,
  py: 1,
  rounded: "md",
  textTransform: "lowercase",
  fontWeight: typography.fontWeights.normal,
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;
  const dark = transparentize(`${c}.500`, 0.6)(theme);
  return {
    bg: mode(`${c}.500`, dark)(props),
    color: mode(`white`, `whiteAlpha.800`)(props),
  };
};

const variantSubtle: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;
  const darkBg = transparentize(`${c}.200`, 0.16)(theme);
  return {
    bg: mode(`${c}.100`, darkBg)(props),
    color: mode(`${c}.800`, `${c}.200`)(props),
  };
};

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;
  const darkColor = transparentize(`${c}.200`, 0.8)(theme);
  const lightColor = getColor(theme, `${c}.500`);
  const color = mode(lightColor, darkColor)(props);

  return {
    color,
    boxShadow: `inset 0 0 0px 1px ${color}`,
  };
};

const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
  outline: variantOutline,
};

const defaultProps = {
  variant: "subtle",
  colorScheme: "gray",
};

export default {
  baseStyle,
  variants,
  defaultProps,
};