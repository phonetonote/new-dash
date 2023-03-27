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

  const { kiniopioStatus, deleteForm, newForm, kinopioKey } = useKinopio();

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
          <form onSubmit={newForm.handleSubmit}>
            <FormControl>
              <Input
                type="text"
                placeholder="your api key"
                name="kinopioApiKey"
                id="kinopioApiKey"
                value={newForm.values.kinopioApiKey}
                onChange={newForm.handleChange}
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

      {kinopioKey && ["idle", "submitting"].includes(kiniopioStatus) && (
        <>
          <Text>
            your kinopio API key is is encrypted and will be used to send
            messages to your kinopio inbox. with kinopio enabled,{" "}
            <strong>messages will not sync to any other apps</strong>.
          </Text>

          <HStack justifyContent={"space-between"} mt="1">
            <Text>{kinopioKey}</Text>

            <Button
              onClick={() => {
                deleteForm.handleSubmit();
              }}
              disabled={kiniopioStatus === "submitting"}
            >
              {kiniopioStatus === "submitting" ? "loading" : "remove"}
            </Button>
          </HStack>
        </>
      )}
    </VStack>
  );
};
