import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import LandingText from "../components/util/LandingText";
const LandingPage = () => {
  const navigate = useNavigate();

  const [userAuth, setUserAuth] = useContext(AuthContext);

  // const [loggedIn, setLoggedIn] = useState(userAuth.authStatus);

  const text = "خوش آمدید";

  useEffect(() => {
    if (userAuth.authStatus) {
      navigate("/home");
    }
  }, [userAuth]);

  return (
    <div className="text-center flex justify-center items-center h-screen">
      <LandingText str={text} />
    </div>
  );
};

export default LandingPage;
