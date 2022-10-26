import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import validator from "validator";
import axios from "axios";
import { CircularProgress } from "@mui/material";
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

function RequirementForm() {
  const classes = useStyles();
  let history = useHistory();
  const [loading, setloading] = useState(false);

  const showResults = (values) => {
    // alert(JSON.stringify(values))
    setloading(true);
    axios
      .post(baseUrl+"/auth/local/register", {
        username: values.Firstname,
        email: values.Email,
        password: values.Password,
      })
      .then((response) => {
        setloading(false);

        // <CircularProgress color="secondary" style={{ display: "none" }} />;
        localStorage.setItem("regtoken", JSON.stringify(response.data.jwt));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        history.push("/userprofile");
      })
      .catch((error) => {
        setloading(false);
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm> 
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link
              component={RouterLink}
              style={{ fontSize: "15px" }}
              to="/signin"
              underline="always"
            >
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form onSubmit={showResults} subscription={{ submitted: true }}>
          {({ handleSubmit, submitting, form }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    name="Firstname"
                    label="First Name"
                    fullWidth
                    validate={(value) =>
                      value
                        ? validator.isAlpha(value, "en-US", { ignore: " " })
                          ? validator.isLength(value, {
                              min: 2,
                              max: undefined,
                            })
                            ? undefined
                            : "Mininmum 2 characters required"
                          : "Special charecters & numbers not allowed"
                        : "First name Required"
                    }
                    component={RFTextField}
                    subscription={{
                      value: true,
                      error: true,
                      touched: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="Lastname"
                    label="Last Name"
                    fullWidth
                    validate={(value) =>
                      value
                        ? validator.isAlpha(value, "en-US", { ignore: " " })
                          ? validator.isLength(value, {
                              min: 2,
                              max: undefined,
                            })
                            ? undefined
                            : "Mininmum 2 characters required"
                          : "Special charecters & numbers not allowed"
                        : "Last name Required"
                    }
                    component={RFTextField}
                    subscription={{
                      value: true,
                      error: true,
                      touched: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Field
                name="Email"
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
                name="Password"
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
                {loading ? <CircularProgress color="inherit" /> : "Sign Up"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(RequirementForm);