import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import DropDownMenu from "./DropDownMenu";

const NavMenu = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="self-center ">
      <button onClick={() => setIsClicked(!isClicked)}>
        {!isClicked ? (
          <FaBars className="text-4xl mr-4" />
        ) : (
          <FaTimes className="text-4xl mr-4" />
        )}
        {isClicked && (
          <DropDownMenu clickState={[isClicked, setIsClicked]} />
          // <div className="bg-stone-300 w-28 text-black absolute  flex flex-col justify-center items-center border border-1 rounded-lg py-2 ">
          //   <Link to="/login">
          //     <span className="flex text-xl focus:bg-red-300">ورود</span>
          //   </Link>
          //   <span className="bg-black h-[calc(1px)] w-[calc(100%-20px)]"></span>

          //   <span className="flex text-xl">ثبت نام</span>
          //   <span className="bg-black h-[calc(1px)] w-[calc(100%-20px)]"></span>

          //   <span className="flex text-xl">درباره ما</span>
          // </div>
        )}
      </button>
    </div>
  );
};

export default NavMenu;
