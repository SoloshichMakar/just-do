import Authorization from "../../../components/Authorization/Authorization";
import React from "react";
import renderer from "react-test-renderer";
import { createStore } from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {BrowserRouter} from "react-router-dom";


const props = {
  email: "",
  password: "",
  message: "",
  isCreated: false,
  success: false,
  formClear: Function,
  authenticated: Function,
  errorMessage: Function,
  clearMessage: Function,
  textEmailChange: Function,
  textPasswordChange: Function,
};

const client = new ApolloClient({
  uri: ``,
});
const store = createStore(MainReducer);

describe("Authorization snapshot", () => {
  it("Authorization render correctly", () => {

    const tree = renderer
      .create(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
            <Authorization
              email={props.email}
              password={props.password}
              authenticated={props.authenticated}
              clearMessage={props.clearMessage}
              errorMessage={props.errorMessage}
              formClear={props.formClear}
              isCreated={props.isCreated}
              message={props.message}
              success={props.success}
              textEmailChange={props.textEmailChange}
              textPasswordChange={props.textPasswordChange}
            />
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
