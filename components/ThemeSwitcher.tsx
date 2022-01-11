import { IconButton, useColorMode } from "@chakra-ui/react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
export const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="toggle color mode"
      onClick={toggleColorMode}
      variant="outline"
      isRound={true}
      icon={colorMode === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
    />
  );
};
