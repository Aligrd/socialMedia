import React, { createRef, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Hooks/AuthContext";
const Commnetform = ({ postState }) => {
  const [comment, setComment] = useState("");
  const [postID, setRender] = postState; // set the render state from parrent(post componnet)to true on form submision and rerender the page with new comment

  const submition = () => {
    //i give it a defualt username for now
    setComment("");
    //! we need to check if user is athenticated or not then submit the comment and if not authenticated comment dont submitted
    //* or even we can hide commentForm from not logged in user (unAuth users)

    const objectToSent = {
      //there is no need to enter the username here bcz backend will get username by middleware
      commentText: comment,
      PostId: postID,
    };
    axios
      .post("http://localhost:3001/commnets", objectToSent, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          setRender(true);
        } else {
          console.log("there is error");
        }
      });
  };

  return (
    <div className="w-3/4 h-1/3 flex flex-col px-10 py-2 border border-stone-500 rounded-xl text-sm">
      <label htmlFor="">Commnet:</label>
      <input
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        className="border border-solid border-stone-400 h-1/2"
        type="textarea"
      />
      <button
        onClick={submition}
        className="bg-green-300 m-4 h-12 rounded-xl w-1/3 self-center"
      >
        Post Comment
      </button>
    </div>
  );
};

export default Commnetform;
