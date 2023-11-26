import { Link, useFetcher, useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../Context/AuthContext";
import ThemeContext from "../Context/ThemeContext";

import Like from "./Like";

function Post({ props }) {
  // const [showDetail, setShowDetail] = useState(false); //!show some detail onhover
  const [isLiked, setIsLiked] = useState(false);

  let navigate = useNavigate();

  let postBody = useRef(null);

  const [userAuthContext, setUserAuthContext] = useContext(AuthContext);
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const Postid = props.id;

  const handleNavigation = () => {
    navigate(`/post/${Postid}`);
  };

  //TODO make like to be a react ccomponent

  const style = `${
    themeMode ? "bg-red-400" : "bg-[#080B13]"
  } w-full  min-h-[200px] border-t-[1px] border-black flex flex-col items-center justify-between  md:cursor-pointer`;

  return (
    <div
      className={style}
      ref={postBody}
      onClick={(e) => {
        if (e.target === postBody.current) {
          console.log("postbody");
          handleNavigation();
        }
        //! dont let navigation happen if you click in other part of post (like)
      }}
    >
      <h2 className="text-stone-600 w-full text-center rounded-t-md ">
        {props.title}
      </h2>

      <p className="text-lg w-full text-center">{props.postText}</p>

      <div className=" flex justify-between  items-center w-full box-border ">
        <div className="flex justify-center items-center">
          <img src="" alt="" width={40} height={20} />
          <Link
            className=" text-lg text-stone-800 p-1"
            to={`/profile/${props.UserId}`}
          >
            {props.username}
          </Link>
        </div>

        {userAuthContext.authStatus && (
          <Like {...{ PostId: Postid, userAuthContext: userAuthContext }} />
        )}
      </div>
    </div>
  );
}

export default Post;
