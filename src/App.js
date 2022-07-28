import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Tenzies from "./Tenzies";
import Confetti from "react-confetti";

function App() {
  // State to hold Tenzies component
  const [show, setShow] = React.useState(false);
  // Update the array of numbers in state to be an array
  //of objects instead.
  const [allDice, setAllDice] = React.useState(allNewDice());

  // Effect run everytime the dice state array changes
  React.useEffect(() => {
    const allHeld = allDice.every((dice) => dice.isHeld);
    const firstValue = allDice[0].value;
    const allSameValue = allDice.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValue) {
      console.log("You WON!");
      setShow(true);
    }
  }, [allDice]);

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
    if (!show) {
      setAllDice((oldDice) =>
        oldDice.map((dice) => {
          return dice.isHeld ? dice : generateNumber();
        })
      );
    } else {
      setShow(false);
      setAllDice(allNewDice());
    }
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
        key={dice.id}
        isOn={dice.isHeld}
        handleClick={() => handleClick(dice.id)}
        number={dice.value}
      />
    );
  });

  return (
    <main className="main">
      <div>
        {" "}
        <Tenzies />{" "}
      </div>
      <div className="main--container">{allDices}</div>
      {show && <Confetti />}
      <button onClick={rollDice} className="roll-dice">
        {show ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
