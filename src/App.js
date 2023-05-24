import React from "react";
import FunApp from "./functionApp";
import ClassApp from "./classApp";

const App = () => {
  return (
    <>
      <h1>
        <b>Functional Component</b>
      </h1>
      <FunApp />
      <h1>
        <b>Class Component</b>
      </h1>
      <ClassApp />
    </>
  );
};

export default App;
