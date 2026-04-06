import React, { useState } from "react";
import Calculator from "./Calculator";
import Form from "./Form";
import ResumeBuilder from "./ResumeBuilder";
import "./style.css";

function App() {
  const [page, setPage] = useState("resume");

  return (
    <div>
      <div className="navbar">
        <button onClick={() => setPage("calculator")}>Calculator</button>
        <button onClick={() => setPage("form")}>Form</button>
        <button onClick={() => setPage("resume")}>Resume</button>
      </div>

      {page === "calculator" && <Calculator />}
      {page === "form" && <Form />}
      {page === "resume" && <ResumeBuilder />}
    </div>
  );
}

export default App;