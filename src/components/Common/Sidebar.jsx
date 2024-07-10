import { BsPeople } from "react-icons/bs";
import { IoArchiveOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { MdEdit, MdLabel } from "react-icons/md";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SideBarIcon = ({ icon, tooltip, to }) => {
  return (
    <NavLink
      to={to}
      exact="true"
      className={({ isActive }) =>
        `sidebar-icon group ${isActive ? "bg-purple-400" : ""}`
      }
    >
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100"> {tooltip} </span>
    </NavLink>
  );
};

const SideBar = () => {
  return (
    <div className="fixed col-span-1 bg-[#303236] top-1/2 translate-y-[-50%] z-10">
      <SideBarIcon icon={<MdEdit size={30} />} tooltip="Notes" to="/home" />
      <SideBarIcon
        icon={<MdLabel size={30} />}
        tooltip="Labels"
        to="/home/labels"
      />
      <SideBarIcon
        icon={<IoArchiveOutline size={30} />}
        tooltip="Archive"
        to="/home/archive"
      />
      <SideBarIcon
        icon={<GoTrash size={30} />}
        tooltip="Trash"
        to="/home/trash"
      />
      <SideBarIcon
        icon={<BsPeople size={30} />}
        tooltip="Notes Shared"
        to="/home/collaborators"
      />
    </div>
  );
};

SideBarIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SideBar;
