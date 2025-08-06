import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex flex-row justify-center bg-gray-800 text-white p-1">
      <div className="flex flex-row gap-4 justify-around w-md  m-3">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/paste">Paste</NavLink>
      <NavLink to="/paste/:id">View Paste</NavLink>
    </div>
    </div>
  );
};

export default NavBar;
