import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import PropTypes from "prop-types";
const Labels = ({ labels }) => {
  return (
    <div className="mb-2">
      {labels.map((label) => (
        <Tag
          key={label._id}
          size={"sm"}
          borderRadius="full"
          variant="solid"
          colorScheme="gray"
          m={1}
        >
          <TagLabel>{label.name}</TagLabel>
          <TagCloseButton />
        </Tag>
      ))}
    </div>
  );
};
Labels.propTypes = {
  labels: PropTypes.array.isRequired,
};
export default Labels;
