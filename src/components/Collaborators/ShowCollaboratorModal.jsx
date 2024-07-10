import {
  Avatar,
  ModalCloseButton,
  VStack,
  Box,
  HStack,
  Text,
  IconButton,
  Flex,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

const ShowCollaboratorModal = ({
  isOpen,
  onClose,
  owner,
  collaborators,
  removeCollaborator,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#303236" color="white">
          <ModalHeader>Collaborators</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="start">
              <Box>
                <Text fontWeight="bold">Owner</Text>
                <HStack spacing={3} mt={2}>
                  <Avatar
                    size="sm"
                    name={owner.displayName}
                    src={owner.avatar || null}
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="bold">
                      {owner.displayName}
                    </Text>
                    <Text fontSize="xs" fontStyle="italic">
                      {owner.email}
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              {collaborators?.length > 0 && (
                <Box w="100%">
                  <Text fontWeight="bold">Collaborators</Text>
                  {collaborators.map((coll) => (
                    <Flex
                      key={coll._id}
                      justify="space-between"
                      align="center"
                      w="100%"
                      mt={2}
                      p={2}
                      bg="#424549"
                      borderRadius="md"
                    >
                      <HStack spacing={3}>
                        <Avatar
                          size="sm"
                          name={coll.user.displayName}
                          src={coll.user.avatar || null}
                        />
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="bold">
                            {coll.user.displayName}
                          </Text>
                          <Text fontSize="xs" fontStyle="italic">
                            {coll.user.email}
                          </Text>
                        </VStack>
                      </HStack>
                      <IconButton
                        icon={<RxCross2 size={15} />}
                        variant="ghost"
                        colorScheme="red"
                        size="sm"
                        onClick={() => removeCollaborator(coll._id)}
                      />
                    </Flex>
                  ))}
                </Box>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
ShowCollaboratorModal.propTypes = {
  collaborators: PropTypes.array.isRequired,
  owner: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  removeCollaborator: PropTypes.func.isRequired,
};
export default ShowCollaboratorModal;
