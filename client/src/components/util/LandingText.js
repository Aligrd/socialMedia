import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../../Context/ThemeContext";
import ReactDOM from "react-dom";

function LandingText({ str }) {
  console.log(str);
  const [substr, setsubstr] = useState(str[0]);
  const [index, setIdnex] = useState(1);
  const [theme, setTheme] = useContext(ThemeContext);
  useEffect(() => {
    let interval = setInterval(() => {
      const l = str.length + 3;
      if (index < l) {
        let newSubStr;
        if (index >= str.length) {
          newSubStr = "." + substr;
          setsubstr(newSubStr);
          setIdnex(index + 1);
        } else {
          newSubStr = substr + str[index];

          setsubstr(newSubStr);
          setIdnex(index + 1);
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div
      className={`${
        theme ? "text-black" : "text-white"
      } text-6xl h-24 text-center`}
    >
      {substr}
    </div>
  );
}

export default LandingText;
