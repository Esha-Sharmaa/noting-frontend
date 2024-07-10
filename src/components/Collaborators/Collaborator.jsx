import { Avatar, AvatarGroup } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Collaborators = ({ collaborators, onShowCollabModalOpen }) => {
  return (
    <div className="mb-2">
      <AvatarGroup
        size="xs"
        max={2}
        onClick={onShowCollabModalOpen}
        cursor={"pointer"}
      >
        {collaborators.map((coll) => (
          <Avatar
            size={"xs"}
            key={coll._id}
            name={coll.user.displayName}
            src={coll.user.avatar || null}
          />
        ))}
      </AvatarGroup>
    </div>
  );
};
Collaborators.propTypes = {
  collaborators: PropTypes.array.isRequired,
  onShowCollabModalOpen: PropTypes.func.isRequired,
};
export default Collaborators;
