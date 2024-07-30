import PropTypes from "prop-types";
import NoteContent from "../Notes/NoteContent";
import NoteHeader from "../Notes/NoteHeader";
import {
  Avatar,
  Box,
  IconButton,
  Image,
  Tooltip,
  useDisclosure,
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
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotes from "../../hooks/useNotes";
import useToastNotification from "../../hooks/useToastNotification";

const SharedNoteCard = ({ note, permission }) => {
  const customIconButtonProps = {
    variant: "outline",
    color: "#ea80fc",
    borderColor: "black",
    _hover: { bg: "#ea80fc", color: "white" },
    _focus: { boxShadow: "outline" },
    isRound: true,
  };

  const { editNote } = useNotes();
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOwnerModalOpen,
    onClose: onOwnerModalClose,
    onOpen: onOwnerModalOpen,
  } = useDisclosure();
  const { showSuccessToast, showErrorToast } = useToastNotification();
  const editNoteMutation = useMutation({
    mutationFn: (formData) => editNote(formData.get("id"), formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "SUCCESS",
        description: "Note Edited Successfully",
      });
      onClose();
    },
    onError: (error) => {
      console.log("Error in editing", error);
      showErrorToast({
        title: "ERROR",
        description: error.response.data.message,
      });
    },
  });
  const [editableContent, setEditableContent] = useState({
    title: note.title,
    content: note.content,
    imageUrl: note.imageUrl,
    listItems: note.listItems,
  });
  // handle functions
  const handleChange = (field, value) => {
    if (field === "listItems") value = value.split(",");
    setEditableContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", note._id);
    formData.append("title", editableContent.title);
    formData.append("type", note.type);
    if (note.type === "text") {
      formData.append("content", editableContent.content);
    } else if (note.type === "image" && editableContent.imageUrl) {
      formData.append("noteImage", editableContent.imageUrl);
    } else if (note.type === "list") {
      formData.append("listItems", JSON.stringify(editableContent.listItems));
    }
    editNoteMutation.mutate(formData);
  };
  return (
    <>
      <div className="col-span-1 border-2 border-black p-4 rounded-md shadow-md min-h-[250px] flex flex-col">
        <NoteHeader title={note.title} updatedAt={note.updatedAt} />
        <NoteContent
          id={note._id}
          content={note.content}
          labels={note.lables}
          listItems={note.listItems}
          imageUrl={note.imageUrl}
        />
        <Avatar
          name={note.userDetails.displayName}
          src={note.userDetails.avatar || null}
          mb={2}
          size={"xs"}
          onClick={onOwnerModalOpen}
          cursor="pointer"
        />
        {permission === "write" ? (
          <Tooltip label="Edit Note">
            <IconButton
              icon={<MdEdit size={20} />}
              aria-label="Edit"
              {...customIconButtonProps}
              width={"40px"}
              onClick={onOpen}
              cursor="pointer"
            />
          </Tooltip>
        ) : (
          <p className="text-center text-gray-400 italic text-sm p-4">
            Yo do not have permission to edit this note
          </p>
        )}
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
              {note.type === "text" && (
                <FormControl>
                  <Textarea
                    placeholder="Content"
                    value={editableContent.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                  />
                </FormControl>
              )}
              {note.type === "image" && (
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
                    onChange={(e) =>
                      handleChange("imageUrl", e.target.files[0])
                    }
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
              {note.type === "list" && (
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
        <Modal isOpen={isOwnerModalOpen} onClose={onOwnerModalClose}>
          <ModalOverlay />
          <ModalContent bg="#303236" color="white">
            <ModalHeader>Owner</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4} align="start">
                <Box>
                  <HStack spacing={3} mt={2}>
                    <Avatar
                      size="sm"
                      name={note.userDetails.displayName}
                      src={note.userDetails.avatar || null}
                    />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="bold">
                        {note.userDetails.displayName}
                      </Text>
                      <Text fontSize="xs" fontStyle="italic">
                        {note.userDetails.email}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
SharedNoteCard.propTypes = {
  permission: PropTypes.string.isRequired,
  note: PropTypes.object.isRequired,
};
export default SharedNoteCard;
