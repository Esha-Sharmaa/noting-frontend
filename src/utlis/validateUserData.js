const validateUserData = ({ fullName, password, email }, isLoginForm) => {
  let errors = {};
  console.log(fullName, password, email);
  if (!isLoginForm && !fullName) {
    console.log(fullName.length, isLoginForm);
    errors.fullName = "Full Name is required";
  } else if (!isLoginForm && fullName?.length < 3) {
    errors.fullName = "Full Name must be atleast 3 characters long";
  } else if (!isLoginForm && !/^[A-Za-z\s]+$/.test(fullName)) {
    errors.fullName = "Full Name must only contain letters and space";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    console.log(password.length);
    errors.password = "Password must be atleast 8 characters";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
  ) {
    errors.password =
      "Password must contain a lowercase and uppercase letter and a special character";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid Email Address";
  }
  return errors;
};

export default validateUserData;
