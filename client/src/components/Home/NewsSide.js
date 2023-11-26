import React from "react";
import { useContext } from "react";
import ThemeContext from "../../Context/ThemeContext";
const NewsSide = () => {
  const [theme, settheme] = useContext(ThemeContext);
  return (
    <>
      <aside
        className={`${theme ? "bg-red-200" : "black"} hidden  w-2/5  md:block`}
      ></aside>
    </>
  );
};

export default NewsSide;
