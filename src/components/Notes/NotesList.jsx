import { useQuery } from "@tanstack/react-query";
import useNotes from "../../hooks/useNotes";
import NoteCard from "./NoteCard";
import Empty from "../Common/Empty";

const NotesList = () => {
  const { fetchNotes } = useNotes();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <h1>Loading the notes...</h1>;
  if (isError) return <h1>{error?.message}</h1>;

  const filteredNotes =
    data?.data?.filter((note) => {
      return !note.isArchived && !note.isTrashed;
    }) || [];

  if (filteredNotes?.length === 0)
    return <Empty message={"You have not Createds any notes yet. "} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-10">
      {filteredNotes.map((note) => (
        <NoteCard
          key={note._id}
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
        />
      ))}
    </div>
  );
};

export default NotesList;
