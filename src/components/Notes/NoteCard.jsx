import PropTypes from "prop-types";
import NoteContent from "./NoteContent";
import NoteHeader from "./NoteHeader";
import NoteFooter from "./NoteFooer";
import { useDisclosure } from "@chakra-ui/react";
import NoteModal from "./NoteModal";
import { useState } from "react";
import LabelModal from "../Labels/LabelModal";
import useNotes from "../../hooks/useNotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastNotification from "../../hooks/useToastNotification";
import AddCollaboratorModal from "../Collaborators/AddCollaboratorModal";
import ShowCollaboratorModal from "../Collaborators/ShowCollaboratorModal";
const NoteCard = ({
  type,
  title,
  id,
  content,
  imageUrl,
  listItems,
  labels,
  collaborators,
  updatedAt,
  user,
  isArchived,
  isTrashed,
}) => {
  const { showSuccessToast, showErrorToast } = useToastNotification();
  const {
    isOpen: isNoteModalOpen,
    onOpen: onNoteModalOpen,
    onClose: onNoteModalClose,
  } = useDisclosure();
  const {
    isOpen: isColModalOpen,
    onOpen: onColModalOpen,
    onClose: onColModalClose,
  } = useDisclosure();
  const {
    isOpen: isLabelModalOpen,
    onOpen: onLabelModalOpen,
    onClose: onLabelModalClose,
  } = useDisclosure();
  const {
    isOpen: isShowCollabModalOpen,
    onOpen: onShowCollabModalOpen,
    onClose: onShowCollabModalClose,
  } = useDisclosure();
  const [editableContent, setEditableContent] = useState({
    title,
    content,
    imageUrl,
    listItems,
  });
  const {
    archiveNote,
    trashNote,
    restoreNote,
    unarchiveNote,
    deleteNote,
    deleteCollaborator,
    addCollaborator,
    editNote,
  } = useNotes();
  const queryClient = useQueryClient();
  // mutation functions
  const editNoteMutation = useMutation({
    mutationFn: (formData) => editNote(formData.get("id"), formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "SUCCESS",
        description: "Note Edited Successfully",
      });
      onNoteModalClose();
    },
    onError: (error) => {
      console.log("Error in editing", error);
      showErrorToast({
        title: "ERROR",
        description: error.response.data.message,
      });
    },
  });
  const archiveMutation = useMutation({
    mutationFn: archiveNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "Note Archived",
        description: "Note Archived Successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR",
        description: error.response.data.message,
      });
    },
  });
  const trashMutation = useMutation({
    mutationFn: trashNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "Note Trashed",
        description: "Note Trashed Successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR",
        description: error.response.data.message,
      });
    },
  });
  const unarchiveMutation = useMutation({
    mutationFn: unarchiveNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "Note Unarchived",
        description: "Note Unarchived Successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR",
        description: error.response.data.message,
      });
    },
  });
  const restoreMutation = useMutation({
    mutationFn: restoreNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "Note Restored",
        description: "Note restored Successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR",
        description: error.response.data.message,
      });
    },
  });
  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "Note Deleted",
        description: "Note deleted Successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR",
        description: error.response.data.message,
      });
    },
  });
  const removeCollaboratorMutation = useMutation({
    mutationFn: deleteCollaborator,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "Success",
        description: "Collaborator removed Successfully",
      });
      onShowCollabModalClose();
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR",
        description: error.response.data.message,
      });
      onShowCollabModalClose();
    },
  });
  const addCollabratorMutation = useMutation({
    mutationFn: addCollaborator,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "SUCCESS",
        description: "Collaborator added Successfully",
      });
      onColModalClose();
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR",
        description: error.response.data.message,
      });
      onColModalClose();
    },
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
    console.log(editableContent);
    formData.append("id", id);
    formData.append("type", type);
    formData.append("title", editableContent.title);
    formData.append("content", editableContent.content);
    formData.append("noteImage", editableContent.imageUrl);
    formData.append("listItems", JSON.stringify(editableContent.listItems));
    editNoteMutation.mutate(formData);
  };
  const handelAddArchive = () => {
    archiveMutation.mutate(id);
  };
  const handleTrashNote = () => {
    trashMutation.mutate(id);
  };
  const handleUnarchiveNote = () => {
    unarchiveMutation.mutate(id);
  };
  const handleRestoreNote = () => {
    restoreMutation.mutate(id);
  };
  const handleDeleteNote = () => {
    deleteNoteMutation.mutate(id);
  };
  const handleRemoveCollab = (id) => {
    removeCollaboratorMutation.mutate(id);
  };
  const handleAddCollab = ({ email, noteId, permission }) => {
    addCollabratorMutation.mutate({ email, noteId, permission });
  };
  return (
    <>
      <div className="col-span-1 border-2 border-black p-4 rounded-md shadow-md min-h-[250px] flex flex-col">
        <NoteHeader title={title} updatedAt={updatedAt} />
        <NoteContent
          id={id}
          content={content}
          labels={labels}
          collaborators={collaborators}
          listItems={listItems}
          imageUrl={imageUrl}
          onShowCollabModalOpen={onShowCollabModalOpen}
        />
        <div className="flex-grow"></div>
        <NoteFooter
          onNoteModalOpen={onNoteModalOpen}
          onNoteCollOpen={onColModalOpen}
          onLabelModalOpen={onLabelModalOpen}
          onArchive={handelAddArchive}
          onTrash={handleTrashNote}
          onUnarchive={handleUnarchiveNote}
          onRestore={handleRestoreNote}
          onDelete={handleDeleteNote}
          isArchived={isArchived}
          isTrashed={isTrashed}
        />
        <NoteModal
          isOpen={isNoteModalOpen}
          onClose={onNoteModalClose}
          editableContent={editableContent}
          handleChange={handleChange}
          type={type}
          handleSubmit={handleSubmit}
        />
        <AddCollaboratorModal
          noteId={id}
          isOpen={isColModalOpen}
          onClose={onColModalClose}
          owner={user}
          collaborators={collaborators}
          addCollaborator={handleAddCollab}
        />
        <LabelModal
          isOpen={isLabelModalOpen}
          onClose={onLabelModalClose}
          noteId={id}
        />
        <ShowCollaboratorModal
          isOpen={isShowCollabModalOpen}
          onClose={onShowCollabModalClose}
          owner={user}
          collaborators={collaborators}
          removeCollaborator={handleRemoveCollab}
        />
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
  user: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  isArchived: PropTypes.bool.isRequired,
  isTrashed: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired, // New prop
  onPin: PropTypes.func.isRequired, // New prop
  onUnpin: PropTypes.func.isRequired, // New prop
};
export default NoteCard;
