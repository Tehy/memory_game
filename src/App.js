import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  let initialNumbers = [1, 2, 3];
  const [numbers, setNumbers] = useState();

  useEffect(() => {
    console.log("----->APP USEEFFECT<-----");
    setNumbers(initialNumbers);
  }, []);

  function nextRound(numbers) {
    let nums = [...numbers, numbers.pop() + 1];
    setNumbers();
    setNumbers(nums);
  }

  return numbers ? (
    <>
      <div className="app">
        <header className="header">
          <h1>Memory Test</h1>
          <p>test how far you memory last by clicking the squares in order</p>
        </header>
        {<Board numbers={numbers} nextRound={nextRound} />}
      </div>
    </>
  ) : (
    <></>
  );
}

export default App;
