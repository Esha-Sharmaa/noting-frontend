import { MdPersonOutline } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { MdEdit, MdLabel } from "react-icons/md";

import PropTypes from "prop-types";

const SideBarIcon = ({ icon, tooltip }) => {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100"> {tooltip} </span>
    </div>
  );
};
const SideBar = () => {
  return (
    <div className="col-span-1">
      <SideBarIcon icon={<MdEdit size={30} />} tooltip={"Notes"} />
      <SideBarIcon icon={<MdLabel size={30} />} tooltip={"Labels"} />
      <SideBarIcon icon={<IoArchiveOutline size={30} />} tooltip={"Archive"} />
      <SideBarIcon icon={<GoTrash size={30} />} tooltip={"Trash"} />
      <SideBarIcon
        icon={<MdPersonOutline size={30} />}
        tooltip={"Collaborators"}
      />
    </div>
  );
};
SideBarIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
};
export default SideBar;
