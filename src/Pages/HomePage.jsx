import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1> Welcome to home page</h1>
      <Link to={"/login"}> Login Page </Link>
      <Link to={"/"}> Landing Page</Link>
    </>
  );
};
export default HomePage;
