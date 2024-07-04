import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
export const useNotes = () => useContext(NotesContext);
