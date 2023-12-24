import React, { useState } from "react";
import axios from "axios";
import form from "formik";
import { useNavigate } from "react-router-dom";

import formValidator from "../Hooks/validator";

function CreatePost() {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const [titleErr, setTitleErr] = useState("");
  const [postErr, setPostErr] = useState("");

  const [isTitleErr, setIsTitleErr] = useState(false);
  const [isPostContentErr, setisPostContentErr] = useState(false);

  const textWordAllowed = 150;
  const submitFrom = (e) => {
    e.preventDefault();
  };

  const handleSubmition = (e) => {
    if (postContent.length === 0) {
      setPostErr("متن پست نمی تواند خالی باشد");
    }
    if (title.length === 0) {
      setTitleErr("موظوع پست نمی تواند خالی باشد");
    } else {
      axios
        .post(
          "http://localhost:3001/posts",
          { title: title, postText: postContent },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((res) => {
          console.log(res.data);
          !res.data.error ? navigate("/") : console.log("post didnt submitted");
        });
    }
  };

  console.log(postContent);
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-300 ">
      <form
        className="w-full flex flex-col justify-center h-1/2 p-4 bg-red-300 md:w-1/3"
        onSubmit={submitFrom}
      >
        <label htmlFor="title" className="text-right">
          {!isTitleErr ? "موضوع" : <h1 className="text-red-700">{titleErr}</h1>}
        </label>
        <input
          id="title"
          type="text"
          className="p-2 text-right outline-none rounded-md mt-2"
          onChange={(e) => {
            if (e.target.value.length > 30) {
              setTitleErr("طول متن بیش از حد مجاز");
              setIsTitleErr(true);
            } else {
              setTitle(e.target.value);
              setIsTitleErr(false);
            }
          }}
        />
        <label htmlFor="content" className="text-right flex flex-row-reverse">
          {!isPostContentErr ? (
            "متن"
          ) : (
            <h1 className="text-red-500">{postErr}</h1>
          )}
        </label>
        <textarea
          name=""
          id="content"
          cols="30"
          rows="10"
          className="p-2 text-right outline-none rounded-md mt-2"
          onChange={(e) => {
            if (e.target.value.length > textWordAllowed) {
              console.log("more");
              e.target.value = e.target.value.slice(0, textWordAllowed);
              setPostErr("طول متن بیش از حد مجاز");
              setisPostContentErr(true);
            } else {
              setisPostContentErr(false);

              setPostContent(e.target.value);
            }
          }}
        ></textarea>
        <button className="bg-blue-200 border border-1 border-blue-800 w-20 self-center mt-4 px-3 py-4 rounded-lg">
          پست کن
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
