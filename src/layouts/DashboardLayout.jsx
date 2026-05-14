import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-[calc(100vh-65px)] bg-[#0f172a]">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
