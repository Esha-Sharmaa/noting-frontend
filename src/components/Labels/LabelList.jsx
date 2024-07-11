import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Text,
  IconButton,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import useLabel from "../../hooks/useLabel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useToastNotification from "../../hooks/useToastNotification";
import { format } from "date-fns";

const LabelList = () => {
  const [newLabel, setNewLabel] = useState("");
  const { fetchLabels, addLabel, deleteLabel } = useLabel();
  const { data: labels, isLoading, isError } = useQuery({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToastNotification();
  const addLabelMutation = useMutation({
    mutationFn: addLabel,
    onSuccess: () => {
      queryClient.invalidateQueries(["labels"]);
      showSuccessToast({
        title: "Label Added.",
        description: "Label created successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR.",
        description: error.response.data.message,
      });
    },
  });
  const deleteLabelMutation = useMutation({
    mutationFn: deleteLabel,
    onSuccess: () => {
      queryClient.invalidateQueries(["labels"]);
      showSuccessToast({
        title: "SUCCESS",
        description: "Label Deleted successfully",
      });
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR.",
        description: error.response.data.message,
      });
    },
  });
  const handleAddLabel = () => {
    addLabelMutation.mutate({ name: newLabel });
  };

  const handleDeleteLabel = (id) => {
    deleteLabelMutation.mutate({ id });
  };

  const inputBgColor = "#484A4D"; // Darker color for the input background
  const itemBgColor = "#484A4D"; // Darker color for the label items
  const itemHoverBgColor = "#5C5E61"; // Slightly lighter color for hover effect

  return (
    <Box
      p={5}
      maxW="600px"
      mx="auto"
      bg="#303236"
      color="white"
      borderRadius="md"
      boxShadow="lg"
    >
      <VStack spacing={4} align="start">
        <h1 className="text-2xl font-bold">Manage Labels</h1>
        <FormControl id="new-label">
          <FormLabel>Create New Label</FormLabel>
          <Flex>
            <Input
              placeholder="New label name"
              bg={inputBgColor}
              borderColor={inputBgColor}
              _placeholder={{ color: "gray.300" }}
              color="white"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
            <Button
              ml={2}
              onClick={handleAddLabel}
              bg={"#c64cff"}
              color={"white"}
              _hover={""}
            >
              Add
            </Button>
          </Flex>
        </FormControl>

        <Divider />
        {isLoading && "Loading your labels"}
        {isError && "Error Loading your labels"}
        <Box maxH="300px" overflowY="auto" w="100%">
          <List spacing={3} width="100%">
            {labels?.data?.map((label) => (
              <ListItem
                key={label._id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
                bg={itemBgColor}
                borderRadius="md"
                boxShadow="md"
                _hover={{ bg: itemHoverBgColor }}
              >
                <Box>
                  <Text fontWeight="bold" fontSize="md">
                    {label.name}
                  </Text>
                  <Text fontSize="sm" color="gray.300">
                    <span className="pr-1"> Created at: </span>
                    {label.createdAt
                      ? format(new Date(label.createdAt), "yyyy-MM-dd")
                      : "N/A"}
                  </Text>
                </Box>
                <IconButton
                  aria-label="Delete label"
                  icon={<FaTrash />}
                  onClick={() => handleDeleteLabel(label._id)}
                  colorScheme="red"
                  variant="ghost"
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Box>
  );
};

export default LabelList;
