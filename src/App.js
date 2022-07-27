import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";

function App() {
  //Generate number 1-6 and save it to new array
  function allNewDice() {
    const numberArray = [];
    for (let i = 0; i < 10; i++) {
      numberArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return numberArray;
  }

  // Update the array of numbers in state to be an array
  //of objects instead.

  // State to hold the array
  const [allDice, setAllDice] = React.useState(allNewDice());
  //console.log(allNewDice());
  //console.log(allDice);
  const obj = Object.assign({}, allDice);
  console.log(obj);

  //Map through the array
  const allDices = allDice.map((dice) => {
    return (
      <Dice
        isOn={dice.isHeld}
        handleClick={() => handleClick(dice.id)}
        number={dice.value}
      />
    );
  });

  //Roll button click function
  function rollDice() {
    setAllDice(allNewDice());
  }

  // Handle Click dice and change color background
  function handleClick(id) {
    setAllDice((prevDice) => {
      return prevDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      });
    });
  }

  return (
    <main className="main">
      <div className="main--container">{allDices}</div>
      <button onClick={rollDice} className="roll-dice">
        Roll
      </button>
    </main>
  );
}

export default App;
