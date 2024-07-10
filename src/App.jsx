import { Outlet } from "react-router-dom";
import useAuthInit from "./hooks/useAuthInit";

function App() {
  useAuthInit();
  return <Outlet />;
}

export default App;
