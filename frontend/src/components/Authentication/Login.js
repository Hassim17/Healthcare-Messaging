import React, { useState } from "react";
import { VStack, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputRightElement, InputGroup } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { BiShow, BiHide } from "react-icons/bi";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "../../styles/Auth.scss";
import { API_ENDPOINT } from "../../config/ChatLogics";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const [showP, setShowP] = React.useState(false);

  const toast = useToast();
  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields..",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_ENDPOINT}/api/user/login`,
        { email, password },
        config
      );

      toast({
        title: "Login is successful..!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error occoured..!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="15px" color="black" className="signup-form">
      <FormControl className="form-control">
        <FormLabel className="label">Email:</FormLabel>
        <Input
          className="input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl className="form-control">
        <FormLabel className="label">Password:</FormLabel>
        <InputGroup size="md">
          <Input
            className="input-password"
            pr="4.5rem"
            type={showP ? "text" : "password"}
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="3rem">
            {showP ? (
              <BiHide className="show-hide" onClick={() => setShowP(!showP)} />
            ) : (
              <BiShow className="show-hide" onClick={() => setShowP(!showP)} />
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        isLoading={loading}
        className="login-btn"
        onClick={submitHandler}
        colorScheme="telegram"
        width="100%"
        _hover={{
          boxShadow: "dark-lg",
        }}
      >
        Login
      </Button>
      <Button
        className="credentials-btn"
        colorScheme="solid"
        backgroundColor="red"
        letterSpacing="1px"
        width="100%"
        fontFamily="Russo One"
        _hover={{ bgColor: "rgba(215, 0, 0)", boxShadow: "dark-lg" }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("12345678");
        }}
      >
        Get guest user credentials
      </Button>
    </VStack>
  );
};

export default Login;
