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
          <Box minH="600px">
            <ClerkProfile only="account"></ClerkProfile>
          </Box>

          <Flex maxWidth="840px" mt="4" justifyContent="right">
            <HStack spacing="4" align="stretch">
              <SignOutButton
                signOutCallback={() =>
                  router.push(`${process.env.NEXT_PUBLIC_OLD_MARKETING_SITE}`)
                }
              >
                <Button>sign out</Button>
              </SignOutButton>
            </HStack>
          </Flex>
        </VStack>
      </Box>
      <Box id="security">
        <ClerkProfile only="security"></ClerkProfile>
      </Box>
      <DashboardSection
        id="preferences"
        title="preferences"
        icon={<FiSettings />}
      >
        <Text>check back soon for monthly backup preferences and more.</Text>
      </DashboardSection>
      <DashboardSection id="help" title="help" icon={<IoHelpBuoy />}>
        <VStack spacing={10} align="stretch">
          <Box mt="5">
            <Heading size="md" pb="2">
              <HStack>
                <Text> FAQ </Text>
                <FiHelpCircle></FiHelpCircle>
              </HStack>
            </Heading>
            {/* TODO update this */}
            {/* Mention telegram race condition */}
            <Text>
              please see{" "}
              <a href="https://phonetonote.com/pages/faq/">this faq article</a>{" "}
              for answers to common questions.
            </Text>
          </Box>
          <Box>
            <Heading size="md" pb="2">
              <HStack>
                <Text>contact support</Text>
                <FiMail></FiMail>
              </HStack>
            </Heading>
            {/* TODO put link to premium support */}
          </Box>
        </VStack>
      </DashboardSection>
      <Box height={"85vh"}></Box>
    </VStack>
  );
};
