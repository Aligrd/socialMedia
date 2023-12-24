import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../Context/ThemeContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  themeWithPrimaryText,
  themeWithSecondaryText,
} from "../../Context/ThemeChnageHelper";
const NavbarLoginSection = () => {
  const [authState, SetAuthState] = useContext(AuthContext);

  //! how we can make a functionality for app if detect a user logout in every route ,page , setuation it detect user context and navigate user to login or landing page
  console.log("from navbar", authState);

  const navigate = useNavigate();
  const [theme, setTheme] = useContext(ThemeContext);

  const logOut = () => {
    localStorage.removeItem("accessToken");
    SetAuthState({
      username: undefined,
      id: undefined,
      authStatus: false,
    });
    navigate("/login");
  };
  const defaultProperties = {
    dark: {
      circle: {
        r: 9,
      },
      mask: {
        cx: "50%",
        cy: "23%",
      },
      svg: {
        transform: "rotate(40deg)",
      },
      lines: {
        opacity: 0,
      },
    },
    light: {
      circle: {
        r: 5,
      },
      mask: {
        cx: "100%",
        cy: "0%",
      },
      svg: {
        transform: "rotate(90deg)",
      },
      lines: {
        opacity: 1,
      },
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };

  return (
    <div
      className={`${themeWithPrimaryText(
        theme,
        2
      )} bg-transparent flex flex-row justify-between`}
    >
      {!authState.authStatus ? (
        <div className={`${themeWithPrimaryText(theme, 2)} flex`}>
          <DarkModeSwitch
            checked={theme}
            onChange={() => {
              localStorage.setItem("theme", JSON.stringify(!theme));
              setTheme(!theme);
            }}
            className=" mr-2 hover:opacity-90 self-center "
            // style={{ marginBottom: "2rem" }}
            size={30}
            moonColor="#333"
            sunColor="#efefef"
            animationProperties={defaultProperties}
          />
          <Link
            className="p-3 bg-blue-400 border border-1 rounded-md"
            to="/login"
          >
            <h3 className="">ورود</h3>
          </Link>
          <Link
            className="mx-2 p-3 bg-blue-400 border border-1 rounded-md"
            to="/signup"
          >
            <h3 className="">ثبت نام</h3>
          </Link>
        </div>
      ) : (
        <>
          <DarkModeSwitch
            checked={theme}
            onChange={() => {
              localStorage.setItem("theme", JSON.stringify(!theme));
              setTheme(!theme);
            }}
            className=" mr-2 hover:opacity-90 self-center "
            // style={{ marginBottom: "2rem" }}
            size={30}
            moonColor="#333"
            sunColor="#efefef"
            animationProperties={defaultProperties}
          />
          <Link
            className={`${
              !theme ? "bg-slate-900" : "bg-slate-300"
            } border border-1 border-red-900 rounded-md p-3 mr-2 hover:scale-105`}
            to={`/profile/${authState.id}`}
          >
            {authState.username}
          </Link>
          <button
            className={`${
              !theme ? "bg-slate-900" : "bg-slate-300"
            } border border-1 border-red-900 rounded-md p-3 mr-2 hover:scale-105`}
            onClick={logOut}
          >
            خروج
          </button>
        </>
      )}
      {/* <button
        className="p-2 bg-red-500 cursor-pointer"
        onClick={() => setTheme(!theme)}
      >
        Theme
      </button> */}
    </div>
  );
};
export default NavbarLoginSection;
