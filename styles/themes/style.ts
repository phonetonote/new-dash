import { Styles, mode, darken, lighten } from "@chakra-ui/theme-tools";
import colors from "./colors";
import typography from "./foundations/typography";

/* Reference for types
 * https://github.com/chakra-ui/chakra-ui/blob/db51ff6063996a834f1880813673953a3ff5c524/packages/theme/src/styles.ts#L1-L23
 */
const styles: Styles = {
  global: (props) => ({
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
      bg: mode(colors.white, colors.black)(props),
      color: mode(colors.black, colors.white)(props),
    },
  }),
};

export default styles;
