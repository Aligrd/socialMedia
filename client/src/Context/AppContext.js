import { useContext, createContext } from "react";

export const AppContext = createContext({
  darkTheme: "stone",
  lightTheme: "slate",
});
