import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Button,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { FaTrash, FaUpload } from "react-icons/fa";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useToastNotification from "../../hooks/useToastNotification";

const AvatarUploadModal = ({ onClose, isOpen, currentAvatar }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { changeAvatar, deleteAvatar } = useAuth();
  const { showSuccessToast, showErrorToast } = useToastNotification();

  const changeAvatarMutation = useMutation({
    mutationFn: changeAvatar,
    onSuccess: () => {
      showSuccessToast({
        title: "SUCCESS.",
        description: " Avatar updated successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR.",
        description: error.response.data.message,
      });
    },
  });

  const deleteAvatarMutation = useMutation({
    mutationFn: deleteAvatar,
    onSuccess: () => {
      showSuccessToast({
        title: "SUCCESS.",
        description: " Avatar Removed successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR.",
        description: error.response.data.message,
      });
    },
  });
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      changeAvatarMutation.mutate(formData);
      setSelectedFile(null);
      onClose();
    }
  };

  const handleDelete = () => {
    deleteAvatarMutation.mutate();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#303236"}>
          <ModalHeader color={"#c64cff"}>Upload Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" alignItems="center">
              <Box
                borderRadius="full"
                overflow="hidden"
                boxShadow="md"
                mb={4}
                bg="gray.100"
                width="150px"
                height="150px"
              >
                <Avatar
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : currentAvatar
                  }
                  alt="Current Avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box
                as="label"
                htmlFor="file-upload"
                cursor="pointer"
                bg="#c64cff"
                color="white"
                px={4}
                py={2}
                borderRadius="md"
                display="flex"
                alignItems="center"
                _hover={{ bg: "#b154e1" }}
              >
                <FaUpload style={{ marginRight: "0.5rem" }} />
                Choose a file
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </Box>
              {selectedFile && (
                <Text mt={2} color="gray.300">
                  Selected file: {selectedFile.name}
                </Text>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={"#c64cff"}
              color={"white"}
              mr={3}
              onClick={handleUpload}
              disabled={!selectedFile}
              _hover={"#"}
            >
              Upload
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={handleDelete}
              leftIcon={<FaTrash />}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
AvatarUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentAvatar: PropTypes.string,
};
export default AvatarUploadModal;
