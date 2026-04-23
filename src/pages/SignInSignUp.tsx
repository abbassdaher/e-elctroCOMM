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
import { useForm, type SubmitHandler } from "react-hook-form";
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
import type { Iuser } from "@/interface";
import { signUpInSlice } from "../redux/Slices/Auth";
import toast, { Toaster } from "react-hot-toast";
import CookieServices from "../components/sevices/CookieServices";
import { Navigate } from "react-router-dom";

// import {CookieServices} from "../components/services/CookieServices";

// import { loginSlice } from "../redux/Slices/LoginSlice";

const SignInSignUp = ({ isauthenticated }: { isauthenticated?: string }) => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const [signUP, setsignUP] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    register,
    handleSubmit,
    //! watch,
    formState: { errors },
  } = useForm<Iuser>();

  const [addUser, { reset }] = signUpInSlice.useSignUpMutation();
  const [signIn] = signUpInSlice.useLoginMutation();
  // register submit handler

  const onRegisterSubmit: SubmitHandler<Iuser> = async (data) => {
    // try {
    try {
      const response = await addUser({
        username: data.username,
        email: data.email,
        password: data.password,
      }).unwrap();
      console.log(response);
      toast.success("Successfully registered!");
      reset();
    } catch (error) {
      toast.error(
        (error as { data: { error: { message: string } } }).data.error.message,
      );
    }
  };
  //! login submit handler
  const onLoginSubmit: SubmitHandler<Iuser> = async (data) => {
    // const token = CookieServices.getCookie("jwt");

    try {
      const response = await signIn({
        username: data.username,
        identifier: data.identifier,
        password: data.password,
      }).unwrap();
      // date for sesion cookie
      const date = new Date();
      const IN_DAYS = 3;
      const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS; // 3 days in milliseconds
      const options = {
        path: "/",
        expires: new Date(date.getTime() + EXPIRES_IN_DAYS),
      };
      if (response?.jwt) {
        CookieServices.setCookie("jwt", response.jwt, options);
        // navigate("/", { replace: true });
      }
      // console.log(CookieService.set("jwt", data.jwt));
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error(
        (error as { data: { error: { message: string } } }).data.error.message,
    );
    }
  };
  // If your mutation expects an object, update the API definition to accept an object.
  // If it expects a string (like email), only pass the email.
  if (isauthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Toaster />
      <Center>
        <Stack gap={4} color={theme === "dark" ? "white" : "gray.800"}>
          <Stack align="center">
            <Heading fontSize="2xl">Sign in to your account</Heading>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={theme === "light" ? "white" : "gray.800"}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            gap={8}
            onSubmit={handleSubmit(signUP ? onRegisterSubmit : onLoginSubmit)}
          >
            <VStack
              gap={4}
              w="100%"
              color={theme === "dark" ? "white" : "gray.800"}
            >
              {/* username */}

              <Field.Root id="username">
                <Field.Label>Username</Field.Label>
                <Input
                  rounded="md"
                  type="text"
                  borderColor={theme === "dark" ? "gray.600" : "gray.300"}
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-red-500">Username is required!</span>
                )}
              </Field.Root>

              {/* identifier */}
              {signUP ? (
                <Field.Root id="email">
                  <Field.Label>Email</Field.Label>
                  <Input
                    rounded="md"
                    type="email"
                    borderColor={theme === "dark" ? "gray.600" : "gray.300"}
                    {...register("email", {
                      required: true,
                    })}
                  />
                </Field.Root>
              ) : (
                <Field.Root id="identifier">
                  <Field.Label>Email</Field.Label>
                  <Input
                    rounded="md"
                    type="email"
                    borderColor={theme === "dark" ? "gray.600" : "gray.300"}
                    {...register("identifier", {
                      required: true,
                    })}
                  />
                </Field.Root>
              )}

              {/* password */}
              <Field.Root id="password">
                <Field.Label>Password</Field.Label>
                <InputGroup
                  w="full"
                  endElement={
                    <Button
                      h="1.75rem"
                      width="4.5rem"
                      size="sm"
                      rounded="md"
                      bg={theme === "dark" ? "white" : "gray.800"}
                      _hover={{
                        bg: theme === "light" ? "gray.200" : "gray.700",
                      }}
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  }
                  {...register("password", { required: true })}
                >
                  <Input
                    rounded="md"
                    // type="text"
                    type={show ? "text" : "password"}
                    borderColor={theme === "dark" ? "gray.600" : "gray.300"}
                    {...register("password", { required: true })}
                  ></Input>
                </InputGroup>
                {errors.password && (
                  <span className="text-red-500">
                    This password is required!
                  </span>
                )}
                {/* <InputRightElement width="4.5rem"> */}
                {/* </InputRightElement> */}
              </Field.Root>
            </VStack>
            <VStack w="100%">
              {!signUP ? (
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
              ) : null}

              {signUP ? (
                <Button
                  bg="blue.300"
                  color="white"
                  _hover={{
                    bg: "blue.500",
                  }}
                  rounded="md"
                  w="100%"
                  type="submit"
                >
                  Sign up
                </Button>
              ) : (
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
              )}
              <Link
                fontSize={{ base: "md", sm: "md" }}
                onClick={() => {
                  setsignUP(!signUP);
                }}
              >
                {signUP
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Link>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default SignInSignUp;
