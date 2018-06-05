import merge from "deepmerge";
import grey from "@material-ui/core/colors/grey";

export const textarea = {
  border: 0,
  borderRadius: 3,
  resize: "none",
  width: "100%",
  "&:focus": {
    outlineWidth: 2,
    boxShadow: "0 1px 3px rgba(0, 0, 0, .33)"
  }
};

export const headerTextarea = merge(textarea, {
  padding: 0,
  paddingLeft: 4,
  background: "transparent",
  fontWeight: 700,
  "&:focus": {
    background: "white"
  }
});

export const icon = {
  margin: "0px 5px",
  padding: 1
};

export const smallIcon = {
  ...icon,
  width: "0.8em",
  height: "0.8em"
};

export const lightColor = {
  color: "rgb(153, 153, 153)"
};

export const button = {
  textTransform: "none",
  fontWeight: 700,
  borderRadius: 3,
  borderWidth: 0,
  outline: "none",
  cursor: "pointer"
};

export const buttonIcon = {
  ...button,
  background: "none",
  padding: 0
};

export const buttonIconSmall = {
  ...buttonIcon,
  padding: 3,
  "& svg": {
    padding: 3,
    width: "0.8em",
    height: "0.8em",
    color: grey[700]
  },
  "&:hover": {
    background: "#D6D6D6"
  }
};
