import { createContext, useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../hooks/useAxios";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const axios = useAxios();

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/v1/notes");
      setNotes(response.data.data);

      return response.data;
    } catch (error) {
      console.log("Error fetching notes");
      throw error;
    }
  };
  const addNote = async (data) => {
    const response = await axios.post("/api/v1/notes/add", data);
    return response.data;
  };
  const fetchSharedNotes = async () => {
    const response = await axios.get("/api/v1/notes/collab");
    return response.data.data;
  };
  const deleteNote = async (id) => {
    const response = await axios.delete(`/api/v1/notes/delete/${id}`);

    return response.data;
  };
  const addCollaborator = async ({ email, noteId, permission }) => {
    const response = await axios.post("/api/v1/collaborators/add", {
      email,
      noteId,
      permission,
    });
    return response.data;
  };
  const deleteCollaborator = async (id) => {
    const response = await axios.delete(`/api/v1/collaborators/delete/${id}`);
    return response.data;
  };
  const addLabelToNote = async ({ labelId, noteId }) => {
    const response = await axios.put("/api/v1/notes/labels/add", {
      labelId,
      noteId,
    });
    return response.data;
  };
  const deleteLabelFromNote = async ({ labelId, noteId }) => {
    const response = await axios.delete(
      `/api/v1/notes/labels/delete/${labelId}/${noteId}`
    );
    return response.data;
  };
  const archiveNote = async (id) => {
    const response = await axios.put(`/api/v1/notes/archive/${id}`);
    return response.data;
  };
  const trashNote = async (id) => {
    const response = await axios.put(`/api/v1/notes/trash/${id}`);
    return response.data;
  };
  const restoreNote = async (id) => {
    const response = await axios.put(`/api/v1/notes/restore-trash/${id}`);
    return response.data;
  };
  const unarchiveNote = async (id) => {
    const response = await axios.put(`/api/v1/notes/unarchive/${id}`);
    return response.data;
  };
  const pinNote = async (id) => {
    const response = await axios.put(`/api/v1/notes/pin-note/${id}`);
    return response.data;
  };
  const unpinNote = async (id) => {
    const response = await axios.put(`/api/v1/notes/unpin-note/${id}`);
    return response.data;
  };
  const editNote = async (id, data) => {
    const response = await axios.put(`/api/v1/notes/edit/${id}`, data);
    return response.data;
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        setNotes,
        deleteNote,
        fetchNotes,
        addCollaborator,
        addLabelToNote,
        deleteCollaborator,
        deleteLabelFromNote,
        archiveNote,
        trashNote,
        restoreNote,
        unarchiveNote,
        fetchSharedNotes,
        editNote,
        pinNote,
        unpinNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
NotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
