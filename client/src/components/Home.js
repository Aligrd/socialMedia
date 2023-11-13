import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AllPosts from "./AllPosts";
import Login from "../User/Login";
import AuthContext from "../Context/AuthContext";

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
    <div className="w-screen h-screen flex justify-between box-border">
      <aside className="w-2/5 h-screen"></aside>

      <aside className="h-screen w-1/2 flex flex-col items-center border-x-4">
        {data.map((record, key) => (
          <AllPosts key={key} props={record} />
        ))}
      </aside>

      <aside className="w-1/5 h-screen">
        <Navigation />
      </aside>
    </div>
  );
}

export default Home;
