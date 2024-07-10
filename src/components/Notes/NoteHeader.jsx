import PropTypes from "prop-types";
import { format } from "date-fns";
const NoteHeader = ({ title, updatedAt }) => {
  // Format the updatedAt date
  const formattedDate = format(new Date(updatedAt), "PPpp");
  return (
    <>
      <div className="border-b-2 border-gray-500 my-3 pb-2">
        <h1 className="text-lg md:text-[1.47rem] font-bold "> {title} </h1>
        <span className="text-[10px] md:text-[12px] mb-2 text-gray-400">
          {`Last Updated At: ${formattedDate}`}
        </span>
      </div>
    </>
  );
};

NoteHeader.prototype = {
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
    .isRequired,
};
export default NoteHeader;
