import PropTypes from "prop-types";
const Input = ({ name, type, placeholder, value, onChange, error }) => {
  return (
    <>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block bg-[#29292A] border-[#000000] border-2 outline-none p-2 mt-2  rounded "
      />
      {error && <span className="text-[#ef6868] text-[12px]">{error}</span>}
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};
export default Input;
