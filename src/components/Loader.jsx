// Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-[300px] mx-auto">
      <div className="w-10 h-10 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
