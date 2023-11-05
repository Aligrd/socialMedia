import React, { useState, useEffect } from "react";
import axios from "axios";
const Profile = (username) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/id", {
        username: username,
      })
      .then((res) => setUserInfo(res.data));
  }, []);

  //! we can have a image in back end for users to set profile avatar
  return (
    <div className="flex items-center box-border p-2">
      <img
        className="w-7 h-7 rounded-full "
        src="https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"
        alt=""
      />
      <h3 className="text-lg pl-2">{username}</h3>
    </div>
  );
};

export default Profile;
