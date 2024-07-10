import { useQuery } from "@tanstack/react-query";
import useNotes from "../../hooks/useNotes";
import Empty from "../Common/Empty";
import SharedNoteCard from "./SharedNoteCard";

const SharedNoteList = () => {
  const { fetchSharedNotes } = useNotes();
  const { data: sharedList, isLoading, isError, error } = useQuery({
    queryKey: ["sharedList"],
    queryFn: fetchSharedNotes,
  });
  if (isLoading) return <h1>Loading the notes...</h1>;
  if (isError) return <h1>{error?.message}</h1>;
  if (sharedList?.length === 0)
    return <Empty message={"You have not Createds any notes yet. "} />;
  if (sharedList) console.log(sharedList[0]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-10">
        {sharedList.map((item) => (
          <SharedNoteCard
            key={item.note._id}
            note={item.note}
            permission={item.permission}
            
          />
        ))}
      </div>
    </>
  );
};
export default SharedNoteList;
