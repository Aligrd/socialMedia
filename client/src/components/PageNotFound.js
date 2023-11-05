import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="h-[calc(100vh-4rem)]    flex-row justify-evenly items-center md:flex">
      <img
        className="h-full  pt-5 "
        draggable={false}
        src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1699028170~exp=1699028770~hmac=508a292a3e118faa0291e11d615cf2e632c83600966415fe53b0c0dec1a71c84"
        alt=""
      />
      <div className="flex flex-col m-auto items-center justify-items-center ">
        <h1 className="text-3xl pb-10">! این صفحه در دسترس نیست</h1>
        <Link className="text-2xl text-blue-700 p-10  md:p-2 " to="/">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
