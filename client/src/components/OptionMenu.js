import React from "react";
import axios from "axios";
const OptionMenu = (id) => {
  const DeletePost = () => {
    //connect to backend post delete route
    axios.delete(
      "",
      { headers: { accessToken: localStorage.getItem("accessToken") } },
      {
        postId: id,
      }
    );
  };

  const EditPost = () => {
    //update the post in the sql backend
  };
  const SharePost = () => {
    //navigate to share page with location state of this post data
  };

  return (
    <div className="flex flex-col">
      <button className="" onClick={() => DeletePost(id)}>
        Delete
      </button>

      <button className="" onClick={() => EditPost(id)}>
        Edit
      </button>

      <button className="" onClick={() => SharePost(id)}>
        Share
      </button>
    </div>
  );
};

export default OptionMenu;
