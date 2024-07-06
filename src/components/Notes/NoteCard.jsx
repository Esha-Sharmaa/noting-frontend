import PropTypes from "prop-types";
import NoteContent from "./NoteContent";
import NoteHeader from "./NoteHeader";
import NoteFooter from "./NoteFooer";
import { useDisclosure } from "@chakra-ui/react";
import NoteModal from "./NoteModal";
import { useState } from "react";
const NoteCard = ({
  title,
  content,
  imageUrl,
  listItems,
  labels,
  collaborators,
  updatedAt,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editableContent, setEditableContent] = useState({
    title,
    content,
    imageUrl,
    listItems,
  });
  const handleChange = (field, value) => {
   setEditableContent((prev) => ({
      ...prev,
      [field]: value,
    }));

  }
  return (
    <>
      <div className="col-span-1 border-2 border-black p-4 rounded-md shadow-md min-h-[250px] flex flex-col">
        <NoteHeader title={title} updatedAt={updatedAt} />
        <NoteContent
          content={content}
          labels={labels}
          collaborators={collaborators}
          listItems={listItems}
          imageUrl={imageUrl}
        />
        <div className="flex-grow"></div>
        {/* This div pushes NoteFooter to the bottom */}
        <NoteFooter onOpen={onOpen} />
        <NoteModal isOpen={isOpen} onClose={onClose} editableContent={editableContent} handleChange={ handleChange} />
      </div>
    </>
  );
};
NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  listItems: PropTypes.array,
  collaborators: PropTypes.array,
  imageUrl: PropTypes.string,
  labels: PropTypes.array,
  updatedAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
    .isRequired,
};
export default NoteCard;
