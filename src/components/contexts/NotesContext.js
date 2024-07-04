import { createContext, useContext } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    // make a get request to "http://localhost:5000/api/v1/notes"
    // store all the notes in the notes State
  };
  const addNote = ({ title, type, content, image, listItems }) => {
    // make a post request to "http://localhost:5000/api/v1/notes/add"
    // and re-fetch the notes data to update the notes state
  };
  const deleteNote = ({ id }) => {
    // make a delete request to "http://localhost:5000/api/v1/notes/delete/id"
    // and re-fetch the notes data
  };
  const addCollaborator = ({ email, noteId, permission }) => {
    // make a post request to http://localhost:5000/api/v1/collaborators/add
    // data send format
    /* {
    "email":"muskantiwari@gmail.com",
    "noteId":"668433d3c1cc93c9a924e4c6",
    "permission":"read"
*/
    // update the notes state (again refetch)
  };
  const deleteCollaborator = ({ id }) => {
    /* make delete request http://localhost:5000/api/v1/collaborators/delete/id 
        again re-fetch the notes data to update the state
        */
  };

  const addLabelToNote = ({ labelId, noteId }) => {
    /* 
      make put request to "http://localhost:5000/api/v1/notes/labels/add"
      data sent {
    "labelId":"6683f544e19f6411a49d22a6",
    "noteId":"668433d3c1cc93c9a924e4c6"
    refetch the notes data to update the state
}
       */
  };
  const deleteLabelFromNote = ({ labelId, noteId }) => {
    /* 
      make delete request to "http://localhost:5000/api/v1/notes/labels/delete"
      data sent     {
    "labelId":"6683f544e19f6411a49d22a6",
    "noteId":"6683f35a435358daab029ea3"
}
    refetch the notes data to update
      */
  };
  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        fetchNotes,
        addCollaborator,
        addLabelToNote,
        deleteCollaborator,
        deleteLabelFromNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
export const useNotes = () => useContext(NotesContext);
