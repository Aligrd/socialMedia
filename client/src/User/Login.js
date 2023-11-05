import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Hooks/AuthContext";
function Login() {
  // find database for user witch authentiicated before in signup and if user pass was correct then navigate it to
  //! partially update userData state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authState, setAuthState] = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key == "Enter") submitLogin();
    }); //TODO how to check the key to submit the form
    if (location.state) {
      setUsername(location.state.username);
      setPassword(location.state.password);
    }
  }, []);
  useEffect(() => {
    if (authState.authStatus) {
      navigate("/home");
    }
  }, []);

  //navigate to home with user data
  const submitLogin = () => {
    axios
      .post("http://localhost:3001/users/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;

        if (!data.authStatus) {
          alert("this user does not exists!");
        } else {
          localStorage.setItem("accessToken", data.accessToken);
          setAuthState({
            username: username,
            id: data.id,
            authStatus: true,
          });
          navigate("/home", {
            state: {
              username: username,
              password: password,
            },
          });
        }
      });
  };
  const style = `bg-stone-500 h-screen w-screen flex  justify-center items-center`;

  return (
    <div>
      <div className={style}>
        <div className="login border-2 border-red-300 w-1/4 h-2/3 rounded-xl  bg-slate-400 h- flex flex-col items-center justify-evenly">
          <h2 className="text-3xl font-bold">Login</h2>
          <div className="field-container  text-xl flex flex-col ">
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
              className="mt-10 bg-zinc-400 h-14 w-40 rounded-xl self-center hover:bg-gray-500 border border-2 border-stone-300"
              onClick={submitLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
