import renderer from "react-test-renderer";
import { createStore } from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import { Provider } from "react-redux";
import React from "react";
import PasswordRestore from "../../../components/PasswordRestore/PasswordRestore";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

const props = {
    password: "",
    message: "",
    confirmPassword: "",
    match: Function,
    setMessage: Function,
    errorMessage: Function,
    clearMessage: Function,
    textPasswordChange: Function,
    textConfirmPasswordChange: Function,
};

const client = new ApolloClient({
    uri: ``,
});
const store = createStore(MainReducer);

describe("Password restore component snapshot", () => {
    it("Password restore component render correctly", () => {
        const tree = renderer
            .create(
                <ApolloProvider client={client}>
                    <Provider store={store}>
                        <BrowserRouter>
                            <PasswordRestore
                               password={props.password}
                               message={props.message}
                               confirmPassword={props.confirmPassword}
                               match={props.match}
                               setMessage={props.setMessage}
                               errorMessage={props.errorMessage}
                               clearMessage={props.clearMessage}
                               textPasswordChange={props.textPasswordChange}
                               textConfirmPasswordChange={props.textConfirmPasswordChange}
                            />
                        </BrowserRouter>
                    </Provider>
                </ApolloProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});