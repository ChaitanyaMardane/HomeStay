import { Home, Search } from 'lucide-react'
import React from 'react'

 const Header=()=> {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mx-[40px] my-[0px]">
            <div className="bg-[rgb(249,50,54)] p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-blue-600">HomeStay</span>
          </div>

          {/* Navigation Tabs */}
         

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations, cities..."
              className="pl-10 w-full"
            />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button variant="ghost">
              Login
            </button>
            <button className="bg-[rgb(249,50,54)] hover:bg-blue-700 mx-[40px] my-[0px]">
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations, cities..."
            className="pl-10 w-full"
          />
        </div>
      </div>
    </header>
    );
}

export default Header;
