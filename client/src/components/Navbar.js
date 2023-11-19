import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import AuthContext from "../Context/AuthContext";
import NavProfile from "./NavProfile";
import NavMenu from "./Navbar/NavMenu";
import NavbarLoginSection from "../components/Navbar/NavbarLoginSection";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userState, setUserState] = useContext(AuthContext); //inject authState here

  //! internet conncetion status
  // const getConnectionStatus = () => {
  //   const status =
  //     typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
  //       ? navigator.onLine
  //       : true;
  //   return status;
  // };

  return (
    <nav className="fixed bg-blue-300 h-16 w-screen  flex flex-row items-center justify-between ">
      <Link to="/">
        <h2 className="text-2xl ml-10">Social Media</h2>
      </Link>
      <div className="hidden md:block ">
        <Search />
      </div>
      <div className="block md:hidden">
        <NavMenu />
      </div>
      <div className="hidden md:block">
        <NavbarLoginSection />
      </div>
      {/* {screenWidth < 800 ? <NavMenu /> : <NavbarLoginSection />} */}
      {/* <div className="flex flex-row "><NavProfile /></div> */}
    </nav>
  );
};

export default Navbar;
