import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const Comment = ({ data }) => {
  const [authState, setAuthState] = useContext(AuthContext);

  const comment = data.comment;
  const setComments = data.setComments;

  //TODO add a tree dot drop down menu to delete share and edit the comment

  const deleteComment = (id) => {
    //access to delete route of backend
    axios
      .delete(`http://localhost:3001/commnets/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.body);
        setComments((comments) =>
          comments.filter((com) => {
            return com.id !== comment.id;
          })
        );
      });
  };
  return (
    <div className="w-80 h-40 border border-2 border-red-200 rounded-md bg-stone-200 p-4 m-2">
      <div className="flex flex-col items-center text-center ">
        <p className="comment-user">@{data.comment.username}</p>
        <hr className="bg-stone-400 text-sm" />
        <p className="">{comment.commentText}</p>
      </div>
      {
        //! comment should deleted by the owner of comment or by the post owner no other people
        //! authState.username === Comment.username //show btn if you own the comment
        //in here i just delete the comment if user is autheticated witch is wrong
        authState.username === comment.username && (
          <button
            className="text-red-500 text-sm relative top-7 left-32"
            onClick={() => {
              deleteComment(comment.id);
            }}
          >
            Delete
          </button>
        )
      }
    </div>
  );
};

export default Comment;
