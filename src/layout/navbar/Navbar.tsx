import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-primary p-4 flex">
      <button className="text-white pr-4" onClick={toggleSidebar}>
        <Bars3Icon className="h-6" />
      </button>
      <span className="text-white">Market</span>
    </nav>
  );
};

export default Navbar;
