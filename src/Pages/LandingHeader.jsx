import logo from "../assets/images/png/Color logo - no background.png";
const LandingHeader = () => {
  return (
    <>
      <div className="border-b-2 px-8 py-[14px] gap-2 md:gap-8 flex justify-center md:justify-start">
        <a to={"/"} className="col-span-1 flex items-center gap-4">
          <img src={logo} alt="logo" className="w-[10rem] md:w-48" />
        </a>
      </div>
    </>
  );
};
export default LandingHeader;
