// src/components/ToggleFormButton.jsx
import PropTypes from "prop-types";

const ToggleFormButton = ({ isLoginForm, handleLoginFormToggle }) => (
  <p className="text-sm">
    {isLoginForm ? "Does not have an account?" : "Already have an account?"}
    <button
      onClick={handleLoginFormToggle}
      className="text-sm border-b-2 border-[#EA80FC]"
    >
      {isLoginForm ? "Sign Up" : "Login"}
    </button>
  </p>
);

ToggleFormButton.propTypes = {
  isLoginForm: PropTypes.bool.isRequired,
  handleLoginFormToggle: PropTypes.func.isRequired,
};

export default ToggleFormButton;
