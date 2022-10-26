import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import Dotmenu from '../dot_menu/Dot_menu'


const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
  },
  left: {
    // flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    color: "white"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: "white",
  },
  drop:{
    marginRight: theme.spacing(10)
  }
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            component={RouterLink}
            to="/"
          >
            Menu
          </Link>

          <div className={classes.right}>
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              component={RouterLink}
              to="/myrequest"
            >
              Request Tabel
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              component={RouterLink}
              to="/contactus"
            >
              Contact Us
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              component={RouterLink}
              to="/userprofile"
            >
              UserProfile
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              component={RouterLink}
              to="/requirementform"
            >
              Requirement Form
            </Link>
            {"  "}
            {localStorage.getItem("regtoken") == null ? 
              
              <>
              <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              component={RouterLink}
              to="/signin"
            >
              Sign In
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              component={RouterLink}
              to="/signup"
            >
              Sign Up
            </Link>
              </> : 
              <>
              <Link className={classes.drop}>
            </Link>
            <Dotmenu />
              </>
            }
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);