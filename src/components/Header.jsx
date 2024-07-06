import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/images/png/Color logo - no background.png";
const Header = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-5 border-b-2 px-2 md:px-8 py-[14px] gap-2 md:gap-8 items-center">
      <Link to={"/home"} className="col-span-1 flex items-center gap-4">
        <img
          src={logo}
          alt="logo"
          className="w-[6rem] md:w-36 transition-all ease-in-out duration-300"
        />
      </Link>
      <div className="col-span-2 md:col-span-3 flex items-center gap-4 rounded-md px-4 py-2 shadow-lg bg-darkBackground focus-within:ring-2 focus-within:ring-accentPurple">
        <FaSearch className="text-accentPurple" size={25} />
        <input
          type="text"
          placeholder="Search..."
          className="border-none outline-none bg-darkBackground w-full h-full text-white placeholder-gray-400 focus:ring-0 focus:outline-none font-sans"
        />
      </div>
      <div className="col-span-1 place-items-center"> Avatar </div>
    </div>
  );
};

export default Header;
