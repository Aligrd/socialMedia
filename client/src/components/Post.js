import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../Hooks/AuthContext";
import Comment from "./Comment";
import Commnetform from "./Commnetform";
import Like from "./Like";
import { FaEllipsisH } from "react-icons/fa";

function Post() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [showOptionMenu, setShowOptionMenu] = useState(false);

  // const [like, setLikes] = useState(0);
  // const [isLiked, setIsLiked] = useState(false);
  const [render, setRender] = useState(false); // for rerendring of component in case new comment added in commentform Component

  const [AppAuthCOntext, setAppAuthContext] = useContext(AuthContext); //! user AuthContext

  let { id } = useParams(); //get id of post from url
  useEffect(() => {
    //get post data
    axios.get(`http://localhost:3001/posts/id/${id}`).then((res) => {
      setPost(res.data);
    });

    //comments of post
    axios.get(`http://localhost:3001/commnets/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [render]);

  //TODO we need make this xhtml code volume lesser
  return (
    <div className="flex h-screen w-screen">
      <div className=" border border-1 border-red-300 h-screen w-1/2 flex flex-col items-center justify-center">
        <div className="bg-stone-200 flex flex-col items-center justify-evenly w-1/2 h-1/2 border border-red-300  rounded-t-xl">
          <div className="bg-blue-300 w-full h-1/4  flex ">
            <div>
              <h3>@{post.username}</h3>
              <h3 className="">{post.title}</h3>
            </div>
            <FaEllipsisH onClick={() => setShowOptionMenu(true)} />
          </div>
          <div className="bg-stone-300 w-full h-full flex items-center justify-center">
            <h3>{post.postText}</h3>
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
        {comments.map((comment, index) => (
          <Comment
            key={index}
            data={{
              comment: comment,
              setComments: setComments,
            }}
          />
        ))}
      </div>
    </div>
  );
}
export default Post;
