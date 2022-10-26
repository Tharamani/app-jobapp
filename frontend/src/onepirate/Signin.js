import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React, { useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import validator from "validator";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import baseUrl from "../utils/appconfig.js";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

toast.configure();

function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const [loading, setloading] = useState(false);

  const [errorMsg, setErrorMsg] = useState(false);

  const showResults = (values) => {
    // alert(JSON.stringify(values))
    // setloading(true);
    // history.push("/userprofile");

    setloading(true);

    axios
      .post(baseUrl+"/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then((response) => {
        setloading(false);
        localStorage.setItem("regtoken", JSON.stringify(response.data.jwt));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        toast.success("Logging in Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/userprofile");
      })
      .catch((error) => {
        setloading(false);
        console.log("An error occurred:", error.response);

        if (error.response) {
          setErrorMsg(true);
        }
      });
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography
            style={{ fontSize: "15px" }}
            variant="body2"
            align="center"
          >
            {"Not a member yet? "}
            <Link
              component={RouterLink}
              to="/signup"
              align="center"
              underline="always"
            >
              Sign Up
            </Link>
            {errorMsg ? (
              <p style={{ color: "red" }}>Invalid Credentials</p>
            ) : null}
          </Typography>
        </React.Fragment>
        <Form onSubmit={showResults} subscription={{ submitted: true }}>
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Field
                autoFocus
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                validate={(value) =>
                  !validator.isEmail(value || "") && "Plese Enter valid Email "
                }
                component={RFTextField}
                subscription={{
                  value: true,
                  error: true,
                  touched: true,
                }}
              />
              <Field
                name="password"
                label="Password"
                type="password"
                fullWidth
                validate={(value) =>
                  value
                    ? validator.isLength(value, { min: 5, max: undefined })
                      ? undefined
                      : "Minimum 5 characters required"
                    : "Password Required"
                }
                component={RFTextField}
                subscription={{
                  value: true,
                  error: true,
                  touched: true,
                }}
              />
              <FormButton
                className={classes.button}
                disabled={submitting}
                size="large"
                color="secondary"
                fullWidth
                style={{ borderRadius: "10px" }}
              >
                {loading ? <CircularProgress color="inherit" /> : "Sign In"}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography align="center">
          <Link
            underline="always"
            component={RouterLink}
            to="/signin/forgetpassword"
            style={{ fontSize: "15px" }}
          >
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);