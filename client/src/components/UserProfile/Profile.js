import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({});
  let { id } = useParams();

  const DateTime = {
    date: String(userData.createdAt).slice(0, 10),
    time: String(userData.createdAt).slice(11, 19),
  };

  console.log(userData);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/profile/${id}`)
      .then((res) => setUserData(res.data));
  }, []);
  return (
    <div className="h-screen w-screen flex flex-col  justify-center items-center text-black">
      <h1>username = {userData.username}</h1>
      <h1>id = {userData.id}</h1>
      <h1>email = {userData.email}</h1>
      <h1>
        born = {DateTime.date}  {DateTime.time}
      </h1>
    </div>
  );
};

export default Profile;
