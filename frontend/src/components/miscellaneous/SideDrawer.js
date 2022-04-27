import React, { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import ProfileModel from "./ProfileModel";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import { Effect } from "react-notification-badge";
import NotificationBadge from "react-notification-badge";

const SideDrawer = () => {
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occoured",
        description: "Failed to load the search result",
        status: "warning",
        duration: "3000",
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <div>
      <Box className="sideDrawer">
        <Tooltip label="Search users to chat" hasArrow="bottom-end">
          <Button colorScheme="linkedin" _focus="none" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <h2 className="chatPage-title">Healthcare-Messaging</h2>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <i className="fas fa-bell"></i>
            </MenuButton>
            <MenuList pl={2} bg="#333" borderColor="#555">
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  _hover={{ bg: "#444" }}
                  _focus={false}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New message in ${notif.chat.name}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              size="sm"
              colorScheme="linkedin"
              _focus="none"
              p="22px 15px"
              as={Button}
              rightIcon={<i className="fas fa-angle-down"></i>}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList bg="#333" borderColor="#555">
              <ProfileModel user={user}>
                <MenuItem _focus="false" _hover={{ bg: "#444" }}>
                  My Profile
                </MenuItem>
              </ProfileModel>
              <MenuItem _hover={{ bg: "#444" }} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#333" color="white">
          <DrawerHeader fontFamily="Kanit">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                size="sm"
                borderColor="#777"
                borderRadius="5px"
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button onClick={handleSearch} size="sm" colorScheme="linkedin">
                GO
              </Button>
            </Box>

            {loading ? (
              <ChatLoading search={search} />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
