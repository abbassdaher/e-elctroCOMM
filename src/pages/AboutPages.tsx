import {
  AspectRatio,
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Fragment } from "react/jsx-runtime";

function AboutPages() {
  return (
    <Fragment>
      <AspectRatio ratio={16 / 9} w="lg" m="auto" mt="10" mb="10">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60858.315636398125!2d35.46308276443859!3d33.889211443766776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a78f%3A0x729182bae99836b4!2sBeirut!5e1!3m2!1sen!2slb!4v1768991467487!5m2!1sen!2slb"/>
      </AspectRatio>
      <div className="flex justify-center  h-screen">
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend color={"white"}>Contact details</Fieldset.Legend>
            <Fieldset.HelperText color="whiteAlpha.600">
              Please provide your contact details below.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input name="name" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input name="email" type="email" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Country</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field name="country">
                  <For
                    each={[
                      "Lebanon",
                      "United Kingdom",
                      "Canada",
                      "United States",
                    ]}
                  >
                    {(item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>

              <Field.Root>
                <Field.Label>Message</Field.Label>
                <Textarea placeholder="Message..." />
              </Field.Root>
            </Field.Root>
          </Fieldset.Content>

          <Button type="submit" alignSelf="flex-start">
            Submit
          </Button>
        </Fieldset.Root>
      </div>
    </Fragment>
  );
}

export default AboutPages;
