import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLabel from "../../hooks/useLabel";
import useNotes from "../../hooks/useNotes";
import PropTypes from "prop-types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  IconButton,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import useToastNotification from "../../hooks/useToastNotification";

const LabelModal = ({ isOpen, onClose, noteId }) => {
  const { addLabelToNote } = useNotes();
  const { fetchLabels } = useLabel();
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToastNotification();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });
  const mutation = useMutation({
    mutationFn: addLabelToNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "Label Added.",
        description: "Label was added successfully",
      });
      onClose();
    },
    onError: () => {
      showErrorToast({
        title: "ERROR.",
        description: "Error Adding Label",
      });
      onClose();
    },
  });
  const handleAddLabel = ({ labelId, noteId }) => {
    console.log(labelId, noteId);
    mutation.mutate({ labelId, noteId });
  };
  return (
    <>
      {isLoading && <h1> is Loading</h1>}
      {isError && <h1> Error loading labels {error.message}</h1>}
      {data?.data && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="#303236" color="white">
            <ModalHeader>Add Labels </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <div>
                {data.data.map((label) => (
                  <div
                    key={label._id}
                    className="flex justify-between py-3 px-2"
                  >
                    <p className="font-semibold">{label.name}</p>
                    <IconButton
                      icon={<FaPlus size={12} />}
                      aria-label="add"
                      variant={"outline"}
                      size={"xs"}
                      color={"white"}
                      _hover={{ bg: "#ea80fc", color: "white" }}
                      onClick={() =>
                        handleAddLabel({ labelId: label._id, noteId })
                      }
                    />
                  </div>
                ))}
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
LabelModal.prototype = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  noteId: PropTypes.string.isRequired,
};
export default LabelModal;
