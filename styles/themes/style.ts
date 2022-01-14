import { Styles, mode, darken, lighten } from "@chakra-ui/theme-tools";
import colors from "./colors";
import typography from "./foundations/typography";

export const bgColor = (props: any) =>
  mode(colors.gray["200"], colors.black)(props);

/* Reference for types
 * https://github.com/chakra-ui/chakra-ui/blob/db51ff6063996a834f1880813673953a3ff5c524/packages/theme/src/styles.ts#L1-L23
 */
const styles: Styles = {
  global: (props) => ({
    ":root": {
      "--shadowColor": mode("190deg 50% 25%", "150deg 40% 50%")(props),
      "--outlineColor": mode(
        colors.ptnAqua["700"],
        colors.ptnAqua["300"]
      )(props),
      ".cl-auth-form-body, .cl-auth-form-body button": {
        textTransform: "lowercase",
      },
      ".cl-modal-container > div": {
        width: "95%",
      },
      ".cl-modal-container .cl-sign-in, .cl-modal-container .cl-sign-up": {
        margin: "0 auto",
      },
    },
    ".stand-out": {
      backgroundColor: mode(colors.gray["100"], colors.gray["800"])(props),
    },
    strong: {
      fontWeight: typography.fontWeights.textBold,
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
