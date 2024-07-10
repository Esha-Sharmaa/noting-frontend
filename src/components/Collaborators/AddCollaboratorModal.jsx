import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Button,
  VStack,
  FormLabel,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";

const AddCollaboratorModal = ({ noteId, isOpen, onClose, addCollaborator }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("read");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePermissionChange = (value) => setPermission(value);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#303236" color="white">
        <ModalHeader color="white">Add Collaborators</ModalHeader>
        <ModalCloseButton color="#ea80fc" />
        <ModalBody pb={6}>
          <VStack spacing={4} align="start">
            <FormControl>
              <FormLabel color="white">Email of user to add</FormLabel>
              <Input
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                mb={3}
                focusBorderColor="#ea80fc"
                _hover={{ borderColor: "#ea80fc" }}
                _active={{ borderColor: "#ea80fc" }}
                color="white"
                borderColor="#ea80fc"
              />
            </FormControl>

            <FormControl as="fieldset">
              <FormLabel as="legend" color="white">
                Permission
              </FormLabel>
              <RadioGroup
                value={permission}
                onChange={handlePermissionChange}
                defaultValue="read"
              >
                <Stack direction="row" spacing={4}>
                  <Radio value="read" colorScheme="pink" size="md">
                    Read
                  </Radio>
                  <Radio value="write" colorScheme="pink" size="md">
                    Write
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            mr={3}
            color={"white"}
            variant="outline"
            _hover={{ backgroundColor: "white", color: "black" }}
          >
            Cancel
          </Button>
          <Button
            backgroundColor="#ea80fc"
            color="white"
            _hover={{ backgroundColor: "#d96bd8", color: "white" }}
            onClick={() => addCollaborator({ email, permission, noteId })}
          >
            Add Collaborator
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

AddCollaboratorModal.propTypes = {
  noteId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addCollaborator: PropTypes.func.isRequired,
};

export default AddCollaboratorModal;
