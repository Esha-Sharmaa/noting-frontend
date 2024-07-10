import {
  MdEdit,
  MdArchive,
  MdDelete,
  MdPersonAdd,
  MdLabel,
  MdOutlineRestore,
  MdOutlineDelete,
  MdOutlineUnarchive,
} from "react-icons/md";
import {
  AlertDialog,
  IconButton,
  Tooltip,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useRef } from "react";

const NoteFooter = ({
  onNoteModalOpen,
  onNoteCollOpen,
  onLabelModalOpen,
  onArchive,
  onTrash,
  onRestore,
  onDelete,
  onUnarchive,
  isArchived,
  isTrashed,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const customIconButtonProps = {
    variant: "outline",
    color: "#ea80fc",
    borderColor: "black",
    _hover: { bg: "#ea80fc", color: "white" },
    _focus: { boxShadow: "outline" },
    isRound: true,
  };

  const trashedNoteFooter = (
    <>
      <Tooltip label="Restore Note">
        <IconButton
          icon={<MdOutlineRestore size={20} />}
          aria-label="Restore"
          {...customIconButtonProps}
          onClick={onRestore}
        />
      </Tooltip>
      <Tooltip label="Delete Note">
        <IconButton
          icon={<MdOutlineDelete size={20} />}
          aria-label="Delete"
          {...customIconButtonProps}
          onClick={onOpen}
        />
      </Tooltip>
    </>
  );

  const notTrashedNoteFooter = (
    <>
      <Tooltip label="Edit Note">
        <IconButton
          icon={<MdEdit size={20} />}
          aria-label="Edit"
          {...customIconButtonProps}
          onClick={onNoteModalOpen}
        />
      </Tooltip>
      {isArchived ? (
        <Tooltip label="Unarchive Note">
          <IconButton
            icon={<MdOutlineUnarchive size={20} />}
            aria-label="Unarchive"
            {...customIconButtonProps}
            onClick={onUnarchive}
          />
        </Tooltip>
      ) : (
        <Tooltip label="Archive Note">
          <IconButton
            icon={<MdArchive size={20} />}
            aria-label="Archive"
            {...customIconButtonProps}
            onClick={onArchive}
          />
        </Tooltip>
      )}
      <Tooltip label="Move to Trash">
        <IconButton
          icon={<MdDelete size={20} />}
          aria-label="Delete"
          {...customIconButtonProps}
          onClick={onTrash}
        />
      </Tooltip>
      <Tooltip label="Add Collaborator">
        <IconButton
          icon={<MdPersonAdd size={20} />}
          aria-label="Add Collaborator"
          {...customIconButtonProps}
          onClick={onNoteCollOpen}
        />
      </Tooltip>
      <Tooltip label="Add Label">
        <IconButton
          icon={<MdLabel size={20} />}
          aria-label="Add Label"
          {...customIconButtonProps}
          onClick={onLabelModalOpen}
        />
      </Tooltip>
    </>
  );

  return (
    <div className="flex justify-between mt-4">
      {isTrashed ? trashedNoteFooter : notTrashedNoteFooter}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={"#303236"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Note
            </AlertDialogHeader>

            <AlertDialogBody fontSize={"md"}>
              Are you sure? This Note will be delete permanently and can't be
              restored.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} size={"xs"}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3} size={"xs"}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

NoteFooter.propTypes = {
  onNoteModalOpen: PropTypes.func.isRequired,
  onNoteCollOpen: PropTypes.func.isRequired,
  onLabelModalOpen: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onTrash: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  isArchived: PropTypes.bool.isRequired,
  isTrashed: PropTypes.bool.isRequired,
};

export default NoteFooter;
