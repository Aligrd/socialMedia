import React, { useEffect, useRef } from "react";

const PostOptionMenu = ({
  showOptionMenu,
  setShowOptionMenu,
  SharePost,
  editPost,
  deletePost,
  setShowEditSection,
  isForCurrentUser,
}) => {
  //!
  const menuRef = useRef(null);

  const menuClickHandler = (e) => {
    console.log(e.currentTarget);
    console.log(e.target);

    if (!menuRef.current.contains(e.target)) {
      setShowOptionMenu(false);
    }
  };

  useEffect(() => {
    if (showOptionMenu) {
      document.addEventListener("mousedown", menuClickHandler);
    }
    return () => {
      document.removeEventListener("mousedown", menuClickHandler);
    };
  }, [showOptionMenu]);

  console.log(showOptionMenu);
  return (
    <>
      {showOptionMenu && (
        // <div className="absolute bg-slate-500 w-[80px] h-[100px] right-[64%] rounded-md top-[28%]">
        <ul
          ref={menuRef}
          className="h-min flex flex-col justify-evenly items-center text-white absolute bg-slate-500 rounded-sm w-[80px] h-[100px] right-[64%] top-[29%] select-none"
        >
          <li className="w-full h-full text-center hover:bg-slate-600">
            <button onClick={SharePost}>Share</button>
          </li>
          <div className="bg-black h-[1px] w-full "></div>

          {isForCurrentUser && (
            <>
              <li className="w-full h-full text-center hover:bg-slate-600">
                <button className="" onClick={() => setShowEditSection(true)}>
                  Edit
                </button>
              </li>
              <div className="bg-black h-[1px] w-full "></div>

              <li className="w-full h-full text-center hover:bg-slate-600">
                <button className="" onClick={deletePost}>
                  Delete
                </button>
              </li>
            </>
          )}
        </ul>
        // </div>
      )}
    </>
  );
};

export default PostOptionMenu;
