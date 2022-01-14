import {
  Box,
  Collapse,
  SimpleGrid,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FiChevronDown } from "react-icons/fi";
import { NavLink } from "./NavLink";
import { NavMenu } from "./NavMenu";
import { SubmenuItem as DesktopMenuItem } from "./SubmenuItem";
import { useNavMenu } from "../../hooks/useNavMenu";
import { Link } from "./_data";
import colors from "../../styles/themes/colors";

interface SubmenuProps {
  link: Link;
}

const DesktopSubmenu = (props: SubmenuProps) => {
  const { link } = props;
  const { isOpen, getMenuProps, getTriggerProps } = useNavMenu();
  return (
    <>
      <NavLink.Desktop
        display="flex"
        alignItems="center"
        as="button"
        type="button"
        px="4"
        {...getTriggerProps()}
      >
        <Box>{link.label}</Box>
        <Box marginStart="2" as={FiChevronDown} />
      </NavLink.Desktop>

      <NavMenu
        {...getMenuProps()}
        animate={isOpen ? "open" : "closed"}
        borderY={`1px solid ${useColorModeValue(
          colors.gray["200"],
          colors.gray["800"]
        )}`}
        py={10}
      >
        <Box maxW="7xl" mx="auto" px="8">
          <SimpleGrid spacing="10" columns={2}>
            {link.children?.map((item, idx) => (
              <DesktopMenuItem
                key={idx}
                title={item.label}
                href={item.href}
                icon={item.icon}
              >
                {item.description}
              </DesktopMenuItem>
            ))}
          </SimpleGrid>
        </Box>
      </NavMenu>
    </>
  );
};

const MobileSubMenu = (props: SubmenuProps) => {
  const { link } = props;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <NavLink.Mobile
        as="button"
        textAlign="start"
        type="button"
        cursor="pointer"
        onClick={onToggle}
      >
        <Box flex="1">{link.label}</Box>
        <Box
          as={FiChevronDown}
          size={25}
          transform={`rotate(${isOpen ? "180deg" : "0deg"})`}
        />
      </NavLink.Mobile>
      <Collapse in={isOpen}>
        <Box>
          {link.children?.map((item, idx) => (
            <NavLink.Mobile
              key={idx}
              href={item.href}
              borderBottomWidth={0}
              color={useColorModeValue("black", "ptnGreen.100")}
            >
              {item.label}
            </NavLink.Mobile>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export const Submenu = {
  Mobile: MobileSubMenu,
  Desktop: DesktopSubmenu,
};
