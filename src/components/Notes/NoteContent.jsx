import Collaborators from "./Collaborator";
import Labels from "./Labels";
import NoteImage from "./NoteImage";
import PropTypes from "prop-types";

const NoteContent = ({
  content,
  imageUrl,
  listItems,
  labels,
  collaborators,
}) => {
  return (
    <>
      {content && <p className="text-[17px] pb-3"> {content} </p>}
      {imageUrl && <NoteImage imageUrl={imageUrl} />}
      {listItems && listItems.map((item) => <li key={item}> {item}</li>)}
      {labels && <Labels labels={labels} />}
      {collaborators && <Collaborators collaborators={collaborators} />}
    </>
  );
};
NoteContent.propTypes = {
  content: PropTypes.string,
  listItems: PropTypes.array,
  collaborators: PropTypes.array,
  imageUrl: PropTypes.string,
  labels: PropTypes.array,
};
export default NoteContent;
