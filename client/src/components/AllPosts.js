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
  const [theme, setTheme] = useContext(ThemeContext);

  const Postid = props.id;

  const handleNavigation = () => {
    navigate(`/post/${Postid}`);
  };
  //TODO make like to be a react c component
  const className = `${
    theme ? "bg-stone-300 text-black" : "bg-stone-900 text-white"
  } w-full  h-1/3  flex flex-col items-center justify-between rounded-md cursor-pointer md:w-1/3 md:h-1/3`;

  return (
    <div
      className={className}
      ref={postBody}
      onClick={(e) => {
        if (e.target === postBody.current) {
          console.log("postbody");
          handleNavigation();
        }
        //! dont let navigation happen if you click in other part of post (like)
      }}
      // onMouseOver={(e) => {
      //   setShowDetail(true);
      // }}
      // onMouseOut={() => {
      //   setShowDetail(false);
      // }}
    >
      <h2 className="bg-stone-400 w-full text-center text-md text-white rounded-t-md ">
        {props.title}
      </h2>

      <p className="text-lg w-24">{props.postText}</p>

      <div className="bg-emerald-800 flex justify-between  items-center w-full text-white rounded-b-md box-border">
        <div className="bg-red-300 border border-1 border-stone-300 text-black p-1">
          <Link to={`/profile/${props.UserId}`}>{props.username}</Link>
        </div>
        {/* WE WANT USERNAME BE A COMPONENT WITCH WE CONTAIN USER PROFILE IMAGE INIT */}
        {userAuthContext.authStatus && (
          <Like {...{ PostId: Postid, userAuthContext: userAuthContext }} />
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
