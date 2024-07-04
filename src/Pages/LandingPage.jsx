import { Link } from "react-router-dom";
import landingImg from "../assets/images/png/landing.png";
import LandingHeader from "./LandingHeader";

const LandingPage = () => {
  return (
    <>
      <LandingHeader />
      <div className="flex items-center p-12 h-[88vh] gap-12">
        <div className="w-[100%] md:w-[50%]">
          <h1 className="landing-heading font-bungee ">
            Capture, Organize, and Stay Productive
          </h1>
          <h2 className="mt-4 text-[20px] md:text-[24px]">
            Your All-In-One Notes App
          </h2>
          <p className="mt-4 mb-8 text-[16px] md:text-[20px]">
            Effortlessly capture ideas, manage tasks, and stay organized with
            our powerful notes application. Sign up now!
          </p>
          <Link
            to={"/login"}
            className="bg-gradient-to-r from-[#EA80FC] to-[#8B4C96] pl-4 pr-4 pt-2 pb-2 rounded-lg text-[20px]"
          >
            Get Started
          </Link>
        </div>
        <div className="hidden md:w-[45%] md:block">
          <img src={landingImg} alt="landing page" />
        </div>
      </div>
    </>
  );
};
export default LandingPage;
