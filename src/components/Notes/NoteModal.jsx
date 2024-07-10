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
  Button,
  Textarea,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import NoteImage from "./NoteImage";
const NoteModal = ({ isOpen, onClose, editableContent, handleChange }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#303236" color="white">
          <ModalHeader>Edit Your Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                placeholder="Title"
                value={editableContent.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </FormControl>
            {editableContent.content && (
              <FormControl>
                <Textarea
                  placeholder="Content"
                  value={editableContent.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                />
              </FormControl>
            )}
            {editableContent.imageUrl && (
              <NoteImage imageUrl={editableContent.imageUrl} />
            )}
            {editableContent.listItems &&
              editableContent.listItems.map((item) => (
                <li key={item}> {item}</li>
              ))}
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#ea80fc"
              color="white"
              mr={3}
              _hover={{ bg: "#ba65c9" }}
            >
              Save
            </Button>
            <Button
              onClick={onClose}
              bg="gray.600"
              color="white"
              _hover={{ bg: "gray.500" }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

NoteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editableContent: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default NoteModal;
