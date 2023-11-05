import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Like = (likeProps) => {
  const [like, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { PostId, userAuthContext } = likeProps;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/likes/${PostId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        const { isUserLiked, likeCount } = res.data;
        setLikes(likeCount);
        setIsLiked(isUserLiked);
      });
  }, [like]);

  const submitLike = () => {
    axios
      .post(
        `http://localhost:3001/likes/${PostId}`,
        {
          postId: PostId,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <button>
      <div className="flex justify-center items-center">
        <div className="cursor-pointer hover:scale-110">
          {!isLiked ? (
            <FaRegHeart
              onClick={() => {
                if (userAuthContext.authStatus) {
                  setIsLiked(true);
                  setLikes((prev) => prev + 1);
                  submitLike();
                } else alert("most be logged in to like a post!"); //TODO make a overlay alert box to show
              }}
            />
          ) : (
            <FaHeart
              className="cursor-pointer"
              onClick={() => {
                if (userAuthContext.authStatus) {
                  setIsLiked(false);
                  setLikes((prev) => prev - 1);
                  submitLike();
                } else alert("most be logged in to like a post!"); //TODO make a overlay alert box to show
              }}
            />
          )}
        </div>
        <h4>{like}</h4>
      </div>
    </button>
  );
};

export default Like;
