import { IconButton, useColorMode } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
export const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="toggle color mode"
      onClick={toggleColorMode}
      variant="outline"
      isRound={true}
      icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
    />
  );
};
