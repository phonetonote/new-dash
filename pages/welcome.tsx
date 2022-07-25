import {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPage,
} from "next";
import { useSignIn, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { PageWithLayout } from "../types/PageWithLayout";
import Router from "next/router";
import EmptyPage from "../components/layouts/EmptyPage";

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
  clerkIdFromRoam: clerkId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { signOut } = useClerk();
  const { signIn, setSession } = useSignIn();
  const { session } = useClerk();
  const [mySessionId, setMySessionId] = useState<string>();
  const [goToRedirect, setGoToRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (!signIn || !signInToken || !signOut) {
      return;
    }

    const determineSession = async () => {
      const prepareToSignIn = async () => {
        const { createdSessionId } = await signIn.create({
          strategy: "ticket",
          ticket: signInToken as string,
        });

        setMySessionId(createdSessionId as string);
      };
      try {
        if (session) {
          const {
            user: { id: sessionUserId },
          } = session;
          const hasClerkId = clerkId !== "null";
          const sameSession = hasClerkId && sessionUserId === clerkId;
          const sessionIsValid = !hasClerkId || sameSession;

          if (sessionIsValid) {
            setGoToRedirect(true);
          } else if (hasClerkId && !sameSession) {
            await signOut();
            await prepareToSignIn();
          } else {
            console.error(
              "error state, please contact support@phonetonote.com"
            );
          }
        } else {
          await prepareToSignIn();
        }
      } catch (err) {
        console.error(err);
      }
    };

    determineSession();
  }, [session, signInToken, clerkId, signIn, signOut]);

  useEffect(() => {
    if (mySessionId && setSession && !goToRedirect) {
      setSession(mySessionId);
      setGoToRedirect(true);
    }
  }, [mySessionId, setSession, setGoToRedirect, goToRedirect]);

  useEffect(() => {
    if (goToRedirect) {
      Router.push("/");
    }
  }, [goToRedirect]);

  return <div>loading...</div>;
};

(Welcome as PageWithLayout).layout = EmptyPage;

export default Welcome;
