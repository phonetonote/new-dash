import { ComponentStyleConfig } from "@chakra-ui/react";
import { darken, mode } from "@chakra-ui/theme-tools";

import colors from "../colors";

/* Reference for types
 * https://github.com/chakra-ui/chakra-ui/blob/db51ff6063996a834f1880813673953a3ff5c524/packages/theme/src/theme.types.ts#L80-L82
 */
const Link: ComponentStyleConfig = {
  // Styles for the base style
  baseStyle: (props: any) => ({
    _focus: {
      boxShadow: "none",
    },
    color: mode(colors.ptnAqua["800"], colors.ptnAqua["300"])(props),
    textDecoration: "underline",
    _hover: {
      textDecoration: "none",
    },
  }),
};

export default Link;
