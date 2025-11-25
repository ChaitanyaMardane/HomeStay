import React from "react";
import { Home, Instagram, Twitter, Youtube, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="container mx-auto px-6 py-10">

        {/* Footer Top */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Branding */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-[rgb(249,50,54)] p-2 rounded-xl shadow-md">
                <Home className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-semibold tracking-tight text-[rgb(249,50,54)]">
                HomeStay
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover stays, explore destinations, and book your perfect getaway effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-800 font-semibold text-lg">Quick Links</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li className="hover:text-[rgb(249,50,54)] transition cursor-pointer">Home</li>
              <li className="hover:text-[rgb(249,50,54)] transition cursor-pointer">Explore</li>
              <li className="hover:text-[rgb(249,50,54)] transition cursor-pointer">Become a Host</li>
              <li className="hover:text-[rgb(249,50,54)] transition cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-800 font-semibold text-lg">Connect</h3>
            <div className="flex gap-4">
              <Twitter className="h-6 w-6 text-gray-600 hover:text-[rgb(249,50,54)] cursor-pointer transition" />
              <Instagram className="h-6 w-6 text-gray-600 hover:text-[rgb(249,50,54)] cursor-pointer transition" />
              <Github className="h-6 w-6 text-gray-600 hover:text-[rgb(249,50,54)] cursor-pointer transition" />
              <Youtube className="h-6 w-6 text-gray-600 hover:text-[rgb(249,50,54)] cursor-pointer transition" />
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} HomeStay. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
