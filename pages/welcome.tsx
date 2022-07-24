import {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPage,
} from "next";
import { useUser, useSignIn, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { PageWithLayout } from "../types/PageWithLayout";
import WithSidebar from "../components/layouts/WithSidebar";
import WithTopbar from "../components/layouts/WithTopbar";
import Router from "next/router";
import { SignedOutArea } from "../components/areas/SignedOutArea";
import EmptyPage from "../components/layouts/EmptyPage";
import { Spinner } from "@chakra-ui/react";

// Grab the query param server side, and pass through props
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { signInToken: context.query.token ? context.query.token : null },
  };
};

const Welcome: NextPage = ({
  signInToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { signIn, setSession } = useSignIn();
  const { signOut } = useClerk();
  const { isSignedIn } = useUser();
  const [signInStatus, setSignInStatus] = useState<string>("WAITING");

  useEffect(() => {
    if (isSignedIn && setSession) {
      signOut().then(() => {
        setSignInStatus("RESTART");
        return;
      });
    }
    if (!signIn || !signInToken || !setSession) {
      setSignInStatus("ERROR");
      return;
    }

    const aFunc = async () => {
      const res = await signIn.create({
        strategy: "ticket",
        ticket: signInToken as string,
      });

      setSession(res.createdSessionId, () => {
        setSignInStatus("COMPLETE");
      });
    };

    aFunc();
  }, [signIn, signInToken, isSignedIn, setSession, signOut]);

  useEffect(() => {
    if (signInStatus === "COMPLETE") {
      Router.push("/");
    }

    if (signInStatus === "RESTART") {
      Router.push("/welcome?token=" + signInToken);
    }
  }, [signInStatus, signInToken]);

  return (
    <div>
      {signInStatus === "WAITING" && <Spinner />}
      {signInStatus === "ERROR" && <SignedOutArea />}
    </div>
  );
};

(Welcome as PageWithLayout).layout = EmptyPage;

export default Welcome;
