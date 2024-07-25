import google from "../../assets/images/png/google.png";
const GoogleBtn = (handleGoogleLogin) => {
  return (
    <button
      onClick={() => handleGoogleLogin()}
      className=" border-[#000000] border-2 rounded-full p-2 w-[45px] h-[45px] mt-2"
    >
      <img src={google} alt="google" />
    </button>
  );
};
export default GoogleBtn;
