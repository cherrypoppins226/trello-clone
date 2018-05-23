import React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import Board from "./Board";
import * as Labels from "./labels";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

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
