// old component
// import { Button, Card, Field, Input, Stack } from "@chakra-ui/react";
// import {  useForm } from "react-hook-form";

// const SignInSignUp = () => {
//   const {
//     register,
//     formState: { errors },
//   } = useForm();
//   return (
//     <Card.Root
//       maxW="sm"
//       m="auto"
//       mt="20"
//       boxShadow="lg"
//       p="6"
//       rounded="md"
//       bg={{ base: "white", _dark: "black" }}
//       //
//     >
//       <form
//         onSubmit={(data) => {
//           data.preventDefault();
//           console.log(data);
//         }}
//       >
//         <Card.Header>
//           <Card.Title>Sign up</Card.Title>
//           <Card.Description>
//             Fill in the form below to create an account
//           </Card.Description>
//         </Card.Header>
//         <Card.Body>
//           <Stack gap="4" w="full">
//             <Field.Root>
//               <Field.Label>First Name</Field.Label>
//               <Input {...register("firstName", { required: true })} />
//               {errors.firstName && <span className="text-red-500">This field is required</span>}
//             </Field.Root>
//             <Field.Root>
//               <Field.Label>Last Name</Field.Label>
//               <Input {...register("lastName", { required: true })} />
//               {errors.lastName && <span>This field is required</span>}
//             </Field.Root>
//           </Stack>
//         </Card.Body>
//         <Card.Footer justifyContent="flex-end">
//           <Button variant="outline">Cancel</Button>
//           <Button variant="solid" type="submit">
//             Sign in
//           </Button>
//         </Card.Footer>
//       </form>
//     </Card.Root>
//   );
// };

// export default SignInSignUp;
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  Center,
  InputGroup,
  Checkbox,
  Link,
  Field,
} from "@chakra-ui/react";
import { useTheme } from "next-themes";

const SignInSignUp = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler = (data) => console.log(data);
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack
          gap={4}
          color={useTheme().theme === "dark" ? "white" : "gray.800"}
        >
          <Stack align="center">
            <Heading fontSize="2xl">Sign in to your account</Heading>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useTheme().theme === "light" ? "white" : "gray.800"}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            gap={8}
            onSubmit={handleSubmit(onSubmit)}
          >
            <VStack
              gap={4}
              w="100%"
              color={useTheme().theme === "dark" ? "white" : "gray.800"}
            >
              <Field.Root id="email">
                <Field.Label>Email</Field.Label>
                <Input
                  rounded="md"
                  type="email"
                  borderColor={
                    useTheme().theme === "dark" ? "gray.600" : "gray.300"
                  }
                  {...register("emailRequired", { required: true })}
                />
                {errors.emailRequired && (
                  <span className="text-red-500">This email is required!</span>
                )}
              </Field.Root>
              <Field.Root id="password">
                <Field.Label>Password</Field.Label>
                <InputGroup
                  w="full"
                  endElement={
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useTheme().theme === "dark" ? "white" : "gray.800"}
                      _hover={{
                        bg:
                          useTheme().theme === "light"
                            ? "gray.200"
                            : "gray.700",
                      }}
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  }
                  {...register("passwordRequired", { required: true })}
                >
                  <Input
                    rounded="md"
                    type={show ? "text" : "password"}
                    borderColor={
                      useTheme().theme === "dark" ? "gray.600" : "gray.300"
                    }
                  ></Input>
                </InputGroup>
                {errors.passwordRequired && (
                  <span className="text-red-500">This password is required!</span>
                )}

                {/* <InputRightElement width="4.5rem"> */}

                {/* </InputRightElement> */}
              </Field.Root>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justifyContent="space-between" w="100%">
                <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Remember me</Checkbox.Label>
                </Checkbox.Root>
                <Link fontSize={{ base: "md", sm: "md" }}>
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: "green.500",
                }}
                rounded="md"
                w="100%"
                type="submit"
              >
                Sign in
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default SignInSignUp;
