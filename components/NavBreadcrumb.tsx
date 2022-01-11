import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/react";
import * as React from "react";
import { HiChevronRight, HiOutlineChevronRight } from "react-icons/hi";

export const NavBreadcrumb = (props: BreadcrumbProps) => (
  <Breadcrumb
    fontSize="sm"
    {...props}
    separator={
      <Box
        as={HiOutlineChevronRight}
        color="gray.400"
        fontSize="md"
        top="2px"
        pos="relative"
      />
    }
  >
    <BreadcrumbItem color="inherit">
      <BreadcrumbLink>Welcome</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem color="inherit" isCurrentPage>
      <BreadcrumbLink>Product Vision</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);
