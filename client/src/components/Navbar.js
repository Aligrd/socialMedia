import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import AuthContext from "../Context/AuthContext";
import ThemeContext from "../Context/ThemeContext";
import NavProfile from "./NavProfile";
import NavMenu from "./Navbar/NavMenu";
import NavbarLoginSection from "../components/Navbar/NavbarLoginSection";
import { useNavigate } from "react-router-dom";
import { ThemeHelper } from "../Context/ThemeChnageHelper";

const Navbar = () => {
  const [userState, setUserState] = useContext(AuthContext); //inject authState here

  const [theme, setTheme] = useContext(ThemeContext);

  const colorTheme = theme
    ? "bg-[var(--light-3)] text-[var(--primary-text-dark)]"
    : "bg-[var(--dark-1)] text-[var(--primary-text)]";
  return (
    <nav
      className={`${colorTheme} sticky w-screen flex flex-row items-center justify-between  h-16`}
    >
      <Link to="/">
        <h2 className="text-2xl ml-10">Social Media</h2>
      </Link>
      <div className="hidden md:block ">
        <Search />
      </div>
      <div className="block md:hidden">
        <NavMenu />
      </div>
      <div className={` hidden md:block`}>
        <NavbarLoginSection />
      </div>
      {/* {screenWidth < 800 ? <NavMenu /> : <NavbarLoginSection />} */}
      {/* <div className="flex flex-row "><NavProfile /></div> */}
    </nav>
  );
};

export default Navbar;
