import React, { useState, useEffect } from "react";

const boardSize = 7;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const popRandom = (array) => {
  let random = array.splice(Math.floor(Math.random() * array.length), 1);
  return random;
};

function randomRectangleIndexes(numbersLen) {
  let randomIndexes = [];
  while (true) {
    let num =
      getRandomInt(boardSize).toString() + getRandomInt(boardSize).toString();
    if (!randomIndexes.includes(num)) {
      randomIndexes.push(num);
    }
    if (randomIndexes.length === numbersLen) break;
  }
  return randomIndexes;
}

const Board = ({ numbers, nextRound }) => {
  const [board, setBoard] = useState();
  const [roundPass, setRoundPass] = useState();

  const hideRectangleTexts = () => {
    let els = document.querySelectorAll(".rectangle-playable");
    els.forEach(function (el) {
      el.classList.add("rectangle-hide-text");
    });
  };
  const fillBoard = (indexes, numbers) => {
    let numbersCopy = [...numbers];
    let board = [];
    var clickCount = 0;

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (indexes.includes(i.toString() + j.toString())) {
          board.push(
            <div
              key={i.toString() + j.toString()}
              className="rectangle-playable"
              id={i.toString() + j.toString()}
              onClick={() => {
                hideRectangleTexts();
                var el = document.getElementById(i.toString() + j.toString());
                el.className = "rectangle-clicked";
                let elInnerHTML = el.innerHTML;

                if (!(numbers[clickCount] === parseInt(elInnerHTML))) {
                  setRoundPass(false);
                  clickCount = 0;
                } else if (clickCount === numbers.length - 1) {
                  setRoundPass(true);
                  clickCount = 0;
                } else {
                  clickCount++;
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
    return board;
  };

  useEffect(() => {
    let b = fillBoard(randomRectangleIndexes(numbers.length), numbers);
    setBoard(b);
  }, [numbers]);

  return roundPass === undefined ? (
    <div className="board">{board}</div>
  ) : roundPass === true ? (
    <div className="win-fail">
      <h2>Good job!</h2>
      <br />
      <button
        onClick={() => {
          setRoundPass();
          nextRound(numbers);
        }}
      >
        Next round
      </button>
    </div>
  ) : (
    <div className="win-fail">
      <h2>Round failed!</h2>
      <br />
      <button
        onClick={() => {
          setRoundPass();
          /* draws the same board */
        }}
      >
        Retry
      </button>
      {/*  TODO new button draw new board 
            setBoard(fillboard....)
          */}
    </div>
  );
};
export default Board;
