import {
  Box,
  BoxProps,
  createIcon,
  HStack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useContext, useEffect } from "react";
import { HiChevronRight, HiOutlineChevronRight } from "react-icons/hi";
import { ActiveTitleContext } from "../areas/DashboardArea";

interface SidebarLinkProps extends BoxProps {
  icon?: React.ReactElement;
  href: string;
  title: string;
}

export const printTitle = (title: string): string => title.replace("-", " ");
export const condenseTitle = (title: string): string =>
  title.trim().replace(" ", "-");

export const SidebarLink = (props: SidebarLinkProps) => {
  const {
    children,
    href,
    title,
    icon = <HiOutlineChevronRight />,
    ...rest
  } = props;
  const router = useRouter();

  useEffect(() => {
    const onHashChangeStart = (url: string) => {
      console.log(`Path changing to ${url}`);
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  const isActiveTitle = router.asPath.includes(title);

  const activeColor = mode("ptnGreen.700", "ptnGreen.300");
  const activeBgColor = mode("gray.100", "gray.900");
  const inactiveColor = mode("black", "white");

  const activeLink = {
    color: activeColor,
    bg: activeBgColor,
  };

  const inactiveLink = { color: inactiveColor };
  const applicableStyles = isActiveTitle ? activeLink : inactiveLink;

  return (
    // #TODO use next.js links
    <Link href={href} passHref scroll={false}>
      <Box
        as="a"
        marginEnd="2"
        fontSize="sm"
        display="block"
        px="3"
        py="1"
        rounded="md"
        cursor="pointer"
        _hover={{ ...activeLink }}
        className="group"
        fontWeight="medium"
        transition="background .1s ease-out"
        {...applicableStyles}
        {...rest}
      >
        <HStack>
          <Box opacity={0.5} _groupHover={{ opacity: 1 }}>
            {icon}
          </Box>
          <Text>{printTitle(title)}</Text>
        </HStack>
      </Box>
    </Link>
  );
};
