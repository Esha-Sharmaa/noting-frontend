import { useQuery } from "@tanstack/react-query";
import useNotes from "../../hooks/useNotes";
import NoteCard from "./NoteCard";

const NotesList = () => {
  const { setNotes, fetchNotes } = useNotes();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    onSuccess: (data) => {
      console.log(data);
      setNotes(data.data);
    },
  });
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-10">
        {isLoading && <h1> Loading the notes</h1>}
        {isError && <h1> {error.message} </h1>}
        {data?.data && data.data?.data?.length === 0 && (
          <h1> You not created any notes yet.</h1>
        )}
        {data?.data?.length > 0 &&
          data.data.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              content={note.content}
              imageUrl={note.imageUrl}
              listItems={note.listItems}
              labels={note.label}
              collaborators={note.collaborators}
              updatedAt={note.updatedAt}
            />
          ))}
      </div>
    </>
  );
};

export default NotesList;
