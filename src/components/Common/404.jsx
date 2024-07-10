import { Box, Button, Text, VStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import notFoundImage from "../../assets/images/png/404-error.png"; // Assume you have an appropriate illustration

const NotFoundPage = () => {
  const naviagte = useNavigate();

  const goToHomePage = () => {
    naviagte("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      bg="#303236"
      p={5}
    >
      <VStack spacing={5}>
        <Image src={notFoundImage} alt="Page Not Found" boxSize="150px" />
        <Text fontSize="4xl" fontWeight="bold" color="white">
          404
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="white">
          Page Not Found
        </Text>
        <Text fontSize="md" color="gray.500">
          Oops! The page you are looking for does not exist.
          <br />
          It might have been moved or deleted.
        </Text>
        <Button colorScheme="purple" onClick={goToHomePage}>
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
