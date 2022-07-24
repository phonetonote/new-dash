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
  const { user } = useUser();
  const [signInProcessed, setSignInProcessed] = useState<boolean>(false);

  useEffect(() => {
    if (!signIn || !setSession || !signInToken) {
      return;
    }

    const aFunc = async () => {
      try {
        // check if already logged in to old account
        console.log("user", user);
        console.log("clerkIdFromRoam", clerkIdFromRoam);

        if (user) {
          if (clerkIdFromRoam && clerkIdFromRoam !== user.id) {
            // sign out of old account
            await signOut();
            setSignInProcessed(true);
          } else if (clerkIdFromRoam && clerkIdFromRoam === user.id) {
            // already logged in to old account
            setSignInProcessed(true);
          }
        }

        const res = await signIn.create({
          strategy: "ticket",
          ticket: signInToken as string,
        });

        setSession(res.createdSessionId, () => {
          setSignInProcessed(true);
        });
      } catch (err) {
        setSignInProcessed(true);
      }
    };

    aFunc();
  }, [signIn, setSession, user]);

  useEffect(() => {
    console.log("signInProcessed", signInProcessed);
    console.log("user", user);

    if (user && signInProcessed) {
      Router.push("/");
    }
  }, [signInProcessed, user]);

  if (!signInToken) {
    return <div>no token provided</div>;
  }

  if (!signInProcessed) {
    return <div>loading</div>;
  } else {
    console.log("user", user);

    if (!user) {
      return <div>error invalid token</div>;
    }

    return <div>redirecting...</div>;
  }
};

(Welcome as PageWithLayout).layout = EmptyPage;

export default Welcome;
