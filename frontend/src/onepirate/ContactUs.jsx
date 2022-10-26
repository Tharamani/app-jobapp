import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import validator from "validator";
import MapView from "./modules/views/MapContainer";
import { authRequests } from "../utils/apirequests";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import { CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
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

function ContactUs() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [msg, setMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const showResults = (values) => {
    //alert(JSON.stringify(values))
    // alert(JSON.stringify(dataOb))

    setLoading(true);

    axios
      .post(baseUrl+"/countact-uses", values)
      .then((res) => {
        console.log(res.data);
        setMsg(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMsg(false);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
            Contact Us
          </Typography>
        </React.Fragment>
        <Form onSubmit={showResults} subscription={{ submitted: true }}>
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Field
                autoFocus
                name="query"
                label="Enter Your Query"
                fullWidth
                validate={(v) => (v ? undefined : "Required")}
                component={RFTextField}
                subscription={{
                  value: true,
                  error: true,
                  touched: true,
                }}
              />
              <Field
                name="firstname"
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
{/*              <Field
                name="phone_num"
                label="Phone Number"
                fullWidth
                validate={(v) =>
                  !validator.isMobilePhone(v || "") &&
                  "Plese Enter valid Mobile Number "
                }
                component={RFTextField}
                subscription={{
                  value: true,
                  error: true,
                  touched: true,
                }}
              />*/}
    <Field
                name="phone_num"
                label="Phone Number"
                fullWidth
              
               validate={(value) =>
                  value
                    ? validator.isMobilePhone(value, "en-US", { ignore: " " })
                      ? validator.isLength(value, {
                          min: 10,
                          max: 10,
                        })
                        ? undefined
                        
                      : "Special charecters not allowed"
                    : "Mininmum 10 digits required"
                    : "Please Enter valid Mobile Number "
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
                {loading ? <CircularProgress color="inherit" /> : "Submit"}
              </FormButton>
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={msg}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert
                  variant="filled"
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Query sent Successfully!
                </Alert>
              </Snackbar>
            </form>
          )}
        </Form>
      </AppForm>
      <MapView />
      {/* <AppFooter /> */}
    </React.Fragment>
  );
}

export default withRoot(ContactUs);