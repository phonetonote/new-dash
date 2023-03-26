import {
  VStack,
  Heading,
  FormControl,
  Input,
  HStack,
  FormHelperText,
  Button,
  Text,
} from "@chakra-ui/react";
import { useMutedColor } from "../../hooks/useChannelColors";
import { useKinopio } from "../../hooks/useKinopio";

type KinopioClientProps = {};

export const KinopioClient = (props: KinopioClientProps) => {
  const mutedColor = useMutedColor();

  const { kiniopioStatus, kinopioForm, kinopioKey } = useKinopio();

  return (
    <VStack align="stretch" spacing={"2"}>
      <Heading color={mutedColor} size="md">
        kinopio
      </Heading>
      {!kinopioKey && ["idle", "submitting"].includes(kiniopioStatus) && (
        <>
          <Text>
            enter your kinopio API key to send messages to your kinopio inbox.{" "}
          </Text>
          <form onSubmit={kinopioForm.handleSubmit}>
            <FormControl>
              <Input
                type="text"
                placeholder="your api key"
                name="kinopioApiKey"
                id="kinopioApiKey"
                value={kinopioForm.values.kinopioApiKey}
                onChange={kinopioForm.handleChange}
              />
              <HStack justifyContent={"space-between"} mt="1">
                <FormHelperText>
                  we only store an encrypted version
                </FormHelperText>
                <Button
                  type="submit"
                  disabled={kiniopioStatus === "submitting"}
                >
                  {kiniopioStatus === "submitting" ? "loading" : "save"}
                </Button>
              </HStack>
            </FormControl>
          </form>
        </>
      )}
    </VStack>
  );
};
