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

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const [loading, setLoading] = useState(false);

  const [showP, setShowP] = React.useState(false);
  const [showCP, setShowCP] = React.useState(false);

  const toast = useToast();
  const history = useHistory();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat app");
      data.append("cloud_name", "dym8h12up");
      fetch("https://api.cloudinary.com/v1_1/dym8h12up/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      setLoading(true);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      toast({
        title: "Password does not match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_ENDPOINT}/api/user`,
        { name, email, password, pic },
        config
      );

      toast({
        title: "Registeration is successful..!",
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
        <FormLabel className="label">Name:</FormLabel>
        <Input
          className="input"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl className="form-control">
        <FormLabel className="label">Email:</FormLabel>
        <Input
          className="input"
          placeholder="Enter your email"
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

      <FormControl className="form-control">
        <FormLabel className="label">Confirm: </FormLabel>
        <InputGroup size="md">
          <Input
            className="input-password"
            pr="4.5rem"
            type={showCP ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="3rem">
            {showCP ? (
              <BiHide
                className="show-hide"
                onClick={() => setShowCP(!showCP)}
              />
            ) : (
              <BiShow
                className="show-hide"
                onClick={() => setShowCP(!showCP)}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl className="form-control">
        <FormLabel className="label">Pic:</FormLabel>
        {/* <Input
          colorScheme="telegram"
          className="input-file"
          type="file"
          accept="image/"
          onChange={(e) => postDetails(e.target.files[0])}
        /> */}

        <input
          className="input-file"
          type="file"
          accept="image/"
          onChange={(e) => postDetails(e.target.files[0])}
        ></input>
      </FormControl>

      <Button
        className="signup-btn"
        onClick={submitHandler}
        colorScheme="telegram"
        isLoading={loading}
        _hover={{
          boxShadow: "dark-lg",
        }}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
