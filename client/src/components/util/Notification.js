import React from "react";


const Notification = ({ color, message }) => {
  return (
    <div
      className={`absolute select-none top-[5rem] right-40 bg-${String(
        color
      )}-400 flex justify-center items-center p-3 border border-1 border-black rounded-md cursor-default `}
    >
      <h2 className="text-center ">{message}</h2>
    </div>
  );
};

export default Notification;
