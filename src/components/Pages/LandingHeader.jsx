import { Link } from "react-router-dom";
import logo from "../images/png/Color logo - no background.png";
const LandingHeader = () => {
  return (
    <>
      <div className="grid grid-cols-4 md:grid-cols-5 border-b-2 px-8 py-[14px] gap-2 md:gap-8 items-center">
        <Link to={"/"} className="col-span-1 flex items-center gap-4">
          <img src={logo} alt="logo" className="w-32" />
        </Link>
      </div>
    </>
  );
};
export default LandingHeader;
