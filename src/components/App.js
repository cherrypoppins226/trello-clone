import React from "react";
import Board from "./Board";
import * as Labels from "./labels";

const App = ({ lists }) => {
  return (
    <>
      <Board lists={lists} />
      <div style={{ display: "none" }}>
        {Object.values(Labels).map((obj, idx) => (
          <div id={obj.id} key={idx}>
            {obj.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
