import { createContext, useState } from "react";

const LabelContext = createContext();

const LabelProvider = ({ childern }) => {
  cosnt[(labels, setLabels)] = useState([]);

  const fetchLabels = () => {
    // make get request to "http://localhost:5000/api/v1/labels"
    // and update the labels state
  };
  const addLabel = ({ name }) => {
    // make post request to "http://localhost:5000/api/v1/labels/create-label"
    // data sent {name:"label-name"}
    // re-fetch labels data
  };
  const deleteLabel = ({ id }) => {
    // make delete request to "http://localhost:5000/api/v1/labels/delete-label/:id
    // re-fetch labels data
  };
  return (
    <LabelContext.Provider
      value={{ labels, fetchLabels, addLabel, deleteLabel }}
    >
      {childern}
    </LabelContext.Provider>
  );
};
