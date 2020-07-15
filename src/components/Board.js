import React, { useState, useEffect } from "react";

const Board = ({
  numbers,
  setupNextRound,
  checkRoundPassed,
  randomRectangleIndexes,
  fillBoard,
  clicks,
}) => {
  const [board, setBoard] = useState();
  const [numLen, setNumLen] = useState(numbers.length);
  const [nums, setNums] = useState(numbers);

  useEffect(() => {
    console.log("EFFECT numbers", numbers);
    setNums(numbers);
    console.log("board numbers.length", numbers.length);
    var randomIndexes = randomRectangleIndexes(numbers.length);
    const b = fillBoard(randomIndexes);

    setBoard(b);
    //console.log("b", b);
  }, []);

  return board ? (
    (console.log("board numbers", numbers),
    console.log("board nums", nums),
    document.getElementsByClassName("rectangle-clicked").length < numLen ? (
      <>
        <div className="board">{board}</div>
      </>
    ) : (
      <div className="board">{checkRoundPassed(clicks)}</div>
    ))
  ) : (
    <>WHTA</>
  );
};
export default Board;
