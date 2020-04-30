import React from "react";
import "./App.scss";
import RegistrationConnector from "./store/connectors/RegistrationConnector";
import AuthorizationConnector from "./store/connectors/AuthorizationConnector";
import PasswordRestoreConnector from "./store/connectors/PasswordRestoreConnector";
import ForgotPasswordConnector from "./store/connectors/ForgotPasswordConnector";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ToDoMain from './components/ToDoMain/ToDoMain'

function App() {
  return <BrowserRouter >
    <Switch>
      <Route exact path="/registration" component={RegistrationConnector}/>
      <Route exact path="/login" component={AuthorizationConnector}/>
      <Route exact path="/password_restore" component={ForgotPasswordConnector}/>
      <Route exact path="/reset_password/:id/:token" component={PasswordRestoreConnector}/>
      <Route exact path="/" component={ToDoMain}/>
    </Switch>
  </BrowserRouter>;
}

export default App;
