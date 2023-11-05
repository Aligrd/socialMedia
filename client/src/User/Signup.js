import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const ThemeContext = useContext(AppContext); //context for Theme (future)
  const navigate = useNavigate();
  const handleRegistration = () => {
    axios
      .post("http://localhost:3001/users/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        const registrationState = response.data;
        navigate("/login", {
          state: {
            username: username,
            password: password,
          },
        });
      });
  };

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-80 ">
              <label htmlFor="">Email</label>
              <input
                className="focus:outline outline-3 outline-gray-500"
                type="text"
                placeholder="ex. ali@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-6">
              <label htmlFor="">Passowrd</label>
              <input
                className="focus:outline outline-3 outline-gray-500 "
                type="password"
                placeholder="ex. ali123455"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="mt-10 bg-zinc-400 h-14 w-40 rounded-xl self-center hover:bg-gray-500 border border-2 border-stone-300 "
              onClick={handleRegistration}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
