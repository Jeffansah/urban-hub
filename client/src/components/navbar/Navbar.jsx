import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="h-[50px] bg-main flex justify-center">
      <div className="w-full max-w-5xl text-white flex items-center justify-between">
        <span className="font-bold text-2xl">UrbanHub</span>
        <div className="navItems">
          <button className="navButton ml-5 border-none py-1.5 px-2.5 cursor-pointer text-main bg-white">
            Register
          </button>
          <button className="navButton ml-5 border-none py-1.5 px-2.5 cursor-pointer text-main bg-white">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
