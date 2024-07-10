import { AiOutlinePlus } from "react-icons/ai";
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
  useDisclosure,
  Textarea,
  Box,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotes from "../../hooks/useNotes";
import useToastNotification from "../../hooks/useToastNotification";

const AddNote = () => {
  const { addNote } = useNotes();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showSuccessToast, showErrorToast } = useToastNotification();
  const queryClient = useQueryClient();

  const [type, setType] = useState("text");
  const [noteImage, setNoteImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [listItems, setListItems] = useState([]);

  const addNoteMutation = useMutation({
    mutationFn: (noteData) =>
      addNote(noteData, { headers: { "Content-Type": "multipart/form-data" } }),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "SUCCESS",
        description: "Note Created Successfully",
      });
      setTitle("");
      setType("text");
      setContent("");
      setNoteImage("");
      setListItems([]);
      onClose(); // Close the modal on success
    },
    onError: (error) => {
      showErrorToast({
        title: "Error",
        description: error.response.data.message,
      });
    },
  });

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleImageFileChange = (e) => {
    setNoteImage(e.target.files[0]);
  };

  const handleListChange = (e) => {
    const listArray = e.target.value.split(",");
    setListItems(listArray);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    if (type === "text") {
      formData.append("content", content);
    } else if (type === "image" && noteImage) {
      formData.append("noteImage", noteImage);
    } else if (type === "list") {
      formData.append("listItems", JSON.stringify(listItems));
    }

    addNoteMutation.mutate(formData);
  };

  const renderNoteInput = () => {
    switch (type) {
      case "text":
        return (
          <Textarea
            placeholder="Note Content"
            mt={3}
            focusBorderColor="#ea80fc"
            _hover={{ borderColor: "#ea80fc" }}
            _active={{ borderColor: "#ea80fc" }}
            color="white"
            borderColor="#ea80fc"
            onChange={(e) => setContent(e.target.value)}
          />
        );
      case "image":
        return (
          <FormControl>
            <FormLabel size={"xs"}>Add Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              mt={3}
              focusBorderColor="#ea80fc"
              _hover={{ borderColor: "#ea80fc" }}
              _active={{ borderColor: "#ea80fc" }}
              color="white"
              borderColor="#ea80fc"
              onChange={handleImageFileChange}
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
              {noteImage ? (
                <Image
                  boxSize="100px"
                  objectFit="contain"
                  src={URL.createObjectURL(noteImage)}
                  alt="Image Note"
                />
              ) : (
                "Selected Image Preview"
              )}
            </Box>
          </FormControl>
        );
      case "list":
        return (
          <FormControl>
            <FormLabel color="white">List Items</FormLabel>
            <Textarea
              placeholder="Enter list items separated by commas"
              mb={3}
              focusBorderColor="#ea80fc"
              _hover={{ borderColor: "#ea80fc" }}
              _active={{ borderColor: "#ea80fc" }}
              color="white"
              borderColor="#ea80fc"
              onChange={handleListChange}
            />
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-full shadow-lg focus:outline-none"
        style={{ backgroundColor: "#c64cff" }}
        onClick={onOpen}
      >
        <AiOutlinePlus className="inline-block mr-2" />
        Add Note
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#303236" color="white">
          <ModalHeader>Create A New Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              <FormControl>
                <Input
                  placeholder="Note Title"
                  mb={3}
                  focusBorderColor="#ea80fc"
                  _hover={{ borderColor: "#ea80fc" }}
                  _active={{ borderColor: "#ea80fc" }}
                  color="white"
                  borderColor="#ea80fc"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend" color="white">
                  Note Type
                </FormLabel>
                <RadioGroup
                  defaultValue="text"
                  value={type}
                  onChange={handleTypeChange}
                >
                  <Stack direction="row" spacing={4}>
                    <Radio value="text" colorScheme="pink" size="md">
                      Text
                    </Radio>
                    <Radio value="image" colorScheme="pink" size="md">
                      Image
                    </Radio>
                    <Radio value="list" colorScheme="pink" size="md">
                      List
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </VStack>
            {renderNoteInput()}
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
              onClick={handleSubmit}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNote;
