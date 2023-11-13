import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import {
  FaPlus,
  FaHome,
  FaEllipsisH,
  FaHashtag,
  FaBell,
  FaCommentDots,
} from "react-icons/fa";
const Navigation = () => {
  const [user, setUser] = useContext(AuthContext);
  return (
    <div className="h-full  flex flex-col items-center justify-center center text-3xl">
      <div className=" h-1/3 flex flex-col w-2/3 items-end justify-between mr-20">
        <Link to="/" className="flex justify-center items-center gap-x-3">
          <h1>خانه</h1>
          <FaHome />
        </Link>
        <Link className="flex justify-center items-center gap-x-3">
          <h1>اکتشاف</h1>
          <FaHashtag />
        </Link>

        <Link className="flex justify-center items-center gap-x-3">
          <h1>اعلانات</h1>
          <FaBell />
        </Link>

        <Link className="flex justify-center items-center gap-x-3">
          <h1>پیام ها</h1>
          <FaCommentDots />
        </Link>

        <Link className="flex justify-center items-center gap-x-3">
          <h1>پروفایل</h1>
          <img className="flex rounded-full w-9 h-9 bg-red-200" src="" alt="" />
        </Link>
      </div>

      {user.authStatus && (
        <Link className="mt-20" to="/create">
          <button className="w-full h-full flex rounded-lg hover:scale-105 justify-center items-center">
            <FaPlus />
            <h1 className="leading-3">پست</h1>
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navigation;
