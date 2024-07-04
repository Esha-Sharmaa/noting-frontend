import "../landingPage.css";
import landingImg from "../images/png/landing.png";
import { Link } from "react-router-dom";
import LandingHeader from "./LandingHeader";

const LandingPage = () => {
    return (
        <>
            <LandingHeader />
            <div className="flex items-center p-12 h-[88vh] gap-12">
                <div className="w-[50%]">
                    <h1 className="landing-heading font-bungee ">Capture, Organize, and Stay Productive </h1>
                    <h2 className="mt-4 text-[24px]"> Your All-In-One Notes App</h2>
                    <p className="mt-4 mb-8 text-[20px]"> Effortlessly capture ideas, manage tasks, and stay organized with our powerful notes application. Sign up now!</p>
                    <Link to={"/login"} className="bg-gradient-to-r from-[#EA80FC] to-[#8B4C96] pl-4 pr-4 pt-2 pb-2 rounded-lg text-[20px]">
                        Get Started
                    </Link>
                </div>
                <div className="w-[45%]">
                    <img src={landingImg} alt="landing page" />
                </div>
            </div>
        </>
    )
}
export default LandingPage;