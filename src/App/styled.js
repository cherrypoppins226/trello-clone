// QuickEditCard
export const textarea1 = {
  pointerEvents: "all",
  minHeight: 100,
  minWidth: 200,
  // Best gotten dynamically from the card
  padding: 4,
  paddingLeft: 8,

  border: 0,
  resize: "none",
  borderRadius: 2,

  "&:focus": {
    outlineWidth: 2,
    boxShadow: "0px 0px 2px 0px"
  }
};

// CardsList Header
export const textarea2 = {
  // Common
  border: 0,
  resize: "none",
  borderRadius: 2,
  // Specific
  padding: 0,
  background: "transparent",
  "&:focus": {
    // Common
    boxShadow: "0px 0px 2px 0px",
    // Specific
    outlineWidth: 2,
    background: "white"
  }
};

// EditCard Activity
export const textarea3 = {
  width: "100%",
  minHeight: 75,
  marginBottom: 10,

  resize: "none",
  padding: "9px 11px",
  paddingBottom: 0,
  background: "white",
  outline: "none",
  boxShadow: "0 1px 2px rgba(0,0,0,.23)",
  "&:focus": {
    boxShadow: "0 1px 3px rgba(0,0,0,.33)"
  }
};

// EditCard Comments
export const textarea4 = {
  width: "100%",
  minHeight: 75,
  marginBottom: 10,

  resize: "none",
  outline: "none",
  border: 0,
  borderRadius: 2,
  padding: "9px 11px",
  paddingBottom: 0,
  boxShadow: "0 1px 2px rgba(0,0,0,.23)",
  "&:focus": {
    outlineWidth: 2,
    boxShadow: "0 1px 3px rgba(0,0,0,.33)"
  }
};

// EditCard Description
export const textarea5 = {
  minHeight: 60,
  marginLeft: 35,

  padding: 7,
  cursor: "pointer",
  resize: "none",
  borderRadius: 2,
  background: "rgba(0, 0, 0, 0.03)",
  borderColor: "rgba(0, 0, 0, .15)",
  border: "1px solid #cdd2d4",
  boxShadow: "inset 0 1px 6px rgba(0,0,0,.1)",
  "&:focus": {
    cursor: "auto",
    background: "rgba(0, 0, 0, 0.03)",
    borderColor: "rgba(0, 0, 0, .15)",
    border: "1px solid #cdd2d4",
    boxShadow: "inset 0 1px 6px rgba(0,0,0,.1)",
    outline: "none"
  }
};

// EditCard Header
export const textarea6 = {
  border: 0,
  resize: "none",
  borderRadius: 2,
  background: "transparent",
  padding: 0,
  "&:focus": {
    outlineWidth: 2,
    background: "white",
    boxShadow: "0px 0px 2px 0px"
  }
};
