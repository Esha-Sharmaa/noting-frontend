import axios from "../utlis/axiosConfig";
import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const LabelContext = createContext();

export const LabelProvider = ({ children }) => {
  const [labels, setLabels] = useState([]);
  const fetchLabels = async () => {
    const response = await axios.get("/api/v1/labels");
    setLabels(response.data.data);
    return response.data;
  };
  const addLabel = async ({ name }) => {
    const response = await axios.post("/api/v1/labels/create-label", {
      name,
    });
    return response.data;
  };
  const deleteLabel = async ({ id }) => {
    const response = await axios.delete(`/api/v1/labels/delete-label/${id}`);
    return response.data;
  };

  return (
    <LabelContext.Provider
      value={{ labels, setLabels, fetchLabels, addLabel, deleteLabel }}
    >
      {children}
    </LabelContext.Provider>
  );
};

LabelProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
