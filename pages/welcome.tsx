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
    const doSomething = async () => {
      if (!user?.id) {
        return;
      } else {
        if (isSignedIn && signInStatus === "WAITING") {
          console.log("isSignedIn already");
          if (clerkIdFromRoam && user.id !== clerkIdFromRoam) {
            alert(
              "you were previously logged into phonetonote with a different account. you are now logged out of the old one. please relick the dashboard link to sign in with the correct account."
            );
            setSignInStatus("SIGN_OUT_THEN_COMPLETE");
          } else {
            setSignInStatus("COMPLETE");
          }
        }
      }
    };

    doSomething();
  }, [isSignedIn, user, clerkIdFromRoam]);

  useEffect(() => {
    if (!signIn || !signInToken || !setSession) {
      console.log("error ??");
      setSignInStatus("ERROR");
      return;
    } else if (signInStatus === "WAITING") {
      setSignInStatus("WORKING");
      const getAndSetSession = async () => {
        console.log("getAndSetSession getting new session from clerk");
        const res = await signIn.create({
          strategy: "ticket",
          ticket: signInToken as string,
        });

        console.log("response from clerk: ", res);
        console.log("setting new session", res.createdSessionId);

        setSession(res.createdSessionId, () => {
          setSignInStatus("COMPLETE");
        });
      };

      getAndSetSession();
    }

    console.log("\n\n");
  }, [signIn, signInToken, setSession]);

  useEffect(() => {
    console.log("signInStatus: ", signInStatus);
    if (signInStatus === "COMPLETE") {
      console.log("redirecting to /");
      Router.push("/");
    } else if (signInStatus === "SIGN_OUT_THEN_COMPLETE") {
      signOut().then(() => {
        setSignInStatus("COMPLETE");
      });
    }
  }, [signInStatus, signOut]);

  return (
    <div>
      {signInStatus === "WAITING" && <Spinner />}
      {signInStatus === "ERROR" && <SignedOutArea />}
    </div>
  );
};

(Welcome as PageWithLayout).layout = EmptyPage;

export default Welcome;
