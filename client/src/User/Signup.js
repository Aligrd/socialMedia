import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/ThemeContext";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import SignupFormValidation from "./login-sub-components/SignupFormValidation";
import EvaluatePassword from "../components/util/EvaluatePassword";
const Signup = () => {
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [passwordState, setPasswordState] = useState({
    doesHaveUpperCase: false,
    doesHaveNumber: false,
    doesHaveSpecialCharacter: false,
    doesHaveEnoughLength: false,
  });
  const [isWrong, setIsWrong] = useState(false);
  // const [inputErr ,setinputErr] = useState({
  //   emptyField : false,
  //   lowLength : false,
  //    : false,
  //   emptyField : false,
  // })

  //TODO we dont evaluate user entry
  // const ThemeContext = useContext(AppContext); //context for Theme (future)

  //! implement a progressio bar like this https://i.stack.imgur.com/L4pfu.png for password evaluation
  const navigate = useNavigate();

  const evaluateInput = () => {
    if (
      registerInfo.username.length === 0 ||
      registerInfo.password.length === 0 ||
      registerInfo.email.length === 0
    ) {
      setIsWrong(true);
      return false;
    }
    return true;
  };

  function cook() {}

  const handleRegistration = (e) => {
    e.preventDefault();

    evaluateInput() &&
      axios
        .post("http://localhost:3001/users/register", {
          username: registerInfo.username,
          email: registerInfo.email,
          password: registerInfo.password,
        })
        .then((response) => {
          const registrationState = response.data;
          // navigate to login page with this after registeration
          navigate("/login", {
            state: {
              username: registerInfo.username,
              password: registerInfo.password,
            },
          });
        });
  };
  useEffect(() => {
    const passwordState = EvaluatePassword(String(registerInfo.password));
    setPasswordState(passwordState);
  }, [registerInfo.password]);

  console.log(passwordState);
  return (
    <div className="bg-gradient-to-tr from-slate-500 to-blue-200 h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleRegistration}
        className="w-full  text-xl flex flex-col gap-y-6  md:border md:max-w-[20rem] md:flex md:bg-gradient-to-bl md:from-bg-blue-200 "
      >
        <h2 className="relative top-[-2rem] text-3xl text-center font-bold md:top-[-6rem]">
          ثبت نام
        </h2>
        <div className="flex flex-col text-right ">
          <label htmlFor="username" className="mr-[12%] text-[1rem]">
            نام کاربری
          </label>
          <input
            className={`w-[80%] h-10  self-center outline-none rounded-md text-center mt-2 shadow-lg md:focus:shadow-2xl`}
            id="username"
            type="text"
            placeholder="نام"
            value={registerInfo.username}
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col text-right">
          <label htmlFor="email" className="mr-[12%] text-[1rem]">
            ایمیل
          </label>
          <input
            className={`w-[80%] h-10  self-center outline-none rounded-md text-center mt-2 shadow-lg md:focus:shadow-2xl`}
            id="email"
            type="text"
            placeholder="ایمیل"
            value={registerInfo.email}
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col text-right">
          <label htmlFor="password" className="mr-[12%] text-[1rem]">
            رمز عبور
          </label>
          <input
            className={`w-[80%] h-10  self-center outline-none rounded-md text-center mt-2 shadow-lg md:focus:shadow-2xl `}
            type="password"
            id="password"
            placeholder="رمز"
            value={registerInfo.password}
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                password: e.target.value,
              })
            }
          />
        </div>
        <button className="bg-blue-500 w-[35%] h-14 self-center rounded-md md:bg-white md:border md:border-blue-500 hover:bg-blue-300 hover:text-white mb-[1rem]">
          ثبت نام
        </button>
      </form>

      {/* <SignupFormValidation passwordState={passwordState} /> */}
    </div>
  );
};

export default Signup;
