import React from "react";

const LoginInput = ({ loginState, type }) => {
  const [loginData, setLoginData] = loginState;

  const handleOnChange = (env) => {
    const inputValue = env.target.value;
    if (inputValue.trim() !== inputValue) {
      env.target.value = inputValue.trim();
    }
    if (type === "username") {
      setLoginData({
        ...loginData,
        username: env.target.value,
      });
    } else {
      setLoginData({
        ...loginData,
        password: env.target.value,
      });
    }
  };

  return (
    <div className="flex flex-col py-5 text-end">
      <label htmlFor="" className="px-1">
        {type === "username" ? "نام کاربری" : "رمز عبور"}
      </label>
      <input
        className="w-[calc(100vw-2rem)] text-center p-2 mt-2 rounded-md outline-none  focus:shadow-md md:w-[calc(100%)] md:focus:shadow-lg"
        type={type === "username" ? "text" : "password"}
        placeholder={type === "username" ? "نام " : "کلمه عبور"}
        value={type === "username" ? loginData.username : loginData.password}
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
    </div>
  );
};

export default LoginInput;
