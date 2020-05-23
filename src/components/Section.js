import React from "react";
import useScrollDetector from "../hook/useScrollDetector";

const Section = () => {
  const [isScrolling, position] = useScrollDetector();
  console.log({ isScrolling, position });
  //   console.log(isScrolling);
  return (
    <div
      style={{
        height: "300vh",
        backgroundColor: isScrolling ? "yellow" : "blue",
      }}
    >
      {isScrolling ? "Yes" : "No"}
    </div>
  );
};

export default Section;
