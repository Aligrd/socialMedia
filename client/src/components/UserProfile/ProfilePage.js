import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Hooks/AuthContext";
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";
import { redirect, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useContext(AuthContext);

  const navigate = useNavigate();
  
  
  // useEffect(() => {
  //   if (!user.authStatus) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      <UserInfo />
      <UserPosts />
    </>
  );
};

export default Profile;
