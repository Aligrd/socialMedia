import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import SQLDateParser from "../util/SQLDateParser";
import Notification from "../util/Notification";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUsersPosts] = useState([]);
  const [doesDatabaseHaveUser, setDoesDatabaseHaveUser] = useState(true);

  const [showPassowrdUpdate, setShowPassowrdUpdate] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: undefined,
    newPassword: undefined,
    repeatNewPassword: undefined,
  });

  const [currentUser, setCurrentUser] = useContext(AuthContext);
  const [changePassResult, setChangePassResult] = useState(false);

  let { id } = useParams();
  //! user can update its password
  //! show a modal after user changed its password if user failed
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
  const changePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword === passwordData.repeatNewPassword) {
      axios
        .post(
          "http://localhost:3001/users/update/password",
          {
            passowrd: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((res) => {
          !res.data.success
            ? setChangePassResult(false)
            : setChangePassResult(true);
        });
    } else {
      alert("new passwords are not match");
    }
  };

  console.log(passwordData);
  console.log("result", changePassResult);
  console.log("useriD", currentUser);

  return (
    <div className="h-screen w-screen flex flex-col  justify-center items-center text-black ">
      {doesDatabaseHaveUser ? (
        <>
          {currentUser.id & !changePassResult && (
            <>
              <Notification
                {...{ color: "red", message: "کلمه عبور اشتباه می باشد" }}
              />
            </>
          )}
          {currentUser.id === Number(id) && (
            <button
              className="bg-red-300 text-black p-3 rounded-lg cursor-pointer mb-1 border border-1 border-red-300   hover:text-red-600 hover:bg-white hover:border hover:border-1 hover:border-red-300 "
              onClick={() => setShowPassowrdUpdate(!showPassowrdUpdate)}
            >
              تغییر پسورد
            </button>
          )}
          {showPassowrdUpdate && (
            <form
              className="absolute top-32 right-20 bg-blue-300 p-3 flex flex-col justify-center items-center gap-3"
              onSubmit={changePassword}
            >
              <div className="flex flex-row-reverse">
                <label htmlFor="">کلمه عبور فعلی</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-row-reverse">
                <label htmlFor="">کلمه عبور جدید</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-row-reverse">
                <label htmlFor="">کلمه عبور جدید</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      repeatNewPassword: e.target.value,
                    })
                  }
                />
              </div>
              <button className="bg-teal-300 text-black p-3 rounded-lg cursor-pointer mb-1 border border-1 border-teal-300   hover:text-teal-600 hover:bg-white hover:border hover:border-1 hover:border-teal-300">
                تغییر کلمه عبور
              </button>
            </form>
          )}
          User Info :
          <div className="border border-1 border-green-400 p-10 mb-10 ">
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
