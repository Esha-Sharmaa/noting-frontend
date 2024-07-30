import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/png/Color logo - no background.png";
import useAuth from "../../hooks/useAuth";
import useToastNotification from "../../hooks/useToastNotification";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import AvatarUploadModal from "./AvatarUploadModal";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, setIsAuthenticated, setUser } = useAuth();
  const { showErrorToast } = useToastNotification();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false);
      setUser(null);
      navigate("/");
    },
    onError: (error) => {
      showErrorToast({
        title: "ERROR",
        description: error.response.data.message,
      });
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="fixed top-0 right-0 left-0 flex items-center justify-between border-b-2 px-2 md:px-8 py-[14px] gap-4 md:gap-8 bg-[#303236] z-10">
      <Link to={"/home"} className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="w-[6rem] md:w-36 transition-all ease-in-out duration-300"
        />
      </Link>
      <div className="flex-grow"></div>
      <div className="flex items-center">
        <Menu className="bg-[#303236]">
          <MenuButton
            as={Button}
            rounded="full"
            variant="link"
            cursor="pointer"
          >
            <Avatar name={user.displayName} src={user.avatar || null} />
          </MenuButton>
          <MenuList bg={"#303236"}>
            <Box px={4} py={2} color={"white"}>
              {user.displayName}
              <br />
              <small>{user.email}</small>
            </Box>
            <MenuDivider />
            <MenuItem onClick={onOpen} bg={"#303236"}>
              Change Avatar
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout} bg={"#303236"}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
        <AvatarUploadModal
          isOpen={isOpen}
          onClose={onClose}
          currentAvatar={user?.avatar}
        />
      </div>
    </div>
  );
};

export default Header;
