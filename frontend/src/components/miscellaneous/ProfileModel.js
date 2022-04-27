import {
  Avatar,
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProfileModel = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          bg="#666"
          _hover={{ bg: "#777" }}
          _focus={false}
          icon={<i className="fas fa-eye"></i>}
          onClick={onOpen}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent textAlign="center" bg="#444" color="white">
          <ModalHeader fontFamily={"Ubuntu"}>{user.name}</ModalHeader>
          <ModalCloseButton _focus={false} _hover={{ bg: "#555" }} />
          <ModalBody>
            <Image
              src={user.pic}
              boxSize="150px"
              borderRadius="50%"
              cursor="pointer"
              bg="white"
              m="5px auto 20px"
              fit="cover"
            />
            <Text fontFamily="Montserrat" fontSize="18px">
              {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
