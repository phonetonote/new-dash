import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import type { NextPage } from "next";

const SSOCallback: NextPage = (props) => {
  return <AuthenticateWithRedirectCallback />;
};

export default SSOCallback;
