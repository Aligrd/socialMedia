import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import AutoCompleteText from "../components/util/LandingText";
import LoginContainer from "./LoginContainer";
const error = {
  credentials: "نام کاربری یا کلمه عبود نادرست می باشد",
  leftEmpty: "نام کاربری یا کلمه عبور نمیتواند خالی باشد",
};
function Login() {
  // find database for user witch authentiicated before in signup and if user pass was correct then navigate it to
  //! partially update userData state
  const [isLogginErr, setIsLogginErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [credential, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [authState, setAuthState] = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitLogin();
    }
  });
  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key == "Enter") submitLogin();
    }); //TODO how to check the key to submit the form
    if (location.state) {
      setCredentials({
        username: location.state.username,
        password: location.state.password,
      });
    }
  }, []);
  useEffect(() => {
    if (authState.authStatus) {
      navigate("/home");
    }
  }, []);

  //navigate to home with user data
  const submitLogin = () => {
    const namel = credential.username.trim().length;
    const passl = credential.password.trim().length;

    if (passl === 0 || namel === 0) {
      setErrMessage(error.leftEmpty);
      setIsLogginErr(true);
    } else {
      axios
        .post("http://localhost:3001/users/login", {
          username: credential.username,
          password: credential.password,
        })
        .then((response) => {
          const data = response.data;

          if (!data.authStatus) {
            setErrMessage(error.credentials);
            setIsLogginErr(true);
          } else {
            localStorage.setItem("accessToken", data.accessToken);
            setAuthState({
              username: credential.username,
              id: data.id,
              authStatus: true,
            });

            // navigate to home with this credentials after login
            navigate("/home", {
              state: {
                username: credential.username,
                password: credential.password,
              },
            });
          }
        });
    }
  };

  return (
    <div className="bg-stone-200 h-screen w-screen flex justify-center items-center ">
      <div className="bg-[#a4bade] w-[70vw] h-4/5 mt-12 min-w-[800px] hidden items-center justify-center rounded-lg md:flex">
        <AutoCompleteText str={"خوش آمدید"} />
      </div>
      <div>
        <LoginContainer
        
          credentialState={[credential, setCredentials]}
          handleSubmit={submitLogin}
          errState={isLogginErr}
          errMessage={errMessage}
        />
      </div>
    </div>
  );
}

export default Login;
