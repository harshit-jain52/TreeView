import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const bg = useColorModeValue("gray.300", "gray.700");

  return (
    <Flex align="center" justify="center">
      <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
        <Heading fontSize="4xl" mb={8}>
          Create a new account
        </Heading>
        <Box rounded="lg" bg={bg} boxShadow="lg" p={8}>
          {error && (
            <Box mb={3} color="red.400">
              {error}
            </Box>
          )}
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && signup(email, password)}
              />
            </FormControl>

            <Button
              my={2}
              isLoading={isLoading}
              isDisabled={!email || password.length < 6}
              onClick={() => signup(email, password)}
            >
              Sign in
            </Button>
            <Text align="center" fontSize="sm" color="text.muted">
              Already have an account?{" "}
              <ChakraLink as={Link} to="/login">
                Log in
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Register;
