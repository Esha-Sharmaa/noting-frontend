import PropTypes from "prop-types";

const NoteImage = ({ imageUrl }) => {
  return (
    <div className="flex justify-center items-center my-4">
      <img
        src={imageUrl}
        alt="Note"
        className="max-w-full max-h-32 rounded-md shadow-md object-cover"
      />
    </div>
  );
};

NoteImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default NoteImage;
