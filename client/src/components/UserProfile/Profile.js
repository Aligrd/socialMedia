import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import SQLDateParser from "../util/SQLDateParser";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUsersPosts] = useState([]);
  const [doesDatabaseHaveUser, setDoesDatabaseHaveUser] = useState(true);

  const [currentUser, setCurrentUser] = useContext(AuthContext);

  let { id } = useParams();

  useEffect(() => {
    // grab user posts and show in his profile
    axios.get(`http://localhost:3001/posts/user/${id}`).then((res) => {
      setUsersPosts(res.data);
    });
  }, []);

  useEffect(() => {
    //get user data
    if (id === undefined) {
      axios
        .get(`http://localhost:3001/users/profile/${currentUser.id}`)
        .then((res) => setUserData(res.data));
    } else {
      axios.get(`http://localhost:3001/users/profile/${id}`).then((res) => {
        if (res.data === null) {
          setDoesDatabaseHaveUser(false);
        } else {
          setDoesDatabaseHaveUser(true);
          setUserData(res.data);
        }
      });
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col  justify-center items-center text-black">
      {doesDatabaseHaveUser ? (
        <>
          User Info :
          <div className="border border-1 border-green-400 p-10 mb-10">
            <h1>username = {userData.username}</h1>
            <h1>id = {userData.id}</h1>
            <h1>email = {userData.email}</h1>
            <h1>
              born = {SQLDateParser(userData.createdAt).date}
              {SQLDateParser(userData.createdAt).time}
            </h1>
          </div>
          User Posts :
          <div className="border border-1 border-red-400 p-10">
            {userPosts.length === 0
              ? "User dont have any Post"
              : userPosts.map((post, indx) => (
                  <div
                    className="border border-1 border-black my-4 p-2"
                    key={indx}
                  >
                    POST {indx + 1} :<h1>title = {post.title}</h1>
                    <h1>cone = {post.postText}</h1>
                    <h1>
                      postedAt = {SQLDateParser(post.createdAt).date}
                      {SQLDateParser(post.createdAt).time}
                    </h1>
                    <h1>number of likes = {post.Likes.length}</h1>
                  </div>
                ))}
          </div>
        </>
      ) : (
        <h1 className="text-2xl">کاربری با این مشخصات وجود ندارد</h1>
      )}
    </div>
  );
};

export default Profile;
