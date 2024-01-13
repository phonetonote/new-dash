import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiHelpCircle, FiMail, FiSettings } from "react-icons/fi";
import { DashboardSection } from "../DashboardSection";
import { ClerkProfile } from "../widgets/ClerkProfile";
import { SignOutButton } from "@clerk/nextjs";
import router from "next/router";
import { IoHelpBuoy } from "react-icons/io5";

export const UserArea = () => {
  return (
    <VStack align="stretch" spacing="20" p="0">
      <Box id="account">
        <VStack align="stretch">
          <Box>
            <Flex>
              <HStack spacing="4" align="stretch" mt="4">
                <Box ml="3">
                  <SignOutButton
                    signOutCallback={() =>
                      router.push(`${process.env.NEXT_PUBLIC_OLD_MARKETING_SITE}`)
                    }
                  >
                    <Button>sign out</Button>
                  </SignOutButton>
                </Box>
              </HStack>
            </Flex>
          </Box>
          <Box minH="600px">
            <ClerkProfile></ClerkProfile>
          </Box>
        </VStack>
      </Box>
      <DashboardSection id="help" title="help" icon={<IoHelpBuoy />}>
        <VStack spacing={10} align="stretch">
          <Box mt="5">
            <Heading size="md" pb="2">
              <HStack>
                <Text> FAQ </Text>
                <FiHelpCircle></FiHelpCircle>
              </HStack>
            </Heading>
            <Text>
              please see{" "}
              <a href="https://phonetonote.com/pages/faq/">this faq article</a>{" "}
              for answers to common questions.
            </Text>
          </Box>
          <Box>
            <Heading size="md" pb="2">
              <HStack>
                <Text>further support</Text>
                <FiMail></FiMail>
              </HStack>
            </Heading>
            <Text>
              premium support is available for $5/month at{" "}
              <a href="https://pro.phonetonote.com/">
                https://pro.phonetonote.com/
              </a>
              .
            </Text>
          </Box>
        </VStack>
      </DashboardSection>
      <Box height={"85vh"}></Box>
    </VStack>
  );
};
