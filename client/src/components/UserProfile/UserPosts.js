import React, { useEffect, useState } from "react";

import axios from "axios";
import ProfilePostTemplate from "./ProfilePostTemplate";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts/allposts", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => setUserPosts(res.data));
  }, []);

  return (
    <div className="bg-red-500 p-10">
      {userPosts.map((postData, i) => (
        <div key={i}>
          <ProfilePostTemplate post={postData} />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
