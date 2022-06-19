import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  useColorModeValue as mode,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import * as React from "react";
import typography from "../../styles/themes/foundations/typography";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { NavMenu } from "./NavMenu";
import { Submenu } from "./Submenu";
import { ToggleButton } from "./ToggleButton";
import { links } from "./_data";
import NextLink from "next/link";

const MobileNavContext = (props: FlexProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Flex
        align="center"
        justify={{ base: "space-between", md: "space-around" }}
        className="nav-content__mobile"
        {...props}
      >
        <Box flexBasis="6rem">
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
        <Box mx={{ md: "auto", base: 0 }}>
          <Logo h="24px" />
        </Box>
        <Box
          visibility={{ base: "hidden", sm: "visible" }}
          display={{ base: "none", sm: "flex" }}
        >
          <SignedIn>
            <NextLink href="/" passHref>
              <Button as="a" variant="solid">
                dashboard
              </Button>
            </NextLink>
          </SignedIn>
          <SignedOut>
            <SignUpButton mode="modal">
              <Button as="a" href="#" variant="ptn">
                sign up
              </Button>
            </SignUpButton>
          </SignedOut>
        </Box>
      </Flex>
      <NavMenu animate={isOpen ? "open" : "closed"}>
        {links.map((link, idx) =>
          link.children ? (
            <Submenu.Mobile key={idx} link={link} />
          ) : (
            <NavLink.Mobile key={idx} href={link.href}>
              {link.label}
            </NavLink.Mobile>
          )
        )}

        <SignedIn>
          <Button as="a" variant={"outline"} w="full" size="lg" mt="5">
            go to dashboard
          </Button>
        </SignedIn>
        <SignedOut>
          <SignUpButton mode="modal">
            <Button
              as="a"
              href="#"
              variant={"outline"}
              w="full"
              size="lg"
              mt="5"
            >
              get started for free
            </Button>
          </SignUpButton>
        </SignedOut>
      </NavMenu>
    </>
  );
};

const DesktopNavContent = (props: FlexProps) => {
  return (
    <Flex
      className="nav-content__desktop"
      align="center"
      justify="space-between"
      {...props}
    >
      <Logo></Logo>

      <HStack
        as="ul"
        id="nav__primary-menu"
        aria-label="Main Menu"
        listStyleType="none"
      >
        {links.map((link, idx) => (
          <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
            {link.children ? (
              <Submenu.Desktop link={link} />
            ) : (
              <NavLink.Desktop href={link.href}>{link.label}</NavLink.Desktop>
            )}
          </Box>
        ))}
      </HStack>
      <HStack spacing="8" minW="240px" justify="flex-end">
        <SignedIn>
          <NextLink href="/" passHref>
            <Button as="a" variant="ptn">
              dashboard
            </Button>
          </NextLink>
        </SignedIn>
        <SignedOut>
          <SignInButton
            mode="modal"
            redirectUrl={`${process.env.NEXT_PUBLIC_NEW_DASHBOARD_SITE}`}
          >
            <Button variant={"ghost"}>sign in</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button as="a" href="#" variant="ptn">
              sign up for free
            </Button>
          </SignUpButton>
        </SignedOut>
      </HStack>
    </Flex>
  );
};

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
};
