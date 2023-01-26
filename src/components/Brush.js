import React from "react";

const Brush = props => {
  const brushStyles = {
    svg: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      pointerEvents: "none"
    }
  };

  return (
    <svg
      width={window.innerWidth}
      height={window.innerHeight}
      style={brushStyles.svg}
      className={props.className}
    >
      <circle
        cx={props.mouseX}
        cy={props.mouseY}
        r={props.radius}
        stroke="black"
        strokeWidth="0.5"
        fill={props.color}
      />
    </svg>
  );
};

export default Brush;
