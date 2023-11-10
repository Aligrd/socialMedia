import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AllUsersProfile = () => {
  const [userData, setUserData] = useState({});
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/profile/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => setUserData(res.data));
  }, []);

  return <div></div>;
};

export default AllUsersProfile;
