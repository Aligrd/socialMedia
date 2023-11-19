import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

import Notification from "../util/Notification";
import ChangePassword from "./ChangePassword";
import ProfilePostTemplate from "./ProfilePostTemplate";
import UserInfo from "./UserInfo";

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
          {currentUser.authStatus & changePassResult ? (
            <Notification
              {...{ color: "red", message: "کلمه عبور اشتباه می باشد" }}
            />
          ) : (
            <></>
          )}
          {/* {currentUser.id === Number(id) && (
            <button
              className="bg-red-300 text-black p-3 rounded-lg cursor-pointer mb-1 border border-1 border-red-300   hover:text-red-600 hover:bg-white hover:border hover:border-1 hover:border-red-300 "
              onClick={() => setShowPassowrdUpdate(!showPassowrdUpdate)}
            >
              تغییر پسورد
            </button>
          )} */}
          <ChangePassword
            {...{
              showPassowrdUpdate,
              passwordData,
              setPasswordData,
              changePassword,
            }}
          />
          <UserInfo {...userData} />
          <h1>پست ها</h1>
          <div className="w-screen flex  justify-center items-center">
            {userPosts.length === 0
              ? "این کاربر پستی ندارد"
              : userPosts.map((post, indx) => (
                  <ProfilePostTemplate {...{ post, indx }} />
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
