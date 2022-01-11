import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

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
    color: mode(colors.ptnAqua["700"], colors.ptnAqua["300"])(props),
  }),
};

export default Link;
