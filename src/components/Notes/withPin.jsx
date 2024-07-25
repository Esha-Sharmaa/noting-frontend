import { Box, IconButton } from "@chakra-ui/react";
import { FaThumbtack } from "react-icons/fa";
import PropTypes from "prop-types";

const withPin = (WrappedComopnent) => {
  const WithPinComponent = ({ isPinned, onPin, OnUnpin, pinId, ...props }) => {
    const handlePinClick = () => {
      if (isPinned) OnUnpin(pinId);
      else onPin(pinId);
    };

    return (
      <Box position={"relative"}>
        <IconButton
          aria-label="Pin Note"
          icon={<FaThumbtack />}
          position={"absolute"}
          top={"10px"}
          right="10px"
          colorScheme={isPinned ? "teal" : "gray"}
          onClick={handlePinClick}
          zIndex={1}
        />
        <WrappedComopnent {...props} />
      </Box>
    );
  };
  WithPinComponent.propTypes = {
    isPinned: PropTypes.bool,
    onPin: PropTypes.func.isRequired,
    OnUnpin: PropTypes.func.isRequired,
    pinId: PropTypes.string.isRequired,
  };

  return WithPinComponent;
};
export default withPin;
