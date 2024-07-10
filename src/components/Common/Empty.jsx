import { Box, Text, VStack, Image } from "@chakra-ui/react";
import emptyImage from "../../assets/images/png/empty-folder.png"; // Assume you have an appropriate illustration
import PropTypes from "prop-types";
const Empty = ({ message }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
      bg="#303236"
      p={5}
    >
      <VStack spacing={5}>
        <Image src={emptyImage} alt="No Notes" boxSize="150px" />
        <Text fontSize="xl" fontWeight="bold" color="white">
          No Notes Yet
        </Text>
        <Text fontSize="md" color="gray.500">
          {message}
        </Text>
      </VStack>
    </Box>
  );
};
Empty.prototype = {
  message: PropTypes.string.isRequired,
};
export default Empty;
