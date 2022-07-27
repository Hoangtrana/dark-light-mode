import React from "react";

function Dice(props) {
  let style = {
    backgroundColor: props.isOn ? "#59E391" : "#cccccc",
  };
  return (
    <div className="dice" style={style} onClick={props.handleClick}>
      {props.number}
    </div>
  );
}

export default Dice;
