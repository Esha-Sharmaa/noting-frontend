import LandingPage from "./Pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthInit from "./hooks/useAuthInit";

function App() {
  useAuthInit();
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
