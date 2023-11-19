import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AllPosts from "./AllPosts";
import Login from "../User/Login";
import AuthContext from "../Context/AuthContext";
import { FaPlus } from "react-icons/fa";

//home sub components
import Navigation from "./Home/Navigation";

import { FaArrowAltCircleRight } from "react-icons/fa";
function Home() {
  const [userAuth] = useContext(AuthContext);
  console.log(userAuth);
  const [data, setData] = useState([]);
  const [isUserLogged, setIsUserLogged] = useState(false); //track the user logging state
  const [isHovering, setIsHovering] = useState(false); //check if user hovers mouse pointer on specefic componnet to show detail
  const navigate = useNavigate();

  //! make another component DETAIL and set a onmouse event to certain component to change isHovering and show the Detail Component

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    setIsUserLogged(userAuth.authStatus);
    if (!userAuth.authStatus) {
      navigate("/");
    }
  }, [userAuth]);

  return (
    <div className="w-screen h-[clac(100vh-64px)] flex box-border">
      <aside className="w-full h-full bg-blue-100 hidden md:w-2/5 md:h-screen md:block md:place-items-end"></aside>

      <aside className="h-full w-full flex flex-col items-center border-x-4 ">
        {data.map((record, key) => (
          <AllPosts key={key} props={record} />
        ))}
      </aside>
      <Link
        to="/create"
        className="fixed bottom-8 left-8 w-14 h-14 bg-stone-400 rounded-full flex items-center justify-center md:hidden"
      >
        <FaPlus className="text-4xl" />
      </Link>
      <aside className=" bg-blue-100 hidden w-1/5  md:block">
        <Navigation />
      </aside>
    </div>
  );
}

export default Home;
