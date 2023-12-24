import "./App.css";
import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";

//Components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import SignUp from "./User/Signup";
import Login from "./User/Login";
import PageNotFound from "./components/PageNotFound";
import LandingPage from "./components/LandingPage";
import NotAuth from "./User/NotAuth";
//Contexts
import AuthContext from "./Context/AuthContext";
import ThemeContext from "./Context/ThemeContext";
import { SwitchThemeHelper } from "./Context/ThemeChnageHelper";
import Profile from "./components/UserProfile/Profile";

function App() {
  //! configuration for axios
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("accessToken");

  //! states
  // const [user, setUser] = useState({});
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
  const [authState, setAuthState] = useState({
    username: undefined,
    id: undefined,
    authStatus: false,
  });
  // ! make a search functionallity for posts an create a component on top in navbar for seach just get all asossciated posts to current user
  // ! -- search trought tile or text of current user Posts

  const logging_state =
    localStorage.getItem("accessToken") === "" ? false : true;

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

  const bg = theme ? "bg-[var(--light-3)]" : "bg-[var(--dark-3)]";

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <AuthContext.Provider value={[authState, setAuthState]}>
        <Router>
          <div
            className={`${bg} w-screen h-[100vh] flex flex-col items-center`}
          >
            <Navbar />
            <div className="w-full h-[100vh] overflow-x-hidden">
              <Routes>
                <Route path="/" exact Component={LandingPage} />
                <Route path="/home" exact Component={Home} />
                <Route path="/signup" exact Component={SignUp} />
                <Route path="/login" exact Component={Login} />
                <Route path="profile/:id" Component={Profile} />
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
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
