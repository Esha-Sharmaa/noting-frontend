import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import NotesList from "../components/Notes/NotesList";
const HomePage = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-8">
        <SideBar />
        <div className="col-span-5 md:col-span-11">
          <NotesList />
        </div>
      </div>
    </>
  );
};
export default HomePage;
