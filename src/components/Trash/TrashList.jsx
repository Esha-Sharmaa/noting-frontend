import useNotes from "../../hooks/useNotes";
import Empty from "../Common/Empty";
import NoteCard from "../Notes/NoteCard";
import { useQuery } from "@tanstack/react-query";
const TrashList = () => {
  const { fetchNotes } = useNotes();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <h1>Loading the notes...</h1>;
  if (isError) return <h1>{error?.message}</h1>;

  const filteredNotes = data?.data?.filter((note) => note.isTrashed) || [];
  if (filteredNotes?.length === 0)
    return <Empty message={"You have not trashed any notes yet. "} />;

  return (
    <>
      <p className="text-center text-gray-400 italic text-sm p-4">
        Notes will be deleted automatically after 10 days
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-10">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note._id}
            id={note._id}
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
    </>
  );
};

export default TrashList;
