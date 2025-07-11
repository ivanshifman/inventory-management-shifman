import NavBar from "@app/components/NavBar";
import Sidebar from "@app/components/Sidebar";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="light flex bg-gray-50 text-gray-900 w-full min-h-screen">
      <Sidebar />
      <div className="flex flex-col h-full py-7 px-9 bg-gray-50 md:pl-24">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
