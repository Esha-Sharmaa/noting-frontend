import logo from "../../assets/images/png/Color logo - no background.png";
const LoginHeader = () => {
  return (
    <>
      <img src={logo} alt="logo" className="w-[160px]" />
      <div className="h-[2px] w-[75%] bg-[#EA80FC] m-4"> </div>
      <h2 className="text-[#EA80FC] text-[20px]">
        Start Keep Noting your notes
      </h2>
    </>
  );
};

export default LoginHeader;
