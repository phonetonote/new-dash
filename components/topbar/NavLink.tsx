import {
  chakra,
  HTMLChakraProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import colors from "../../styles/themes/colors";

interface NavLinkProps extends HTMLChakraProps<"a"> {
  active?: boolean;
}

export const navColors = {
  light: {
    color: "gray.500",
    hover: "gray.700",
    active: "gray.900",
  },

  dark: {
    color: "whiteAlpha.700",
    hover: "ptnGreen.200",
    active: "ptnGreen.300",
  },
};

const DesktopNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    const { active, ...rest } = props;
    return (
      <chakra.a
        ref={ref}
        display="inline-block"
        px="4"
        py="6"
        aria-current={active ? "page" : undefined}
        color={mode(navColors.light.color, navColors.dark.color)}
        transition="all 0.2s"
        {...rest}
        _hover={{ color: mode(navColors.light.hover, navColors.dark.hover) }}
        _active={{ color: mode(navColors.light.active, navColors.dark.active) }}
        _activeLink={{
          color: "blue.600",
        }}
      />
    );
  }
);
DesktopNavLink.displayName = "DesktopNavLink";

export const MobileNavLink = (props: NavLinkProps) => {
  const { active, children, ...rest } = props;
  return (
    <chakra.a
      aria-current={active ? "page" : undefined}
      w="full"
      display="flex"
      alignItems="center"
      height="14"
      borderBottomWidth={0}
      px={2}
      py={2}
      mb={0}
      borderRadius={6}
      color={mode(navColors.light.color, navColors.dark.color)}
      _hover={{
        bg: mode("blackAlpha.100", "whiteAlpha.100"),
        color: mode("gray.700", "white"),
      }}
      _active={{ color: mode(navColors.light.color, navColors.dark.color) }}
      {...rest}
    >
      children
    </chakra.a>
  );
};

export const NavLink = {
  Mobile: MobileNavLink,
  Desktop: DesktopNavLink,
};
