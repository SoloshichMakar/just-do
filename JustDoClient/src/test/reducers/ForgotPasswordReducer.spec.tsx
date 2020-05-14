import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configure, shallow} from "enzyme";
import MainReducer from "../../store/reducers/MainReducer";
import {email, password} from "../testUtils/testConstant";
import {
    actionClearMessage,
    actionErrorMessage,
    actionFormClear,
    actionTextEmailChange,
} from "../../store/actions/ForgotPasswordActions";
import ForgotPasswordConnector from "../../store/connectors/ForgotPasswordConnector";
import React from "react";
import {createStore} from "redux";
import Adapter from 'enzyme-adapter-react-16';
import {actionSetMessage} from "../../store/actions/AuthorizationActions";


configure({adapter: new Adapter()});

describe('Reduscer -- Test Forgot password actions with store', () => {
    let store: any, wrapper;

    beforeEach(() => {
        store = createStore(MainReducer);
        wrapper = shallow(<Provider store={store}><BrowserRouter><ForgotPasswordConnector/></BrowserRouter></Provider>);
    });

    it('dispatch action email change', () => {
        store.dispatch(actionTextEmailChange(email));
        expect(store.getState().ForgotPasswordReducer.email).toEqual(email);
    });

    it('dispatch action error message', () => {
        store.dispatch(actionErrorMessage());
        expect(store.getState().ForgotPasswordReducer.message).toEqual('Invalid credentials');
    });

    it('dispatch action form clear', () => {
        store.dispatch(actionFormClear());
        expect(store.getState().ForgotPasswordReducer.email).toEqual('');
    });


    it('dispatch action clear message', () => {
        store.dispatch(actionSetMessage('Test message'));
        store.dispatch(actionClearMessage());
        expect(store.getState().ForgotPasswordReducer.message).toEqual('');
    });
});