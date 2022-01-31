import { IconButton, useColorMode } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
export const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const currentlyLight = colorMode === "light";

  return (
    <IconButton
      title={`switch to ${currentlyLight ? "dark" : "light"} mode`}
      aria-label="toggle color mode"
      onClick={toggleColorMode}
      variant="outline"
      isRound={true}
      icon={currentlyLight ? <FiMoon /> : <FiSun />}
    />
  );
};
