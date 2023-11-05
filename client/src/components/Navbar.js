import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import AuthContext from "../Hooks/AuthContext";
import NavProfile from "./NavProfile";
const Navbar = () => {
  // const [state, setState] = useState(true);

  const [authState, SetAuthState] = useContext(AuthContext); //inject authState here

  function logOut() {
    localStorage.removeItem("accessToken");
    SetAuthState({
      username: undefined,
      id: undefined,
      authStatus: false,
    });
  }

  return (
    <nav className="fixed bg-blue-500 h-16 w-screen text-white flex flex-row items-center justify-between">
      <Link to="/">
        <h2 className="text-2xl ml-10">Social Media</h2>
      </Link>
      <Search />
      <div className="flex flex-row ">
        {!authState.authStatus ? (
          <>
            <Link to="/login">
              <h3 className="mr-10 border border-solid border-white px-2 rounded-md hover:bg-slate-600">
                Login
              </h3>
            </Link>
            <Link to="/signup">
              <h3 className=" bg-stone-300 text-slate-700 mr-10 border border-solid border-white px-2 rounded-md hover:bg-slate-400">
                SignUp
              </h3>
            </Link>
          </>
        ) : (
          <div className=" w-52 flex justify-between">
            <Link
              to="/profile"
              className="w-12 text-center border bg-stone-500 border-solid border-slate-300 rounded- hover:cursor-pointer"
            >
              {authState.username}
            </Link>

            <button
              className="bg-stone-300 text-slate-700 mr-10 border border-solid border-white px-2 rounded-md hover:bg-slate-400  "
              onClick={logOut}
            >
              LogOut
            </button>
          </div>
        )}
        {/* <NavProfile /> */}
      </div>
    </nav>
  );
};

export default Navbar;
