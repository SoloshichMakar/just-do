import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configure, shallow} from "enzyme";
import MainReducer from "../../store/reducers/MainReducer";
import {email, password} from "../testUtils/testConstant";
import {
    actionAuthenticated,
    actionClearMessage,
    actionErrorMessage, actionFormClear, actionSetMessage,
    actionTextEmailChange, actionTextPasswordChange
} from "../../store/actions/RegistrationActions";
import RegistrationConnector from "../../store/connectors/RegistrationConnector";
import React from "react";
import {createStore} from "redux";
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter()});

describe('Reduscer -- Test Registration actions with store', () => {
    let store: any, wrapper;

    beforeEach(() => {
        store = createStore(MainReducer);
        wrapper = shallow(<Provider store={store}><BrowserRouter><RegistrationConnector/></BrowserRouter></Provider>);
    });

    it('dispatch action email change', () => {
        store.dispatch(actionTextEmailChange(email));
        expect(store.getState().RegistrationReducer.email).toEqual(email);
    });

    it('dispatch action password change', () => {
        store.dispatch(actionTextPasswordChange(password));
        expect(store.getState().RegistrationReducer.password).toEqual(password);
    });

    it('dispatch action password confirm change', () => {
        store.dispatch(actionErrorMessage());
        expect(store.getState().RegistrationReducer.message).toEqual('This email address is already exist');
    });

    it('dispatch action set message', () => {
        store.dispatch(actionSetMessage('Test message'));
        expect(store.getState().RegistrationReducer.message).toEqual('Test message');
    });

    it('dispatch action clear message', () => {
        store.dispatch(actionSetMessage('Test message'));
        store.dispatch(actionClearMessage());
        expect(store.getState().RegistrationReducer.message).toEqual('');
    });

    it('dispatch action authenticated', () => {
        store.dispatch(actionAuthenticated());
        expect(store.getState().RegistrationReducer.email).toEqual('');
        expect(store.getState().RegistrationReducer.password).toEqual('');
    });


    it('dispatch actionPasswordConfirmChange', () => {
        store.dispatch(actionFormClear());
        expect(store.getState().RegistrationReducer.email).toEqual('');
    });

});