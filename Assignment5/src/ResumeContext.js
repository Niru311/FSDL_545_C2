import React, { createContext, useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  summary: "",
  education: "",
  skills: "",
  experience: "",
  achievements: "",
};

const loadInitialState = () => {
  try {
    const saved = localStorage.getItem("resumeData");
    return saved ? JSON.parse(saved) : initialState;
  } catch (error) {
    return initialState;
  }
};

export const ResumeContext = createContext();

const resumeReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, null, loadInitialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};
