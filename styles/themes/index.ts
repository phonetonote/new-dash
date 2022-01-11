import { ChakraTheme, theme as baseTheme, extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import config from "./config";
import styles from "./style";
import typography from "./foundations/typography";
import borders from "./foundations/borders";
import shadows from "./foundations/shadows";
import components from "./components";

/* List of theme key
 * https://github.com/chakra-ui/chakra-ui/blob/5c6397a318fba95b35b6cfcd9c15fb22820fe579/packages/theme/src/utils.ts#L4-L23
 * [
    "borders",
    "breakpoints",
    "colors",
    "components",
    "config",
    "direction",
    "fonts",
    "fontSizes",
    "fontWeights",
    "letterSpacings",
    "lineHeights",
    "radii",
    "shadows",
    "sizes",
    "space",
    "styles",
    "transition",
    "zIndices",
   ]
 */
const override: ChakraTheme = {
  ...baseTheme,
  ...typography,
  colors,
  components: {
    ...components,
  },
  config,
  shadows,
  borders,
  styles,
};

export default extendTheme(override);
