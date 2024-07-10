import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useNotes from "../../hooks/useNotes.js";
import useToastNotification from "../../hooks/useToastNotification";
const Labels = ({ labels, noteId }) => {
  const queryClient = useQueryClient();
  const { deleteLabelFromNote } = useNotes();
  const { showSuccessToast, showErrorToast } = useToastNotification();

  const mutation = useMutation({
    mutationFn: deleteLabelFromNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "Label deleted.",
        description: "Label was deleted successfully",
      });
    },
    onError: () => {
      showErrorToast({
        title: "Error ",
        description: "Error while deleting label",
      });
    },
  });
  const handleDeleteLabel = (id) => {
    mutation.mutate({ labelId: id, noteId });
  };
  return (
    <div className="mb-2">
      {labels.map((label) => (
        <Tag
          key={label._id}
          size={"sm"}
          borderRadius="full"
          variant="solid"
          colorScheme="gray"
          m={1}
        >
          <TagLabel>{label.name}</TagLabel>
          <TagCloseButton onClick={() => handleDeleteLabel(label._id)} />
        </Tag>
      ))}
    </div>
  );
};
Labels.propTypes = {
  labels: PropTypes.array.isRequired,
  noteId: PropTypes.string.isRequired,
};
export default Labels;
