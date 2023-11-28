import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import {
  FaPlus,
  FaHome,
  FaEllipsisH,
  FaHashtag,
  FaBell,
  FaCommentDots,
} from "react-icons/fa";

const NavigationSide = () => {
  const [user, setUser] = useContext(AuthContext);

  return (
    <aside className=" hidden w-1/5  md:block ">
      <div className=" h-1/2 flex flex-col w-20 items-end justify-around mr-4">
        <Link
          to="/"
          className="flex justify-center items-center gap-x-3 hover:opacity-70"
        >
          <h1>خانه</h1>
          <FaHome />
        </Link>
        <Link className="flex justify-center items-center gap-x-3 hover:opacity-70">
          <h1>اکتشاف</h1>
          <FaHashtag />
        </Link>

        <Link className="flex justify-center items-center gap-x-3 hover:opacity-70">
          <h1>اعلانات</h1>
          <FaBell />
        </Link>
        <Link className="flex justify-center items-center gap-x-3 hover:opacity-70">
          <h1>ها</h1>
          <h1>پیام</h1>
          <FaCommentDots />
        </Link>

        <Link
          to={`/profile/${user.id}`}
          className="flex justify-center items-center gap-x-3 hover:opacity-70"
        >
          <h1>پروفایل</h1>
          <img className="flex rounded-full w-9 h-9 bg-red-200" src="" alt="" />
        </Link>
      </div>
      {user.authStatus && (
        <div className="flex justify-center items-start  hover:text-stone-600 cursor-pointer">
          <Link className="" to="/create">
            <h1 className="">پست</h1>
          </Link>
          <FaPlus className="relative top-1 ml-1" />
        </div>
      )}
    </aside>
  );
};

export default NavigationSide;
