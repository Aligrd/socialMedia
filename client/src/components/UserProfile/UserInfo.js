import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({});

  const sqlDate = `${userInfo.createdAt}`;

  const DateTime = {
    date: sqlDate.slice(0, 10),
    time: sqlDate.slice(11, 19),
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/user", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => setUserInfo(res.data));
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <h2>UserName ={userInfo.username}</h2>
      <h2>UserID ={userInfo.id}</h2>
      <h2>Email ={userInfo.email}</h2>
      <div className=" flex ">
        <h2>
          Account Creation Date : {DateTime.date} {DateTime.time}
        </h2>
      </div>
    </div>
  );
};

export default UserInfo;
