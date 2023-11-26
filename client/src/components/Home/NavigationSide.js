import React from "react";
import Navigation from "./Navigation";

const NavigationSide = () => {
  return (
    <>
      <aside className="relative bg-[var(--light__)] hidden w-1/5  md:block">
        <Navigation />
      </aside>
    </>
  );
};

export default NavigationSide;
