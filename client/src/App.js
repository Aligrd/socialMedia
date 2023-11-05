import "./App.css";
import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

//Components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import SignUp from "./User/Signup";
import Login from "./User/Login";
import PageNotFound from "./components/PageNotFound";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/UserProfile/ProfilePage";
import PrivateRoute from "./components/util/PrivateRoute";
import NotAuth from "./User/NotAuth";

import AuthContext from "./Hooks/AuthContext";
import axios from "axios";

//! we give logged in user as a state to app component and pass setUser as prop to login page and set in

function App() {
  const [user, setUser] = useState({}); //* this is user data witch can be accessed trough navbar icon in  this is just username and user avatar

  const [authState, setAuthState] = useState({
    username: undefined,
    id: undefined,
    authStatus: false,
  }); // intialize the state of authentication in app and change it inside useEffect

  //! we also can set notification for app

  //functionality to check status connection of user
  // const [isOnline, set_isOnline] = useState(navigator.onLine);

  // useEffect(() => {
  //   const online_status_check = setInterval(() => {
  //     navigator.onLine ? set_isOnline(true) : set_isOnline(false);
  //     console.log(`user is ${isOnline ? "Online" : "Offline"}`);
  //   }, 5000);

  //   return clearInterval(online_status_check);
  // }, []);

  // we can add login for USER and give it as context trough all application!
  // ! make a search functionallity for posts an create a component on top in navbr for seach just get all asossciated posts to current user
  // ! -- search trought tile or text of posts

  //* we can make a loggedIn state in here an populate it every where => Wrong
  //* we can make a Context and add logging state in there and inject and use it in every where => Right

  // const logging_state =localStorage.getItem("accessToken") === "" ? false : true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/auth", {
        headers: {
          accesstoken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            username: undefined,
            id: undefined,
            authStatus: false,
          });
        } else {
          const data = response.data;
          setAuthState({
            username: data.username,
            id: data.id,
            authStatus: true,
          });
        }
      });
  }, []);

  console.log("App :", authState);

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={LandingPage} />
          <Route path="/home" exact Component={Home} />
          <Route path="/signup" exact Component={SignUp} />
          <Route path="/login" exact Component={Login} />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          {/* change the routing comonenet if user is logout you unauth users
          wanted to reach a route specefic for logged in users */}
          {authState.authStatus ? (
            <>
              <Route path="/create" exact Component={CreatePost} />
              <Route path="/post/:id" exact Component={Post} />
            </>
          ) : (
            <>
              <Route path="/create" exact Component={NotAuth} />
              <Route path="/post" exact Component={NotAuth} />
            </>
          )}
          <Route path="*" exact Component={PageNotFound} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
