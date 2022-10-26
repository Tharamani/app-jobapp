import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import validator from "validator"

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function ForgotPassword() {
  const classes = useStyles();

  const showResults = (values) => {
    alert(JSON.stringify(values))
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              'send you a link to reset your password.'}
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={showResults}
          subscription={{submitted: true}}
        >
        {({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
           <Field
              autofocus
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              validate={v=>
                !validator.isEmail(v || "") && "Plese Enter valid Email "
              }
              component={RFTextField}
              subscription={{
                value: true,
                error: true,
                touched: true
              }}
            />

            <FormButton
              className={classes.button}
              disabled={submitting}
              size="large"
              color="secondary"
              fullWidth
              style={{borderRadius: "10px"}} 
            >
              User Profile
            </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ForgotPassword);