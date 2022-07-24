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
  const {
    query: { token: signInToken, clerkIdFromRoam },
  } = context;
  return {
    props: {
      signInToken,
      clerkIdFromRoam,
    },
  };
};

const Welcome: NextPage = ({
  signInToken,
  clerkIdFromRoam,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { signOut } = useClerk();
  const { signIn, setSession } = useSignIn();
  const { isSignedIn, user } = useUser();
  const [signInStatus, setSignInStatus] = useState<string>("WAITING");

  useEffect(() => {
    console.log("beginning: signInToken", signInToken);
    console.log("beginning: isSignedIn", isSignedIn);
    console.log("beginning: isSignedIn", user);
    if (isSignedIn) {
      console.log("isSignedIn?!");
      if (user && user.id && clerkIdFromRoam && user.id !== clerkIdFromRoam) {
        alert(
          "you were previously logged into phonetonote with a different account. you are now logged out of the old one. please relick the dashboard link to sign in with the correct account."
        );

        signOut().then(() => {
          setSignInStatus("COMPLETE");
        });
      }
      setSignInStatus("COMPLETE");
      return;
    }
    if (!signIn || !signInToken || !setSession) {
      console.log("error ??");
      setSignInStatus("ERROR");
      return;
    }

    const aFunc = async () => {
      console.log("aFunc awaiting");
      const res = await { createdSessionId: "foobar" };

      console.log("aFunc res:", res);

      console.log("setting session", res.createdSessionId);
      setSession(res.createdSessionId, () => {
        setSignInStatus("COMPLETE");
      });
    };

    aFunc();
    console.log("\n\n");
  }, [signIn, signInToken, clerkIdFromRoam]);

  useEffect(() => {
    if (signInStatus === "COMPLETE") {
      Router.push("/");
    }
  }, [signInStatus]);

  return (
    <div>
      {signInStatus === "WAITING" && <Spinner />}
      {signInStatus === "ERROR" && <SignedOutArea />}
    </div>
  );
};

(Welcome as PageWithLayout).layout = EmptyPage;

export default Welcome;
