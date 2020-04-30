import renderer from "react-test-renderer";
import { createStore } from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import { Provider } from "react-redux";
import React from "react";
import Registration from "../../../components/registration/Registration";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

const props = {
  email: "",
  password: "",
  message: "",
  isCreated: "",
  showPassword: "",
  showConfirmPassword: "",
  confirmPassword: "",
  errorMessage: Function,
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
    const tree = renderer.create(
        <ApolloProvider client={client}>
      <Provider store={store}>
        <Registration
          email={props.email}
          password={props.password}
          message={props.message}
          isCreated={props.isCreated}
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
        />
      </Provider>
        </ApolloProvider>).toJSON();
      expect(tree).toMatchSnapshot();
  });
});
