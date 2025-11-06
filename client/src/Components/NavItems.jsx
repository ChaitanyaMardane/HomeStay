import React from 'react'

const NavItems = () => {
  return (
    <div>
       <nav className="hidden md:flex items-center gap-6">
            <Link to="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
           
            <Link to="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
    </div>
  )
}

export default NavItems
