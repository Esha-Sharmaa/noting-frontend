import { Link } from "react-router-dom";
import google from "../../assets/images/png/google.png";
const GoogleBtn = () => {
  return (
    <Link
      to={"http://localhost:5000/auth/google"}
      className=" border-[#000000] border-2 rounded-full p-2 w-[45px] h-[45px] mt-2"
    >
      <img src={google} alt="google" />
    </Link>
  );
};
export default GoogleBtn;
