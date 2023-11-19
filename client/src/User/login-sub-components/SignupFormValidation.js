import React from "react";
import { FaCheckSquare, FaTimes } from "react-icons/fa";
import Progressionbar from "./Progressionbar";

const SignupFormValidation = ({ passwordState }) => {
  const progress = [
    passwordState.doesHaveSpecialCharacter,
    passwordState.doesHaveEnoughLength,
    passwordState.doesHaveUpperCase,
    passwordState.doesHaveNumber,
  ];

  const progressResult = () => {
    let count = 0;
    for (let i = 0; i < progress.length; i++) {
      if (progress[i]) {
        count++;
      }
    }
    return count;
  };

  return (
    <div className="bg-red-300 p-5">
      <Progressionbar currProgression={3} />
      <div className="flex justify-center items-center">
        {passwordState.doesHaveSpecialCharacter ? (
          <FaCheckSquare className="text-green-600" />
        ) : (
          <FaTimes className="text-red-600" />
        )}
        <h1>پسورد باید از حداقل یک سمبل تشکیل شده باشد</h1>
      </div>

      <div className="flex justify-center items-center">
        {passwordState.doesHaveNumber ? (
          <FaCheckSquare className="text-green-600" />
        ) : (
          <FaTimes className="text-red-600" />
        )}
        <h1>پسورد باید از حداقل یک حرف عدد تشکیل شده باشد</h1>
      </div>

      <div className="flex justify-center items-center">
        {passwordState.doesHaveUpperCase ? (
          <FaCheckSquare className="text-green-600" />
        ) : (
          <FaTimes className="text-red-600" />
        )}
        <h1>پسورد باید از حداقل یک حرف بزرگ تشکیل شده باشد</h1>
      </div>

      <div className="flex justify-center items-center">
        {passwordState.doesHaveEnoughLength ? (
          <FaCheckSquare className="text-green-600" />
        ) : (
          <FaTimes className="text-red-600" />
        )}
        <h1>طول پسورد باید از 8 کاراکتر بیشتر باشد</h1>
      </div>
    </div>
  );
};

export default SignupFormValidation;
