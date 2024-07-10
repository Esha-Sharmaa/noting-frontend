import Header from "../components/Common/Header";
import SideBar from "../components/Common/Sidebar";

import { Outlet } from "react-router-dom";
import AddNote from "../components/Notes/AddNote";
const HomePage = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-8 mt-20">
        <SideBar />
        <div className="col-span-6 md:col-span-12 ml-20">
          <Outlet />
        </div>
        <AddNote />
      </div>
    </>
  );
};
export default HomePage;
