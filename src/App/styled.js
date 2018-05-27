import merge from "deepmerge";

export const textareaCommon = {
  border: 0,
  borderRadius: 2,
  resize: "none",
  width: "100%",
  "&:focus": {
    outlineWidth: 2,
    boxShadow: "0 1px 3px rgba(0, 0, 0, .33)"
  }
};

export const headerTextarea = merge(textareaCommon, {
  padding: 0,
  background: "transparent",
  fontWeight: 700,
  "&:focus": {
    background: "white"
  }
});
