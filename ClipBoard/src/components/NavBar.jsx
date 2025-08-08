import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex flex-row justify-center bg-gray-800 text-white p-1">
      <div className="flex flex-row gap-4 justify-around w-md  m-3">
      <NavLink to="/" className="hover:underline-offset-2 hover:text-gray-400">Home</NavLink>
      <NavLink to="/paste" className="hover:underline-offset-2 hover:text-gray-400">Pastes</NavLink>

    </div>
    </div>
  );
};

export default NavBar;
