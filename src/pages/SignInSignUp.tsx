import { Button, Card, Field, Input, Stack } from "@chakra-ui/react"


const SignInSignUp = () => {
  return (
            
    <Card.Root maxW="sm" m="auto" mt="20" boxShadow="lg" p="6" rounded="md" bg="white">
    <Card.Header>
      <Card.Title>Sign up</Card.Title>
      <Card.Description>
        Fill in the form below to create an account
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full">
        <Field.Root>
          <Field.Label>First Name</Field.Label>
          <Input />
        </Field.Root>
        <Field.Root>
          <Field.Label>Last Name</Field.Label>
          <Input />
        </Field.Root>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="flex-end">
      <Button variant="outline">Cancel</Button>
      <Button variant="solid">Sign in</Button>
    </Card.Footer>
  </Card.Root>
  )
}

export default SignInSignUp