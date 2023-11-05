import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Hooks/AuthContext";
const LandingPage = () => {
  const navigate = useNavigate();

  const [userAuth, setUserAuth] = useContext(AuthContext);

  // const [loggedIn, setLoggedIn] = useState(userAuth.authStatus);

  useEffect(() => {
    if (userAuth.authStatus) {
      navigate("/home");
    }
  }, [userAuth]);

  return (
    <div className="text-center flex justify-center items-center h-screen">
      <h1 className="text-3xl">خوش امدید</h1>
    </div>
  );
};

export default LandingPage;
