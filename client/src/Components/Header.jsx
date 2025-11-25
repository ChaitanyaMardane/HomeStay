import { Home, Search } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContextCreation.js";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  useEffect(() => {}, [user]);

  const handleLogin = (e) => {
    if (e.target.innerText == "LogOut") {
      logout();
      alert("Logged Out Successfully");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
  <div className="container mx-auto px-4 sm:px-6 py-3">
    <div className="flex items-center justify-between gap-4 flex-wrap">
      
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition"
        onClick={() => navigate("/")}
      >
        <div className="bg-[rgb(249,50,54)] p-2 rounded-xl shadow-md flex items-center justify-center">
          <Home className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-semibold tracking-tight text-[rgb(249,50,54)]">
          HomeStay
        </span>
      </div>

      {/* Search Bar (Desktop) */}
      <div className="hidden lg:flex flex-1 max-w-md relative bg-gray-100 rounded-full shadow-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search destinations, cities..."
          className="pl-12 pr-4 py-2 w-full rounded-full bg-gray-100 focus:ring-2 focus:ring-[rgb(249,50,54)] text-sm text-gray-700 placeholder-gray-400 outline-none transition"
        />
      </div>

      {/* Host Button */}
      <button
        className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-full text-sm font-medium text-gray-700 cursor-pointer transition whitespace-nowrap shadow-sm"
        onClick={() => (user ? navigate("/new_listing") : navigate("/login"))}
      >
        Become a host
      </button>

      {/* Auth Button */}
      <button
        className="bg-[rgb(249,50,54)] hover:bg-[rgb(230,40,45)] text-white px-5 py-2 rounded-full font-medium text-sm shadow-sm transition whitespace-nowrap"
        onClick={handleLogin}
      >
        {user ? "LogOut" : "Login"}
      </button>
    </div>

    {/* Mobile Search Bar */}
    <div className="lg:hidden mt-4 relative bg-gray-100 rounded-full shadow-sm">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search destinations, cities..."
        className="pl-12 pr-4 py-2 w-full rounded-full bg-gray-100 focus:ring-2 focus:ring-[rgb(249,50,54)] text-sm text-gray-700 placeholder-gray-400 outline-none transition"
      />
    </div>
  </div>
</header>

  );
};

export default Header;
