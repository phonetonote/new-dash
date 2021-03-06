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
      "--shadowColor": mode("160deg 21% 81%", "150deg 50% 12%")(props),
      "--boldShadowColor": mode("160deg 58% 21%", "150deg 33% 55%")(props),
      "--outlineColor": mode(
        colors.ptnAqua["700"],
        colors.ptnAqua["300"]
      )(props),
      "--thinOutlineColor": mode(colors.gray["200"], colors.gray["800"])(props),
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
    ".js-focus-visible :focus:not([data-focus-visible-added])": {
      outline: "none",
      boxShadow: "none",
    },
  }),
};

export default styles;
