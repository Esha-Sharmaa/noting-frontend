import { useContext } from "react";
import { LabelContext } from "../contexts/LabelContext";

const useLabel = () => useContext(LabelContext);
export default useLabel;
