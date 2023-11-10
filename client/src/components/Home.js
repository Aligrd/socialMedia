import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AllPosts from "./AllPosts";
import Login from "../User/Login";
import AuthContext from "../Context/AuthContext";
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
    <div className="App w-screen h-screen flex flex-col items-center">
      {/* userAuthContext.authStatus */}
      {isUserLogged && (
        <Link className="mt-20" to="/create">
          <button className="bg-stone-800 text-orange-200 p-4 rounded-lg hover:scale-105">
            Create A Post
          </button>
        </Link>
      )}
      {data.map((record, key) => (
        <AllPosts key={key} props={record} />
      ))}
    </div>
  );
}

export default Home;
