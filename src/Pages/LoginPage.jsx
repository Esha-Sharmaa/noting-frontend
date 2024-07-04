import { useEffect, useState } from "react";
import validateUserData from "../utlis/validateUserData.js";
import Input from "../components/Login/Input.jsx";
import LoginHeader from "../components/Login/LoginHeader.jsx";
import GoogleBtn from "../components/Login/GoogleBtn.jsx";
import { useNavigate } from "react-router-dom";
import ToggleFormButton from "../components/Login/ToggleFromButton.jsx";
import useAuth from "../hooks/useAuth.js";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const { isAuthenticated, login, setIsAuthenticated, setUser } = useAuth();

  const { mutate: loginMutation, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.data);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", JSON.stringify(data.data));
    },
    onError: (error) => {
      console.log("Error from onError", error.response.data.message);
    },
  });
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handleLoginFormToggle = (e) => {
    e.preventDefault();
    setIsLoginForm(!isLoginForm);
    setFormState({ name: "", email: "", password: "" });
    setValidationErrors({});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    const errors = validateUserData(formState, isLoginForm);
    if (Object.keys(errors)?.length) {
      console.log("error object", errors);
      setValidationErrors(errors);
      return;
    }
    loginMutation({ email: formState.email, password: formState.password });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  if (isAuthenticated) {
    return null;
  }
  return (
    <div className="flex justify-center items-center  bg-gradient-to-b from-[#303236] to-[#606060] h-screen">
      <div className="w-[90%] md:w-[50%] bg-[#333539] pt-16 pb-16 flex flex-col items-center rounded-3xl">
        <LoginHeader />
        {isError && (
          <p
            className={`text-[#ef6868] text-sm border-2 border-[#ef6868] pl-4 pr-4 mt-4 pt-1 pb-1 rounded ${
              isError ? "" : "invisible"
            }`}
          >
            {error.response.data.message}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-[100%] flex flex-col items-center mt-12"
        >
          {!isLoginForm && (
            <div className="flex flex-col w-[60%] md:w-[45%]">
              <Input
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={formState.fullName}
                onChange={handleChange}
                error={validationErrors?.fullName}
              />
            </div>
          )}
          <div className="flex flex-col w-[60%] md:w-[45%]">
            <Input
              name="email"
              type="email"
              placeholder="email"
              value={formState.email}
              onChange={handleChange}
              error={validationErrors?.email}
            />
          </div>
          <div className="flex flex-col w-[60%] md:w-[45%]">
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={formState.password}
              onChange={handleChange}
              error={validationErrors?.password}
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#EA80FC] to-[#8B4C96] pl-4 pr-4 pt-2 pb-2 mt-4"
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
          <h3 className="mt-2"> or sign up using </h3>
          <GoogleBtn />
          <ToggleFormButton
            isLoginForm={isLoginForm}
            handleLoginFormToggle={handleLoginFormToggle}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
