import React from "react";

const ProfilePostTemplate = ({ post }) => {
  console.log(post);
  return (
    <div className="w-1/3 border border-1 border-stone-500 p-4">
      <h2 className="bg-emerald-800 w-full text-center text-md text-white rounded-t-md">
        {post.title}
      </h2>
      <p className="text-lg ">{post.postText}</p>
    </div>
  );
};

export default ProfilePostTemplate;
