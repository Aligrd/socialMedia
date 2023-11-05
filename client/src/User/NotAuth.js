import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NotAuth = () => {
  return (
    <div className="h-[calc(100vh-4rem)]  flex-row justify-evenly items-center md:flex">
      <img
        className="h-full  pt-5 "
        draggable={false}
        src="https://img.freepik.com/premium-vector/keyword-research-abstract-concept-vector-illustration_107173-29123.jpg?w=1060"
        alt=""
      />
      <div className="flex flex-col m-auto items-center justify-items-center ">
        <h1 className="text-3xl pb-10">
          !برای دسترسی به این صفحه باید وارد شوید
        </h1>
        <Link className="text-2xl text-blue-700 p-10  md:p-2 " to="/login">
          ورود
        </Link>
        <Link className="text-2xl text-blue-700 p-10  md:p-2 " to="/signup">
          ثبت نام
        </Link>
        <Link className="text-2xl text-blue-700 p-10  md:p-2 " to="/">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
};

export default NotAuth;
