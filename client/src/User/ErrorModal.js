import React from "react";

const ErrorModal = ({ errState, errMessage }) => {
  console.log(errState, errMessage);
  return (
    <>
      {errState && (
        <div className="absolute bg-red-200  top-[5.5rem] left-[18%] px-2 py-6  w-2/3 rounded-xl animate-bounce md:top-[-10rem] ">
          <h2 className=" text-right pr-5 text-lg text-red-800">
            {errMessage}
          </h2>
        </div>
      )}
    </>
  );
};

export default ErrorModal;
