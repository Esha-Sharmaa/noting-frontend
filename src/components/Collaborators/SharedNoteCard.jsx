import PropTypes from "prop-types";
import NoteContent from "../Notes/NoteContent";
import NoteHeader from "../Notes/NoteHeader";
import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
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
import NoteImage from "../Notes/NoteImage";
const SharedNoteCard = ({ notes }) => {
  const customIconButtonProps = {
    variant: "outline",
    color: "#ea80fc",
    borderColor: "black",
    _hover: { bg: "#ea80fc", color: "white" },
    _focus: { boxShadow: "outline" },
    isRound: true,
  };
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      {notes.map((note) => (
        <>
          <div className="col-span-1 border-2 border-black p-4 rounded-md shadow-md min-h-[250px] flex flex-col">
            <NoteHeader
              title={note.note.title}
              updatedAt={note.note.updatedAt}
            />
            <NoteContent
              id={note.note._id}
              content={note.note.content}
              labels={note.note.lables}
              listItems={note.note.listItems}
              imageUrl={note.note.imageUrl}
            />
            {note.permission === "write" ? (
              <Tooltip label="Edit Note">
                <IconButton
                  icon={<MdEdit size={20} />}
                  aria-label="Edit"
                  {...customIconButtonProps}
                  width={"40px"}
                  onClick={onOpen}
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
                  <FormControl>
                    <Input placeholder="Title" />
                  </FormControl>
                  {/* {editableContent.content && (
                    <FormControl>
                      <Textarea
                        placeholder="Content"
                        value={editableContent.content}
                        onChange={(e) =>
                          handleChange("content", e.target.value)
                        }
                      />
                    </FormControl>
                  )}
                  {editableContent.imageUrl && (
                    <NoteImage imageUrl={editableContent.imageUrl} />
                  )}
                  {editableContent.listItems &&
                    editableContent.listItems.map((item) => (
                      <li key={item}> {item}</li>
                    ))} */}
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
          </div>
        </>
      ))}
    </>
  );
};
SharedNoteCard.propTypes = {
  notes: PropTypes.array.isRequired,
};
export default SharedNoteCard;
