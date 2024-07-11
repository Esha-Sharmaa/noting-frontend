import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useNotes from "../../hooks/useNotes";
import NoteCard from "./NoteCard";
import Empty from "../Common/Empty";
import withPin from "./withPin";
import useToastNotification from "../../hooks/useToastNotification";

const NotesList = () => {
  const { fetchNotes, pinNote, unpinNote } = useNotes();
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToastNotification();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });
  const pinNoteMutation = useMutation({
    mutationFn: pinNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "Success",
        description: "Note Pinned Successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR.",
        description: error.response.data.message,
      });
    },
  });

  const unpinNoteMutation = useMutation({
    mutationFn: unpinNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      showSuccessToast({
        title: "Success",
        description: "Note unpinned Successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR.",
        description: error.response.data.message,
      });
    },
  });

  const handlePin = (id) => {
    pinNoteMutation.mutate(id);
  };
  const handleUnpin = (id) => {
    unpinNoteMutation.mutate(id);
  };
  if (isLoading) return <h1>Loading the notes...</h1>;
  if (isError) return <h1>{error?.message}</h1>;

  const filteredNotes =
    data?.data?.filter((note) => {
      return !note.isArchived && !note.isTrashed;
    }) || [];

  if (filteredNotes?.length === 0)
    return <Empty message={"You have not Createds any notes yet. "} />;

  const NoteCardWithPin = withPin(NoteCard);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-10">
      {filteredNotes.map((note) => (
        <NoteCardWithPin
          key={note._id}
          pinId={note._id}
          id={note._id}
          type={note.type}
          title={note.title}
          content={note.content}
          imageUrl={note.imageUrl}
          listItems={note.listItems}
          labels={note.label}
          collaborators={note.collaborators}
          updatedAt={note.updatedAt}
          user={note.user}
          isArchived={note.isArchived}
          isTrashed={note.isTrashed}
          isPinned={note?.isPinned}
          onPin={handlePin}
          OnUnpin={handleUnpin}
        />
      ))}
    </div>
  );
};

export default NotesList;
