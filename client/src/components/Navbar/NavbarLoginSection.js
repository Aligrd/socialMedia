import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const NavbarLoginSection = () => {
  const [authState, SetAuthState] = useContext(AuthContext);

  console.log("from navbar", authState);

  const logOut = () => {
    localStorage.removeItem("accessToken");
    SetAuthState({
      username: undefined,
      id: undefined,
      authStatus: false,
    });
  };

  
  return (
    <>
      {!authState.authStatus ? (
        <div className="flex flex-row justify-between">
          <Link
            className="p-3 bg-blue-400 border border-1 rounded-md"
            to="/login"
          >
            <h3 className="">درود</h3>
          </Link>
          <Link
            className="p-3 bg-blue-400 border border-1 rounded-md"
            to="/signup"
          >
            <h3 className="">ثبت نام</h3>
          </Link>
        </div>
      ) : (
        <div className="">
          <Link to="/profile" className="">
            {authState.username}
          </Link>
          <button className="" onClick={logOut}>
            خروج
          </button>
        </div>
      )}
    </>
  );
};
export default NavbarLoginSection;
