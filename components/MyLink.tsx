import { ReactChild } from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

type MyLinkProps = {
  children: ReactChild;
  href: string;
};

export const MyLink = (props: MyLinkProps) => {
  const { children, href } = props;

  return (
    <Link as={NextLink} href={href} passHref={true}>
      {children}
    </Link>
  );
};
