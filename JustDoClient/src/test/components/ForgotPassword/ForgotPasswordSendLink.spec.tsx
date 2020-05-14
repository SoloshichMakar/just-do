import renderer from "react-test-renderer";
import { createStore } from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import { Provider } from "react-redux";
import React from "react";
import ForgotPassword from "../../../components/ForgotPassword/ForgotPasswordSendLink";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

const props = {
  email: "",
  message: "",
  setMessage: Function,
  errorMessage: Function,
  clearMessage: Function,
  textEmailChange: Function,
};

const client = new ApolloClient({
  uri: ``,
});
const store = createStore(MainReducer);

describe("Forgot password component snapshot", () => {
  it("Forgot password component render correctly", () => {
    const tree = renderer
      .create(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
              <ForgotPassword
                email={props.email}
                clearMessage={props.clearMessage}
                errorMessage={props.errorMessage}
                message={props.message}
                setMessage={props.setMessage}
                textEmailChange={props.textEmailChange}
              />
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
