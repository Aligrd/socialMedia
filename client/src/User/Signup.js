import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/ThemeContext";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import EvaluatePassword from "../components/util/EvaluatePassword";
const Signup = () => {
  const [registerInfo, setRegisterInfo] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const [passwordState, setPasswordState] = useState({
    doesHaveUpperCase: false,
    doesHaveNumber: false,
    doesHaveSpecialCharacter: false,
    doesHaveEnoughLength: false,
  });

  //TODO we dont evaluate user entry
  // const ThemeContext = useContext(AppContext); //context for Theme (future)
  const navigate = useNavigate();
  const handleRegistration = () => {
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
    <div className="bg-slate-700 h-screen w-screen flex justify-center items-center">
      <div className="login border-2 border-red-300 w-1/4 h-2/3 rounded-xl  bg-slate-400 h- flex flex-col items-center justify-evenly">
        <h2 className="text-3xl font-bold">Signup</h2>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegistration();
            }}
            className="text-xl flex flex-col"
          >
            <div className="flex flex-col py-6">
              <label htmlFor="">Username</label>
              <input
                className="focus:outline outline-3 outline-gray-500 "
                type="text"
                placeholder="ex. ali"
                value={registerInfo.username}
                onChange={(e) =>
                  setRegisterInfo({
                    ...registerInfo,
                    username: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col w-80 ">
              <label htmlFor="">Email</label>
              <input
                className="focus:outline outline-3 outline-gray-500"
                type="text"
                placeholder="ex. ali@gmail.com"
                value={registerInfo.email}
                onChange={(e) =>
                  setRegisterInfo({
                    ...registerInfo,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col py-6">
              <label htmlFor="">Passowrd</label>
              <input
                className="focus:outline outline-3 outline-gray-500 "
                type="password"
                placeholder="ex. ali123455"
                value={registerInfo.password}
                onChange={(e) =>
                  setRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <button className="mt-10 bg-zinc-400 h-14 w-40 rounded-xl self-center hover:bg-gray-500 border-2 border-stone-300 ">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="bg-red-200 p-10 ">
        <h1>numb : {JSON.stringify(passwordState.doesHaveNumber)}</h1>
        <h1>char : {JSON.stringify(passwordState.doesHaveSpecialCharacter)}</h1>
        <h1>upper : {JSON.stringify(passwordState.doesHaveUpperCase)}</h1>
        <h1>upper : {JSON.stringify(passwordState.doesHaveEnoughLength)}</h1>
      </div>
    </div>
  );
};

export default Signup;
