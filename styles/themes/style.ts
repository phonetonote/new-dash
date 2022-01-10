import { Styles, mode, darken, lighten } from "@chakra-ui/theme-tools";
import colors from "./colors";
import typography from "./foundations/typography";

export const bgColor = (props: any) => mode(colors.white, colors.black)(props);

/* Reference for types
 * https://github.com/chakra-ui/chakra-ui/blob/db51ff6063996a834f1880813673953a3ff5c524/packages/theme/src/styles.ts#L1-L23
 */
const styles: Styles = {
  global: (props) => ({
    ":root": {
      "--shadowColor": mode("190deg 50% 25%", "150deg 40% 50%")(props),
      "--outlineColor": mode(
        colors.ptnGreen["400"],
        colors.ptnGreen["400"]
      )(props),
    },
    ".stand-out": {
      backgroundColor: mode(colors.gray["100"], colors.gray["800"])(props),
    },
    strong: {
      fontWeight: typography.fontWeights.bold,
    },
    a: {
      color: mode(colors.ptnAqua[700], colors.ptnAqua[300])(props),
      _hover: {
        color: mode(
          darken(colors.ptnAqua[700], 5),
          lighten(colors.ptnAqua[300], 5)
        )(props),
      },
      _active: {
        color: mode(
          darken(colors.ptnAqua[700], 10),
          lighten(colors.ptnAqua[300], 10)
        )(props),
      },
    },
    body: {
      bg: bgColor(props),
      color: mode(colors.black, colors.white)(props),
    },
  }),
};

export default styles;
