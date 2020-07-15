import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const boardSize = 10;
  let initialNumbers = [1, 2, 3];
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    console.log("----->APP<-----");
    setNumbers(initialNumbers);
    setNumbersCopy(initialNumbers);
    setNumberCount(initialNumbers.length); //setupNextRound(initialNumbers);
    //setNumberCount(initialNumbers.length);
  }, []);

  const [nextRoundNumbers, setNextRoundNumbers] = useState();
  const [numbers, setNumbers] = useState();
  const [numbersCopy, setNumbersCopy] = useState(numbers);
  const [numberCount, setNumberCount] = useState(numbers);
  const [playBoard, setPlayBoard] = useState();

  useEffect(() => {
    //setupNextRound(numbers);
    //setNumberCount(numbers.length);
  }, []);

  const setupNextRound = async (nums) => {
    console.log("setupNextRound", nums);
    //setNumbers(nums);
    setNumbers();
    setNumbers(nums);

    console.log("setupNextRound numbers", numbers);
  };

  function randomRectangleIndexes(numbersLen) {
    let randomIndexes = [];
    while (true) {
      let num = getRandomInt(10).toString() + getRandomInt(10).toString();
      if (!randomIndexes.includes(num)) {
        randomIndexes.push(num);
      }
      if (randomIndexes.length === numbersLen) break;
    }
    return randomIndexes;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const addClassName = () => {
    let els = document.querySelectorAll(".rectangle-playable");
    els.forEach(function (el) {
      el.classList.add("rectangle-hide-text");
      //el.className = "rectangle-hide-text";
    });
  };

  const popRandom = (array) => {
    let random = array.splice(Math.floor(Math.random() * array.length), 1);
    return random;
  };

  const updateClickOrder = (order, el) => {
    order.push(el);
  };
  let clickOrder = [];
  const fillBoard = (indexes) => {
    let board = [];

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (indexes.includes(i.toString() + j.toString())) {
          board.push(
            <div
              key={i.toString() + j.toString()}
              className="rectangle-playable"
              id={i.toString() + j.toString()}
              onClick={(clickCount) => {
                //setClickCount(clickCount + 1); //this doesnt work

                var el = document.getElementById(i.toString() + j.toString());

                //clickOrder.push(el.innerHTML);

                updateClickOrder(clickOrder, el.innerHTML);
                /* console.log("numberCount", numberCount);
                console.log("clickOrder", clickOrder.length);
                console.log("clickOrder", clickOrder); */

                el.className = "rectangle-clicked";
                addClassName();

                if (clickOrder.length === numberCount) {
                  setClicks(clickOrder);
                  setPlayBoard();
                }
              }}
            >
              {popRandom(numbersCopy)}
              {/* {numbers.pop(0)} */}
            </div>
          );
        } else {
          board.push(
            <div
              key={i.toString() + j.toString()}
              className="rectangle"
              id={i.toString() + j.toString()}
            >
              &nbsp;
            </div>
          );
        }
      }
      board.push(<br />);
    }
    //console.log("coardb", board);
    return board;
  };
  const checkRoundPassed = (clicks) => {
    console.log("clicks", clicks);
    let nums = [];
    let i = 0;
    let result = clicks.map((c) => {
      nums[i] = ++i;

      return parseInt(c) === i;
    });
    console.log("resulst", result);
    return result.includes(false) ? (
      <h2 style={{ color: "DarkOrange" }}> Round failed </h2>
    ) : (
      <>
        <h2 style={{ color: "PaleGreen" }}> Round passed ! </h2>
        <p>
          Your click order{" "}
          {clicks.map((c) => (
            <>&nbsp;{c}</>
          ))}
        </p>
        <button
          onClick={() => {
            console.log("CHECKROUNDPASSED numbers", nums);

            setupNextRound(nums.concat(nums[nums.length - 1] + 1));
          }}
        >
          Next Round
        </button>
      </>
    );
  };
  const setBoard = (numbers) => {
    console.log("setBoard", numbers);

    return (
      <Board
        numbers={numbers}
        setupNextRound={setupNextRound}
        checkRoundPassed={checkRoundPassed}
        randomRectangleIndexes={randomRectangleIndexes}
        fillBoard={fillBoard}
        clicks={clicks}
      />
    );
  };

  return numbers ? (
    <>
      {console.log("APPPPPPP")}
      <button
        onClick={() => {
          console.log("numbers", numbers);
          let nubs = [...numbers];
          console.log("nubs", nubs);
          setNumbers();
          setNumbers(nubs);
          setBoard(numbers);
        }}
      >
        BUTTON
      </button>
      <div className="app">
        <header className="header">
          <h1>Chimp test</h1>
        </header>
        {/* {console.log("numbers", numbers)} */}
        {setBoard(numbers)}
      </div>
    </>
  ) : (
    <>
      {/* {console.log("numbers", numbers)}
      {console.log("numbersCopy", numbersCopy)} */}
    </>
  );
}

export default App;
