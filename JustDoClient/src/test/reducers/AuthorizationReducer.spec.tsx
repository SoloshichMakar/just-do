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
} from "../../store/actions/AuthorizationActions";
import AuthorizationConnector from "../../store/connectors/AuthorizationConnector";
import React from "react";
import {createStore} from "redux";
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter()});

describe('Reduscer -- Test UserAuthorisationReducer actions with store', () => {
    let store: any, wrapper;

    beforeEach(() => {
        store = createStore(MainReducer);
        wrapper = shallow(<Provider store={store}><BrowserRouter><AuthorizationConnector/></BrowserRouter></Provider>);
    });

    it('dispatch action email change', () => {
        store.dispatch(actionTextEmailChange(email));
        expect(store.getState().AuthorizationReducer.email).toEqual(email);
    });

    it('dispatch action password change', () => {
        store.dispatch(actionTextPasswordChange(password));
        expect(store.getState().AuthorizationReducer.password).toEqual(password);
    });

    it('dispatch action error message', () => {
        store.dispatch(actionErrorMessage());
        expect(store.getState().AuthorizationReducer.message).toEqual('Invalid credentials');
    });

    it('dispatch action set message', () => {
        store.dispatch(actionSetMessage('Test message'));
        expect(store.getState().AuthorizationReducer.message).toEqual('Test message');
    });

    it('dispatch action clear message', () => {
        store.dispatch(actionSetMessage('Test message'));
        store.dispatch(actionClearMessage());
        expect(store.getState().AuthorizationReducer.message).toEqual('');
    });

    it('dispatch action authenticated', () => {
        store.dispatch(actionAuthenticated());
        expect(store.getState().AuthorizationReducer.email).toEqual('');
        expect(store.getState().AuthorizationReducer.password).toEqual('');
    });


    it('dispatch action form clear', () => {
        store.dispatch(actionFormClear());
        expect(store.getState().AuthorizationReducer.email).toEqual('');
    });

});