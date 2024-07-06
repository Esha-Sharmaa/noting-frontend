import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
const useNotes = () => useContext(NotesContext);
export default useNotes;
