import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import LandingText from "../components/util/LandingText";
import ThemeContext from "../Context/ThemeContext";
import {
  themeWithPrimaryText,
  themeWithSecondaryText,
} from "../Context/ThemeChnageHelper";
const LandingPage = () => {
  const navigate = useNavigate();

  const [userAuth, setUserAuth] = useContext(AuthContext);

  // const [loggedIn, setLoggedIn] = useState(userAuth.authStatus);

  const [theme, setThehem] = useContext(ThemeContext);

  const text = "خوش آمدید";

  useEffect(() => {
    if (userAuth.authStatus) {
      navigate("/home");
    }
  }, [userAuth]);

  return (
    <div
      className={`${themeWithSecondaryText(
        theme
      )} h-full text-center flex justify-center items-center`}
    >
      <LandingText str={text} />
    </div>
  );
};

export default LandingPage;
