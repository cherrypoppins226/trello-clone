import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    marginBottom: 25
  },
  subheading: {
    marginBottom: 10,
    "& svg": {
      color: "rgb(153, 153, 153)",
      margin: "0px 5px",
      padding: 1
    },
    "& h3": {
      display: "inline",
      verticalAlign: "super",
      fontWeight: 700
    }
  },
  content: {
    marginLeft: 35
  }
};

const View = ({ classes, title, Icon, children }) => {
  return (
    <section className={classes.root}>
      <div className={classes.subheading}>
        <Icon />
        <Typography variant="subheading">{title}</Typography>
      </div>
      <div className={classes.content}>{children}</div>
    </section>
  );
};

const ContentSection = withStyles(styles)(View);

ContentSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired
};

export default ContentSection;
