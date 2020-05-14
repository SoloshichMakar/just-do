import renderer from "react-test-renderer";
import { createStore } from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import { Provider } from "react-redux";
import React from "react";
import Registration from "../../../components/registration/Registration";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {BrowserRouter} from "react-router-dom";

const props = {
  email: "",
  password: "",
  message: "",
  showPassword: false,
  showConfirmPassword: false,
  confirmPassword: "",
  setMessage: Function,
  errorMessage: Function,
  formClear: Function,
  createUserMessage: Function,
  clearMessage: Function,
  textEmailChange: Function,
  textPasswordChange: Function,
  textConfirmPasswordChange: Function,
  showPasswordValue: Function,
  showConfirmPasswordValue: Function,
};

const client = new ApolloClient({
  uri: ``,
});
const store = createStore(MainReducer);

describe("Registration snapshot", () => {
  it("Registration render correctly", () => {
    const tree = renderer
      .create(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
            <Registration
              email={props.email}
              password={props.password}
              message={props.message}
              showPassword={props.showPassword}
              showConfirmPassword={props.showConfirmPassword}
              confirmPassword={props.confirmPassword}
              errorMessage={props.errorMessage}
              createUserMessage={props.createUserMessage}
              clearMessage={props.clearMessage}
              textEmailChange={props.textEmailChange}
              textPasswordChange={props.textPasswordChange}
              textConfirmPasswordChange={props.textConfirmPasswordChange}
              showPasswordValue={props.showPasswordValue}
              showConfirmPasswordValue={props.showConfirmPasswordValue}
              formClear={props.formClear}
              setMessage={props.setMessage}
            />
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
