import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const NavbarLoginSection = () => {
  const [authState, SetAuthState] = useContext(AuthContext);

  //! how we can make a functionality for app if detect a user logout in every route ,page , setuation it detect user context and navigate user to login or landing page
  console.log("from navbar", authState);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("accessToken");
    SetAuthState({
      username: undefined,
      id: undefined,
      authStatus: false,
    });
    navigate("/");
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
        <div className="flex ">
          <div
            className="bg-green-200 border border-1 border-red-900 rounded-md p-3 mr-2 hover:bg-green-100"
            onClick={() => {
              navigate(`/profile/${authState.id}`);
            }}
          >
            <Link to="/profile" className=" ">
              {authState.username}
            </Link>
          </div>
          <button
            className="bg-green-200 border border-1 border-red-900 rounded-md p-3 mr-2 hover:scale-105"
            onClick={logOut}
          >
            خروج
          </button>
        </div>
      )}
    </>
  );
};
export default NavbarLoginSection;
