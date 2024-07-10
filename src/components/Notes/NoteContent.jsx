import Collaborators from "../Collaborators/Collaborator";
import Labels from "../Labels/Labels";
import NoteImage from "./NoteImage";
import PropTypes from "prop-types";

const NoteContent = ({
  id,
  content,
  imageUrl,
  listItems,
  labels,
  collaborators,
  onShowCollabModalOpen,
}) => {
  return (
    <>
      {content && (
        <p className="text-[15px] md:text-[16px] pb-3"> {content} </p>
      )}
      {imageUrl && <NoteImage imageUrl={imageUrl} />}
      {listItems &&
        listItems.map((item) => (
          <li className="text-[15px] md:text-[16px] pb-3" key={item}>
            {" "}
            {item}
          </li>
        ))}
      {labels && <Labels labels={labels} noteId={id} />}
      {collaborators && (
        <Collaborators
          collaborators={collaborators}
          onShowCollabModalOpen={onShowCollabModalOpen}
        />
      )}
    </>
  );
};
NoteContent.propTypes = {
  content: PropTypes.string,
  listItems: PropTypes.array,
  collaborators: PropTypes.array,
  imageUrl: PropTypes.string,
  labels: PropTypes.array,
  id: PropTypes.string.isRequired,
  onShowCollabModalOpen: PropTypes.func.isRequired,
};
export default NoteContent;
