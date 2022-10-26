import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Home from "./Home";
import SignIn from "./Signin";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import RequirementForm from "./RequirementForm";
import ForgotPassword from "./ForgotPassword";
import Privacy from "./Privacy";
import Terms from "./Terms";
import ContactUs from "./ContactUs";
import MatPaginationTable from "./MatPaginationTable";
import ShowTable from "./ShowTable";
import UpdateProfile from "./UpdateProfile";

export default function RouterApp() {
  return (
    <Router>
      <Switch>
        {console.log(localStorage.getItem("regtoken"))}
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        {/* <Route exact path="/userprofile" component={UserProfile} /> */}
        <Route
          exact
          path="/userprofile"
          render={() =>
            localStorage.getItem("regtoken") == null ? (
              <Redirect to="/signin" />
            ) : (
              <UserProfile />
            )
          }
        />
        <Route exact path="/requirementform" component={RequirementForm} />
        <Route exact path="/signin/forgetpassword" component={ForgotPassword} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/myrequest" component={MatPaginationTable} />
        <Route exact path="/showtable" component={ShowTable} />
        <Route exact path="/updateprofile" component={UpdateProfile} />
      </Switch>
    </Router>
  );
}