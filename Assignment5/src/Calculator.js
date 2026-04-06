import React, { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (val) => {
    setInput(input + val);
  };

  const clear = () => setInput("");
  const backspace = () => setInput(input.slice(0, -1));

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const buttons = [
    "C", "⌫", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  return (
    <div className="calc-container">
      <div className="calculator">

        <input className="display" value={input} readOnly />

        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === "C") clear();
                else if (btn === "⌫") backspace();
                else if (btn === "=") calculate();
                else handleClick(btn);
              }}
              className={
                btn === "="
                  ? "equal"
                  : ["+", "-", "*", "/", "%"].includes(btn)
                  ? "operator"
                  : ""
              }
            >
              {btn}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Calculator;