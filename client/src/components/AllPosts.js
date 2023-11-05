import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";

import AuthContext from "../Hooks/AuthContext";
import Like from "./Like";
import Profile from "../components/util/Profile";
function Post({ props }) {
  const [showDetail, setShowDetail] = useState(false); //!show some detail onhover
  const [isLiked, setIsLiked] = useState(false);

  let navigate = useNavigate();

  const [userAuthContext, setUserAuthContext] = useContext(AuthContext);

  const id = props.id;

  // const likesCount = props.Likes;

  const handleNavigation = () => {
    navigate(`/post/${id}`);
  };
  //TODO make like to be a react c component

  return (
    <div
      className=" bg-lime-400  w-1/6 flex flex-col items-center justify-items-center rounded-md my-2 cursor-pointer hover:shadow-xl "
      onClick={(e) => {
        e.currentTarget === e.target && handleNavigation();
        //! dont let navigation happen if you click in other part of post (like)
      }}
      onMouseOver={(e) => {
        setShowDetail(true);
      }}
      onMouseOut={() => {
        setShowDetail(false);
      }}
    >
      <h2 className="bg-emerald-800 w-full text-center text-md text-white rounded-t-md ">
        {props.title}
      </h2>
      <p className="text-lg w-24">{props.postText}</p>

      <div className="bg-emerald-800 flex justify-between  items-center w-full h-auto  text-white rounded-b-md box-border">
        <Profile {...props.username} />
        {userAuthContext.authStatus && (
          <Like {...{ PostId: id, userAuthContext: userAuthContext }} />
        )}
      </div>
      {/* {showDetail ? (
        <div
          onClick={() => {
            setIsLiked(true);
          }}
          className="bg-stone-500  text-emerald-300 text-sm rounded-md absolute top-2 right-2 hover:bg-stone-400"
        ></div>
      ) : (
        <div></div>
      )} */}
    </div>
  );
}

export default Post;
