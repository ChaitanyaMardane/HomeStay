import { Home, Search } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../Context/AuthContext';


 const Header=()=> {
  const navigate = useNavigate();
  const {user,  logout}= useContext(AuthContext);
  console.log(user);
  useEffect(()=>{},[user])
  


  const handleLogin=(e)=>{

    
        if(e.target.innerText=="LogOut"){
          logout();
        console.log("User logged out");
        navigate('/')
        }
        else{
          navigate('/login');
        }
        
    
  }

  

  return (
   <header className="border-b bg-white sticky top-0 z-50 shadow-sm ">
  <div className="container mx-auto px-6 py-3">
    <div className="flex items-center justify-between flex-wrap gap-6">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition mx-10"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="bg-[rgb(249,50,54)] p-2 rounded-xl shadow-md">
          <Home className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-semibold text-blue-600 tracking-tight">
          HomeStay
        </span>
      </div>

      {/* Search Bar */}
      <div className="hidden lg:flex flex-1 max-w-md relative bg-gray-100 rounded-3xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 " />
        <input
          type="text"
          placeholder="Search destinations, cities..."
          className="pl-11 pr-4 py-2 w-full border border-gray-300 rounded-full focus:ring-2 focus:ring-[rgb(249,50,54)] focus:outline-none text-sm text-gray-700 placeholder-gray-400 transition"
        />
      </div>

      {/* Host Button */}
      <div>
        <h1 className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-full text-sm font-medium text-gray-700 cursor-pointer transition"
          onClick={()=>{
            (user)?navigate("/new_listing"):navigate("/login")}}
        >
          Become a host
        </h1>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <button
          className="bg-[rgb(249,50,54)] hover:bg-[rgb(230,40,45)] text-white px-5 py-2 rounded-full font-medium text-sm shadow-sm transition"
          onClick={handleLogin}
        >
         { user?"LogOut": "Login"}
        </button>
       
      </div>
    </div>

    {/* Mobile Search Bar */}
    <div className="lg:hidden mt-4 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search destinations, cities..."
        className="pl-11 pr-4 py-2 w-full border border-gray-300 rounded-full focus:ring-2 focus:ring-[rgb(249,50,54)] focus:outline-none text-sm text-gray-700 placeholder-gray-400 transition"
      />
    </div>
  </div>
</header>
    );
}

export default Header;
