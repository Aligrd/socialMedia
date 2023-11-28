import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { FaTimes } from "react-icons/fa";
const DropDownMenu = ({ clickState }) => {
  const [isClicked, setIsClicked] = clickState;
  //   const [clicked, setClicked] = isClicked;
  //   const [isMenuClicked, setIsMenuClicked] = useState();

  const [userAuthContext, setuserAuthContext] = useContext(AuthContext);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setuserAuthContext({
      username: undefined,
      id: undefined,
      authStatus: false,
    });
  };

  return (
    <div
      //   ref={menu}
      className="flex flex-col justify-center items-center absolute top-0 left-0 w-screen h-screen bg-red-300 text-black "
    >
      <div className="">
        {isClicked && (
          <>
            {/* <button
              className={!isMenuClicked ? "btn" : "activebtn"}
              onClick={() => setIsMenuClicked(!isMenuClicked)}
            >
              close
            </button> */}
            {!userAuthContext.authStatus ? (
              <div className="flex flex-col items-center text-4xl">
                <FaTimes
                  className="absolute top-5 right-5"
                  size={50}
                  onClick={() => {
                    setIsClicked(!isClicked);
                  }}
                />
                <Link className="p-3" to="/login">
                  <h3 className="">ورود</h3>
                </Link>
                <span className="w-[calc(100vw-20px)] h-[2px] bg-black"> </span>
                <Link className="p-3" to="/signup">
                  <h3 className="">ثبت نام</h3>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col text-4xl ">
                <div className="flex my-10">
                  <Link to={`/profile/${userAuthContext.id}`} className="">
                    {userAuthContext.username}
                  </Link>
                  <h1>:کاربر</h1>
                </div>
                <span className="w-[calc(100vw-20px)] h-[2px] bg-black"></span>
                <button
                  className="h-[2em]  bg-white border border-2 border-blue-400 rounded-lg  mt-20 text-red-600 flex items-center justify-center "
                  onClick={logOut}
                >
                  خروج
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DropDownMenu;
