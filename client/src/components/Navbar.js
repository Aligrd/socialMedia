import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import AuthContext from "../Context/AuthContext";
import NavProfile from "./NavProfile";
import NavMenu from "./Navbar/NavMenu";
import NavbarLoginSection from "../components/Navbar/NavbarLoginSection";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // const [state, setState] = useState(true);

  const getConnectionStatus = () => {
    const status =
      typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
        ? navigator.onLine
        : true;
    return status;
  };
  const [authState, SetAuthState] = useContext(AuthContext); //inject authState here

  return (
    <nav className="fixed bg-blue-300 ()500 h-16 w-screen  flex flex-row items-center justify-between ">
      <Link to="/">
        <h2 className="text-2xl ml-10">Social Media</h2>
      </Link>
      {!(window.screen.width < 800) & authState.authState ? <Search /> : <></>}

      {window.screen.width < 800 ? <NavMenu /> : <NavbarLoginSection />}

      {/* <div className="flex flex-row "><NavProfile /></div> */}
    </nav>
  );
};

export default Navbar;
