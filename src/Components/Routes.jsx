import React from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import StarterPage from "./StarterPage";
import LoginPage from "./LoginPage";

const Routes = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={StarterPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </main>
  );
};

export default withRouter(Routes);
