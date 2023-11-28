import React from "react";
import { useContext } from "react";
import ThemeContext from "../../Context/ThemeContext";
import { ThemeHelper } from "../../Context/ThemeChnageHelper";
const NewsSide = () => {
  const [theme, settheme] = useContext(ThemeContext);

  // ${ThemeHelper(theme,{light , dark:"" })}

  const colorTheme = theme
    ? "bg-[var(--light-2)] text-[var(--primary-text-dark)]"
    : "bg-[var(--dark-1)] text-[var(--primary-text)]";
  const sectionsTheme = theme
    ? "bg-[var(--light-3)] text-[var(--primary-text-dark)]"
    : "bg-[var(--third-dark)] text-[var(--secondary-text)]";

  return (
    <>
      <aside
        //
        // ${theme ? "bg-[var(--light-1)] " : "bg-[var(--dark-1)]"}]
        className={`${colorTheme} rounded-tl-lg hidden w-2/5 flex-col p-2  md:flex`}
      >
        <div className="text-right flex flex-col items-center ">
          <h1 className="relative right-10 w-full ">موضوعات داغ</h1>
          <div
            className={`${sectionsTheme} my-2 rounded-md w-[80%] h-[10rem] p-4 shadow-lg`}
          >
            <h3>Lorem, ipsum.</h3>
          </div>
        </div>
      </aside>
    </>
  );
};

export default NewsSide;
