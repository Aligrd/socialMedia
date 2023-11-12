import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import Comment from "./Comment";
import Commnetform from "./Commnetform";
import Like from "./Like";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import PostOptionMenu from "./PostOptionMenu";

function Post() {
  const [post, setPost] = useState({});
  const [isPostExist, setIsPostExist] = useState(true);
  const [comments, setComments] = useState([]);
  const [isForCurrentUser, setIsForCurrentUser] = useState(false);
  const [showOptionMenu, setShowOptionMenu] = useState(false);
  const [PostEditData, setPostEditData] = useState({
    newTitle: undefined,
    newPostText: undefined,
  });
  const [showEditSection, setShowEditSection] = useState(false);

  //TODO make three dot option menu and set edit and delete in there
  //TODO delete this post via sending DELETE request =>  backend route
  //! show delete and edit buttom just to the owner of  post by checking post.UserId and authContext.id

  //TODO we need a pop up windows modal to for post edit

  let today = "امروز روز زیباییست";

  // today = `!${today}`;
  

  const [render, setRender] = useState(false); // for rerendring of component in case new comment added in commentform Component

  const [AppAuthCOntext, setAppAuthContext] = useContext(AuthContext); //! user AuthContext

  let { id } = useParams(); //get id of post from url
  const navigate = useNavigate();
  useEffect(() => {
    //get post data
    axios.get(`http://localhost:3001/posts/id/${id}`).then((res) => {
      if (res.data) {
        setPost(res.data);
        if (res.data.UserId === AppAuthCOntext.id) {
          setIsForCurrentUser(true);
        } else {
          setIsForCurrentUser(false);
        }
      } else {
        setIsPostExist(false);
      }
    });

    //comments of post
    axios.get(`http://localhost:3001/commnets/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [render]);

  useEffect(() => {
    !isPostExist && navigate("/*");
  }, [isPostExist]);

  //! SharePost
  const SharePost = () => {
    //share post on other social media
  };

  const editPost = (e) => {
    e.preventDefault();
    console.log(PostEditData);
    if (
      (PostEditData.newTitle.length > 0) &
      (PostEditData.newPostText.length > 10)
    ) {
      axios.post(
        `http://localhost:3001/posts/edit/${id} `,
        {
          newTitle: PostEditData.newTitle,
          newPostText: PostEditData.newPostText,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
    }
  };

  const deletePost = () => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => console.log(res.data));
  };

  //TODO we need make this xhtml code volume lesser
  return (
    <div className="flex h-screen w-screen bg-slate-500">
      <div className=" border border-1 border-red-300 h-screen w-1/2 flex flex-col items-center justify-center">
        <div className="bg-stone-200 flex flex-col items-center justify-evenly w-1/2 h-1/2 border border-red-300  rounded-t-xl">
          <div className="w-full bg-lime-200 flex justify-between items-center ">
            <div>
              <h3>{post.username}</h3>
              <h3 className="">{post.title}</h3>
            </div>
            <div
              className="mr-2 rounded-full cursor-pointer p-2"
              onClick={() => setShowOptionMenu(!showOptionMenu)}
            >
              <FaEllipsisH />
            </div>
          </div>
          <PostOptionMenu
            {...{
              showOptionMenu,
              setShowOptionMenu,
              editPost,
              deletePost,
              SharePost,
              setShowEditSection,
              isForCurrentUser: isForCurrentUser,
            }}
          />
          {showEditSection && (
            <form
              className="absolute bg-red-200 top-20 p-10 rounded-lg flex flex-col justify-between items-center"
              onSubmit={editPost}
            >
              <FaTimes
                className="absolute text-2xl top-1 right-1 cursor-pointer hover:scale-110"
                onClick={() => setShowEditSection(false)}
              />
              <div className="flex flex-row-reverse mb-2">
                <label htmlFor="title">موضوع </label>
                <input
                  className="outline-none text-right"
                  id="title"
                  type="text"
                  onChange={(e) =>
                    setPostEditData({
                      ...PostEditData,
                      newTitle: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-row-reverse">
                <label htmlFor="title text-right">متن پست</label>
                <input
                  className="outline-none text-right"
                  id="title"
                  type="text"
                  onChange={(e) =>
                    setPostEditData({
                      ...PostEditData,
                      newPostText: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-blue-400 text-white px-4 py-3 mt-2 rounded-md"
              >
                تغییر
              </button>
            </form>
          )}

          <div className="bg-stone-300 w-full h-full flex items-center justify-center">
            {/* <h3>{post.postText}</h3> */}
            <h1>{today}</h1>
          </div>
          <div className="bg-blue-400 w-full h-max flex items-center justify-between">
            <h3>SOME DETAIL</h3>
            <Like {...{ PostId: id, userAuthContext: AppAuthCOntext }} />
          </div>
        </div>
      </div>
      <div className="pt-20 text-center flex flex-col items-center w-1/2">
        {/* text-blue-600 font-bold pt-20 w-1/2 flex flex-col  justify-center items-center  */}
        <Commnetform postState={[id, setRender]} />
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Comment
              key={index}
              data={{
                comment: comment,
                setComments: setComments,
              }}
            />
          ))
        ) : (
          <div>کامنتی برای این پست وجود ندارد!</div>
        )}
      </div>
    </div>
  );
}
export default Post;
