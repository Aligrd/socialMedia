import React from "react";
import ErrorModal from "./ErrorModal";
import LoginInput from "./login-sub-components/LoginInput";
const LoginContainer = ({
  credentialState,
  handleSubmit,
  errState,
  errMessage,
}) => {
  const [loginData, setLoginData] = credentialState;

  return (
    // md:[ absolute right-[-15%] top-[25%] h-[54%] w-[calc(30%)] flex flex-col  justify-center items-center bg-blue-300 rounded-xl ]
    <div
      className=" w-full h-1/2 flex flex-col md:relative md:right-[50%] md:bg-blue-100 md:border md:border-1 md:border-black md:p-12  md:w-full  md:rounded-lg 
    md:bg-gradient-to-tr md:from-cyan-500 md:to-blue-100
    "
    >
      <ErrorModal errState={errState} errMessage={errMessage} />
      <h2 className="text-4xl relative top-[-1em] self-center  md:relative md:top-4">
        {/* ورود */}
      </h2>
      <div className="text-xl flex flex-col  md:text-lg">
        <LoginInput loginState={[loginData, setLoginData]} type={"username"} />
        <LoginInput loginState={[loginData, setLoginData]} type={"password"} />
        <button
          // md:[ w-[70%]  ml-16 relative right-3 top-[-2rem] hover:text-blue-400 hover:bg-white hover:outline-blue-300]
          className="w-2/5 self-center h-[3rem] relative top-10  text-white rounded-xl  bg-blue-500 md:top-4 md:hover:bg-white md:hover:text-blue-500 md:hover:border md:hover:border-1 md:hover:border-blue-400"
          onClick={handleSubmit}
        >
          ورود
        </button>
      </div>
    </div>
  );
};

export default LoginContainer;
