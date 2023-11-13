import React, { useState } from "react";

const Progressionbar = ({ currProgression = 1 }) => {
  const [progress, setProgress] = useState((currProgression / 4) * 100); // 1-2-3-4

  const barStyle = "h-full w-[" + String(90) + "%] bg-green-400 rounded-md";

  console.log(barStyle);

  return (
    <div className="h-6 w-full bg-red-500 p-1 border border-black rounded-md">
      <div className={barStyle}></div>
    </div>
  );
};

export default Progressionbar;
