import { ColorHues, Colors, RecursiveObject } from "@chakra-ui/react";

/* Reference for type
 * https://github.com/chakra-ui/chakra-ui/blob/be28abf78957787e0efdabe567443f44985dc1e0/packages/theme/src/theme.types.ts#L36-L38
 */

type PtnColorObject = Record<number | string, string>;
type PtnColors = {
  transparent: string;
  current: string;
  black: string;
  white: string;
  ptnAqua: PtnColorObject;
  ptnTeal: PtnColorObject;
  ptnGreen: PtnColorObject;
  ptnOrange: PtnColorObject;
  ptnYellow: PtnColorObject;
  whiteAlpha: PtnColorObject;
  blackAlpha: PtnColorObject;
  gray: PtnColorObject;
};

const colors: PtnColors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#171F1D",
  white: "#EBF7F4",

  whiteAlpha: {
    50: "rgba(235, 247, 244, 0.04)",
    100: "rgba(235, 247, 244, 0.06)",
    200: "rgba(235, 247, 244, 0.08)",
    300: "rgba(235, 247, 244, 0.16)",
    400: "rgba(235, 247, 244, 0.24)",
    500: "rgba(235, 247, 244, 0.36)",
    600: "rgba(235, 247, 244, 0.48)",
    700: "rgba(235, 247, 244, 0.64)",
    800: "rgba(235, 247, 244, 0.80)",
    900: "rgba(235, 247, 244, 0.92)",
  },

  blackAlpha: {
    50: "rgba(23, 31, 29, 0.04)",
    100: "rgba(23, 31, 29, 0.06)",
    200: "rgba(23, 31, 29, 0.08)",
    300: "rgba(23, 31, 29, 0.16)",
    400: "rgba(23, 31, 29, 0.24)",
    500: "rgba(23, 31, 29, 0.36)",
    600: "rgba(23, 31, 29, 0.48)",
    700: "rgba(23, 31, 29, 0.64)",
    800: "rgba(23, 31, 29, 0.80)",
    900: "rgba(23, 31, 29, 0.92)",
  },

  gray: {
    50: "#F7FAFC",
    100: "#D8ECE6",
    200: "#C0D3CD",
    300: "#A8B9B4",
    400: "#90A09B",
    500: "#84938E",
    600: "#788682",
    700: "#606D69",
    800: "#485350",
    900: "#303937",
  },
  ptnAqua: {
    300: "#97E7F1",
    700: "#1E7E9B",
  },
  ptnTeal: {
    400: "#8BABA2",
    600: "#417668",
    800: "#174E46",
  },
  ptnGreen: {
    100: "#EAFEE9",
    200: "#C0F6BD",
    300: "#97EB91",
    400: "#6FDC69",
    500: "#4CC746",
    700: "#157C10",
    900: "#175605",
  },
  ptnYellow: {
    100: "#F7F2DE",
    200: "#F0DDA8",
    300: "#F2BA71",
  },
  ptnOrange: {
    300: "#F5A377",
    400: "#E67247",
    500: "#AF5F41",
    700: "#784C3B",
    800: "#55322B",
  },
};

export default colors;
