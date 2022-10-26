import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import CircularProgress from '@mui/material/CircularProgress';
import validator from 'validator';
import axios from "axios"
import { authRequests } from '../utils/apirequests';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import baseUrl from "../utils/appconfig.js";
import TextField from '@mui/material/TextField';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  loaderbox: {
    display: "flex",
    alignItem: "center",
  }
}));

function RequirementForm() {
  const classes = useStyles();
  //state use for loader
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false)

  const showResults = (dataOb) => {

    setLoading(true);
    //Request make at backend to save the requirement form data.
    authRequests
      .post(baseUrl+"/requirements", dataOb)
      .then((res) => {
        setMsg(true)
      })
      .catch((err) => { alert("Something went wronggit") })
      .finally(() => {
        setLoading(false);
      })
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMsg(false) 
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
            Requirement Form
          </Typography>
        </React.Fragment>

        <Form
          onSubmit={showResults}
          subscription={{ submitted: true }}
        >
          {({ handleSubmit, submitting, form }) => (
            <form
              onSubmit={handleSubmit}
              className={classes.form}
            >
                  <Field
                    autoFocus
                    name="Firstname"
                    label="First Name"
                    fullWidth
                    validate={(value) =>
                      value
                        ? validator.isAlpha(value, 'en-US', {ignore: ' '})
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
                      touched: true
                    }}
                  />
              <Field
                name="Email"
                label="Email"
                fullWidth
                margin="normal"
                validate={value =>
                  !validator.isEmail(value || "") && "Please Enter valid Email "
                }
                component={RFTextField}
                subscription={{
                  value: true,
                  error: true,
                  touched: true
                }}
              />
              <Field
                name="PhoneNumber"
                label="Phone Number"
                fullWidth
                validate={value =>
                  !validator.isMobilePhone(value || "") && "Please Enter valid Mobile Number "
                }
                component={RFTextField}
                subscription={{
                  value: true,
                  error: true,
                  touched: true
                }}
              />
              <Field
                name="Requirement"
                label="Requirement"
                fullWidth
                multiline
                rows={4}
                validate={value => (value ? (validator.isLength(value, { min: 20, max: undefined }) ? undefined : "Minimum 20 characters required") : 'Required')}
                component={RFTextField}
                subscription={{
                  value: true,
                  error: true,
                  touched: true
                }}
              />


              <Snackbar open={msg}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                autoHideDuration={5000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Your request has been submitted, Our team will get back to you soon.
                </Alert>
              </Snackbar>

              <FormButton
                className={classes.button}
                disabled={submitting}
                size="large"
                color="secondary"
                fullWidth
                style={{borderRadius: "10px"}} 
              >
                {loading ?
                  <div className={classes.loaderbox}>
                    <CircularProgress style={{ color: "white" }} />
                  </div> :
                  <div>Submit</div>}
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