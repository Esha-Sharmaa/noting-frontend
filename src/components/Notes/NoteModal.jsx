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
  Box,
  Image,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const NoteModal = ({
  type,
  isOpen,
  onClose,
  editableContent,
  handleChange,
  handleSubmit,
}) => {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#303236" color="white">
          <ModalHeader>Edit Your Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={6}>
              <Input
                placeholder="Title"
                value={editableContent.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </FormControl>
            {type === "text" && (
              <FormControl>
                <Textarea
                  placeholder="Content"
                  value={editableContent.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                />
              </FormControl>
            )}
            {type === "image" && (
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  mt={3}
                  focusBorderColor="#ea80fc"
                  _hover={{ borderColor: "#ea80fc" }}
                  _active={{ borderColor: "#ea80fc" }}
                  color="white"
                  borderColor="#ea80fc"
                  onChange={(e) => handleChange("imageUrl", e.target.files[0])}
                />
                <Box
                  border={"solid"}
                  color="white"
                  p={2}
                  mt={2}
                  borderRadius="md"
                  borderColor={"#ea80fc"}
                  textAlign="center"
                >
                  {editableContent.imageUrl ? (
                    <Image
                      boxSize="100px"
                      objectFit="contain"
                      src={editableContent.imageUrl}
                      alt="Image Note"
                    />
                  ) : (
                    "Selected Image Preview"
                  )}
                </Box>
              </FormControl>
            )}
            {type === "list" && (
              <Textarea
                value={editableContent.listItems.join(", ")}
                onChange={(e) => handleChange("listItems", e.target.value)}
              ></Textarea>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#ea80fc"
              color="white"
              mr={3}
              _hover={{ bg: "#ba65c9" }}
              onClick={handleSubmit}
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
  handleSubmit: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default NoteModal;
