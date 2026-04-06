import React, { useContext, useEffect } from "react";
import { ResumeContext } from "./ResumeContext";

function ResumeBuilder() {
  const { state, dispatch } = useContext(ResumeContext);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE",
      field: e.target.name,
      value: e.target.value,
    });
  };

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(state));
  }, [state]);

  return (
    <div className="container">

      {/* LEFT SIDE FORM */}
      <div className="form">
        <h2>Resume Builder</h2>

        <div className="section">
          <h4>Personal Info</h4>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="linkedin" placeholder="LinkedIn" onChange={handleChange} />
        </div>

        <div className="section">
          <h4>Professional Summary</h4>
          <textarea name="summary" placeholder="Write summary..." onChange={handleChange} />
        </div>

        <div className="section">
          <h4>Education</h4>
          <textarea name="education" placeholder="Your education details" onChange={handleChange} />
        </div>

        <div className="section">
          <h4>Skills</h4>
          <textarea
            name="skills"
            placeholder="e.g. Java, React, SQL"
            onChange={handleChange}
          />
        </div>

        <div className="section">
          <h4>Experience</h4>
          <textarea
            name="experience"
            placeholder="Write each experience in new line"
            onChange={handleChange}
          />
        </div>

        <div className="section">
          <h4>Achievements</h4>
          <textarea
            name="achievements"
            placeholder="Write each achievement in new line"
            onChange={handleChange}
          />
        </div>

        <button onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>
      </div>

      {/* RIGHT SIDE PREVIEW */}
      <div className="preview">

        {/* HEADER */}
        <div className="resume-header">
          <div className="avatar">
            {state.name ? state.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <h1>{state.name || "Your Name"}</h1>
            <p>
              {state.email || "email@example.com"} | {state.phone || "1234567890"}
            </p>
            <p>{state.linkedin}</p>
          </div>
        </div>

        <hr />

        {/* BODY */}
        <div className="resume-body">

          {/* LEFT COLUMN */}
          <div className="left">
            <h3>Skills</h3>
            <div className="tags">
              {state.skills
                ? state.skills.split(",").map((s, i) => (
                    <span key={i}>{s.trim()}</span>
                  ))
                : <p>No skills added</p>}
            </div>

            <h3>Education</h3>
            <p>{state.education || "Your education details"}</p>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right">
            <h3>Professional Summary</h3>
            <p>{state.summary || "Your summary"}</p>

            <h3>Experience</h3>
            <ul>
              {state.experience
                ? state.experience.split("\n").map((e, i) => (
                    <li key={i}>{e}</li>
                  ))
                : <li>No experience added</li>}
            </ul>

            <h3>Achievements</h3>
            <ul>
              {state.achievements
                ? state.achievements.split("\n").map((a, i) => (
                    <li key={i}>{a}</li>
                  ))
                : <li>No achievements</li>}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;