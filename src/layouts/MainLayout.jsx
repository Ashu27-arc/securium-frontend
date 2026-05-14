import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Navbar />
      <main className="transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
