import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoLogoPython } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";

import httpClient from "../utils/httpClient";

const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const loginUser = async () => {
    if (!email || !password) {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      // TODO 2 AXIOS
      const { data } = await httpClient.post("/login", {
        email,
        password,
      });
      console.log(data);

      toast({
        title: data.message,
        status: data.ok ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
      // NOWE 2
      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Błędny login lub hasło",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setError(false);
    }

    setLoading(false);
  };

  return (
    <Box
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      maxWidth="400px"
      mx="auto"
      flexDirection="column"
    >
      <Heading display="flex" alignItems="center" fontSize="50px" mb="30px">
        <IoLogoPython color="#38a169" />
        Tasker
      </Heading>

      <Stack spacing={3} w="100%">
        <FormControl isInvalid={error}>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            onChange={changeEmail}
            placeholder="Podaj adres email"
          />
          {error && <FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={error}>
          <FormLabel>Hasło</FormLabel>

          <Input
            type={hidePassword ? "password" : "text"}
            onChange={changePassword}
            placeholder="Podaj swoje hasło"
          />

          <Box
            onClick={() => setHidePassword(!hidePassword)}
            pos="absolute"
            bottom="6px"
            right="10px"
            zIndex={10}
          >
            {hidePassword ? <AiFillEye size={26} /> : <AiFillEyeInvisible size={26}/>}
          </Box>

          {error && <FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
        </FormControl>

        <Button onClick={loginUser} colorScheme="green" size="lg">
          {loading ? <Spinner color="white.500" /> : "Zaloguj"}
        </Button>

        <Text textAlign="center" mt="10px">
          Nie masz konta?{" "}
          <Link style={{ color: "#38a169" }} to="/register">
            Zarejestruj się
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default LoginPage;
