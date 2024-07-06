import { IconButton, Tooltip } from "@chakra-ui/react";
import {
  MdEdit,
  MdArchive,
  MdDelete,
  MdPersonAdd,
  MdLabel,
} from "react-icons/md";
import PropTypes from "prop-types";

const NoteFooter = ({ onOpen }) => {
  const customIconButtonProps = {
    variant: "outline",
    color: "#ea80fc",
    borderColor: "black",
    _hover: { bg: "#ea80fc", color: "white" },
    _focus: { boxShadow: "outline" },
    isRound: true,
  };

  return (
    <div className="flex justify-between mt-4">
      <Tooltip label="Edit Note">
        <IconButton
          icon={<MdEdit size={20} />}
          aria-label="Edit"
          {...customIconButtonProps}
          onClick={onOpen}
        />
      </Tooltip>
      <Tooltip label="Archive Note">
        <IconButton
          icon={<MdArchive size={20} />}
          aria-label="Archive"
          {...customIconButtonProps}
        />
      </Tooltip>
      <Tooltip label="Move to Trash">
        <IconButton
          icon={<MdDelete size={20} />}
          aria-label="Delete"
          {...customIconButtonProps}
        />
      </Tooltip>
      <Tooltip label="Add Collaborator">
        <IconButton
          icon={<MdPersonAdd size={20} />}
          aria-label="Add Collaborator"
          {...customIconButtonProps}
        />
      </Tooltip>
      <Tooltip label="Add Label">
        <IconButton
          icon={<MdLabel size={20} />}
          aria-label="Add Label"
          {...customIconButtonProps}
        />
      </Tooltip>
    </div>
  );
};

NoteFooter.propTypes = {
  // onEdit: PropTypes.func.isRequired,
  // onArchive: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired,
  // onAddCollaborator: PropTypes.func.isRequired,
  // onAddLabel: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default NoteFooter;
