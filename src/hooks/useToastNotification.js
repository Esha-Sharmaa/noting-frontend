import { useToast } from "@chakra-ui/react";

const useToastNotification = () => {
  const toast = useToast();

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 2000,
      isClosable: true,
    });
  };

  const showSuccessToast = ({ title, description }) => {
    showToast(title, description, "success");
  };

  const showErrorToast = ({ title, description }) => {
    showToast(title, description, "error");
  };

  return { showSuccessToast, showErrorToast };
};

export default useToastNotification;
