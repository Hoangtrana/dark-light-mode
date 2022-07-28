import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";

function App() {
  // Update the array of numbers in state to be an array
  //of objects instead.
  const [allDice, setAllDice] = React.useState(allNewDice());

  // Generate number 1-6
  function generateNumber() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  //Generate number 1-6 and save it to new array
  function allNewDice() {
    const numberArray = [];
    for (let i = 0; i < 10; i++) {
      numberArray.push(generateNumber());
    }
    return numberArray;
  }

  //Roll button click function
  function rollDice() {
    setAllDice((oldDice) =>
      oldDice.map((dice) => {
        return dice.isHeld ? dice : generateNumber();
      })
    );
  }

  // Handle Click dice and change color background
  function handleClick(id) {
    setAllDice((prevDice) => {
      return prevDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      });
    });
  }

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
