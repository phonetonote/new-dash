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
  const { session } = useClerk();
  const [mySessionId, setMySessionId] = useState<string>();

  useEffect(() => {
    if (!signIn || !setSession || !signInToken) {
      return;
    }

    const aFunc = async () => {
      console.log("aFunc session", session);

      try {
        if (session) {
          //
          if (!clerkIdFromRoam) {
            setMySessionId(session.id);
          } else if (session.user.id !== clerkIdFromRoam) {
            signOut();
            const res = await signIn.create({
              strategy: "ticket",
              ticket: signInToken as string,
            });

            setMySessionId(res.createdSessionId as string);
          }
        } else {
          const res = await signIn.create({
            strategy: "ticket",
            ticket: signInToken as string,
          });

          console.log("res", res);

          setMySessionId(res.createdSessionId as string);
        }
      } catch (err) {
        console.error(err);
      }
    };

    aFunc();
  }, [session, signInToken, clerkIdFromRoam]);

  useEffect(() => {
    console.log("mySessionId", mySessionId);
    if (mySessionId && setSession) {
      setSession(mySessionId);

      Router.push("/");
    }
  }, [mySessionId, setSession]);

  return <div>hello</div>;
};

(Welcome as PageWithLayout).layout = EmptyPage;

export default Welcome;
