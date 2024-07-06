import PropTypes from "prop-types";
const NoteImage = ({ imageUrl }) => {
  return (
    <>
      <img
        src={imageUrl}
        alt="Note"
        className="my-3 rounded-md shadow-md max-w-full object-cover"
      />
    </>
  );
};
NoteImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
export default NoteImage;
