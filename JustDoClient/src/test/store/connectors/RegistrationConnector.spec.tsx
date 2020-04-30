import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import RegistrationConnect from "../../../store/connectors/RegistrationConnector";
import {mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import fetchMock from "fetch-mock";

const email = "test@mail.com";
const password = "123456EE@";

configure({adapter: new Adapter()});

describe('Registration click events ', () => {

    let wrapper: any;

    let store = createStore(MainReducer);

    beforeEach(() => {
        const client = new ApolloClient({
            uri: `localhost`,
        });
        wrapper = mount(<ApolloProvider client={client}><Provider store={store}><BrowserRouter><RegistrationConnect/></BrowserRouter></Provider></ApolloProvider>);
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('should set email', () => {
        const container = wrapper.find('input[type="text"]');
        expect(container.length).toEqual(1);
        container.simulate('change', {target: {value: email}});
        expect(store.getState().RegistrationReducer.email).toEqual(email);
    });

    it('should set password', () => {
        const container = wrapper.find('input[type="password"]');
        expect(container.length).toEqual(2);
        container.at(0).simulate('change', {target: {value: password}});
        expect(store.getState().RegistrationReducer.password).toEqual(password);
    });

    test('should set confirmPassword', () => {
        const container = wrapper.find('input[type="password"]');
        expect(container.length).toEqual(2);
        container.at(1).simulate('change', {target: {value: password}});
        expect(store.getState().RegistrationReducer.confirmPassword).toEqual(password);
    });

    it('should createUser', async () =>
    {
        const body = {
            message: true
        };

        fetchMock.once('localhost', {
            body: JSON.stringify(body),
            status: 200,
            statusText: 'OK',
            headers: {'Content-Type': 'application/json'},
            sendAsJson: false
        }, {
            method: 'POST'
        });

        let container = wrapper.find('input[type="text"]');
        container.simulate('change', {target: {value: email}});

        container = wrapper.find('input[type="password"]');
        container.at(0).simulate('change', {target: {value: password}});
        container.at(1).simulate('change', {target: {value: password}});

        container = wrapper.find('#color_button');
        await container.at(4).simulate('click');
        await fetchMock.flush();
        await wrapper.update();
        expect(store.getState().RegistrationReducer.message).toEqual(``);
    });
});