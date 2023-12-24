// import React, { useContext } from "react";

// import ThemeContext from "./ThemeContext";

//! main function
export const SetThemeContext = ([currentthemeState, setThemeState]) => {
  localStorage.setItem("theme", JSON.stringify(!currentthemeState));
  setThemeState(!currentthemeState);

};


// export default SetThemeContext;
