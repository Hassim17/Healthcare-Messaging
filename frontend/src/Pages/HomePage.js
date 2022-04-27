import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container maxW="lg" centerContent={false} className="homePage-container">
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="#00B4D8"
        color="white"
        m="40px 0 15px"
        w="100%"
        borderRadius="lg"
        boxShadow="dark-lg"
      >
        <Text
          className="homePage-container-title"
          fontSize="4xl"
          fontFamily="Work Sans"
          fontWeight="400"
        >
          Healthcare-Messaging
        </Text>
      </Box>
      <Box
        bg="#00B4D8"
        color="white"
        w="100%"
        p={4}
        borderRadius="lg"
        boxShadow="dark-lg"
      >
        <Tabs isFitted colorScheme="telegram" variant="soft-rounded">
          <TabList mb="1em">
            <Tab
              className="tab-header"
              fontWeight="extrabold"
              _focus={{ borderWidth: "0px", borderBottom: "2px" }}
            >
              <p>Login</p>
            </Tab>
            <Tab
              className="tab-header"
              fontWeight="extrabold"
              _focus={{ borderWidth: "0px", borderBottom: "2px" }}
            >
              Sign up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
