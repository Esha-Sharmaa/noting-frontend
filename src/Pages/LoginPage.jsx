import { useEffect, useState } from "react";
import validateUserData from "../utlis/validateUserData.js";
import Input from "../components/Login/Input.jsx";
import LoginHeader from "../components/Login/LoginHeader.jsx";
import { useNavigate } from "react-router-dom";
import ToggleFormButton from "../components/Login/ToggleFromButton.jsx";
import useAuth from "../hooks/useAuth.js";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import google from "../assets/images/png/google.png";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState("");
  const {
    isAuthenticated,
    login,
    setIsAuthenticated,
    setUser,
    registerUser,
    googleLogin,
  } = useAuth();

  const {
    mutate: loginMutation,
    isError: loginError,
    error: loginErrorDetails,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {

      setIsAuthenticated(true);
      setUser(data.data);
    },
    onError: (error) => {
      console.log("Error from onError", error);
    },
  });

  const {
    mutate: registerMutation,
    isError: registerError,
    error: registerErrorDetails,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setRegistrationSuccess("Registration successful! Please log in.");
      setIsLoginForm(true);
      setFormState({ fullName: "", email: "", password: "" });
    },
    onError: (error) => {
      console.log("Error from onError", error.response.data.message);
    },
  });

  const { mutate: googleLoginMutation } = useMutation({
    mutationFn: googleLogin,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.data);
    },
    onError: (error) => {
      console.log("Error from google Login", error);
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
    setFormState({ fullName: "", email: "", password: "" });
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
      setValidationErrors(errors);
      return;
    }
    if (isLoginForm) {
      loginMutation({ email: formState.email, password: formState.password });
    } else {
      registerMutation(formState);
    }
  };
  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    googleLoginMutation(accessToken);
  }
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-[#303236] to-[#606060] h-screen">
      <div className="w-[90%] md:w-[50%] bg-[#333539] pt-16 pb-16 flex flex-col items-center rounded-3xl">
        <LoginHeader />
        {(loginError || registerError) && (
          <p
            className={`text-[#ef6868] text-sm border-2 border-[#ef6868] pl-4 pr-4 mt-4 pt-1 pb-1 rounded`}
          >
            {loginError
              ? loginErrorDetails?.response?.data?.message
              : registerErrorDetails?.response?.data?.message}
          </p>
        )}
        {registrationSuccess && (
          <p
            className={`text-[#68ef68] text-sm border-2 border-[#68ef68] pl-4 pr-4 mt-4 pt-1 pb-1 rounded`}
          >
            {registrationSuccess}
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
        </form>
        <h3 className="mt-2"> or sign up using </h3>
        <button
          onClick={() => handleGoogleLogin()}
          className=" border-[#000000] border-2 rounded-full p-2 w-[45px] h-[45px] mt-2"
        >
          <img src={google} alt="google" />
        </button>
        <ToggleFormButton
          isLoginForm={isLoginForm}
          handleLoginFormToggle={handleLoginFormToggle}
        />
      </div>
    </div>
  );
};

export default Login;
