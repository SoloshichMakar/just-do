import {createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import RegistrationConnect from "../../../store/connectors/RegistrationConnector";
import {mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {ApolloProvider} from "react-apollo";
import {createMockClient} from "mock-apollo-client";
import { act } from 'react-dom/test-utils';
import { ADD_USER } from "../../../graphQL/shemas"

const email = "test@mail.com";
const password = "123456EE@";

configure({adapter: new Adapter()});

describe('registration click events ', () => {

    let wrapper: any;

    let store = createStore(MainReducer);

    beforeEach(() => {
        const mockClient = createMockClient();

        mockClient.setRequestHandler(
            ADD_USER,
            () => Promise.resolve({ data: { addUser: {  id: 1, email: email  }} }));

        wrapper = mount(<ApolloProvider client={mockClient}><Provider store={store}><BrowserRouter><RegistrationConnect/></BrowserRouter></Provider></ApolloProvider>);
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('should set email', () => {
        const container = wrapper.find('#email_input').hostNodes();
        expect(container.length).toEqual(1);
        container.simulate('change', {target: {value: email}});
        expect(store.getState().RegistrationReducer.email).toEqual(email);
    });

    it('should set password', () => {
        const container = wrapper.find('#password_input').hostNodes();
        expect(container.length).toEqual(1);
        container.simulate('change', {target: {value: password}});
        expect(store.getState().RegistrationReducer.password).toEqual(password);
    });

    test('should set confirmPassword', () => {
        const container = wrapper.find('#password_confirm_input').hostNodes();
        expect(container.length).toEqual(1);
        container.simulate('change', {target: {value: password}});
        expect(store.getState().RegistrationReducer.confirmPassword).toEqual(password);
    });

    it('should createUser', async () =>
    {

        let container = wrapper.find('#email_input').hostNodes();
        container.simulate('change', {target: {value: email}});

        container = wrapper.find('#password_input').hostNodes();
        container.simulate('change', {target: {value: password}});

        container = wrapper.find('#password_confirm_input').hostNodes();
        container.simulate('change', {target: {value: password}});

        container = wrapper.find('#color_button').hostNodes();
        await act(async () => {
            await container.simulate('click');
        });
        wrapper.update();
        expect(store.getState().RegistrationReducer.message).toEqual(`User: test@mail.com is created`);
    });



    it('should throw registration error when email is already exist', async () =>
    {

        const mockClient = createMockClient();

        mockClient.setRequestHandler(
            ADD_USER,
            () => Promise.reject(new Error('User is exist')));

        wrapper = mount(<ApolloProvider client={mockClient}><Provider store={store}><BrowserRouter><RegistrationConnect/></BrowserRouter></Provider></ApolloProvider>);

        let container = wrapper.find('#email_input').hostNodes();
        container.simulate('change', {target: {value: email}});

        container = wrapper.find('#password_input').hostNodes();
        container.simulate('change', {target: {value: password}});

        container = wrapper.find('#password_confirm_input').hostNodes();
        container.simulate('change', {target: {value: password}});

        container = wrapper.find('#color_button').hostNodes();
        await act(async () => {
            await container.simulate('click');
        });
        wrapper.update();
        expect(store.getState().RegistrationReducer.message).toEqual(`This email address is already exist`);
    });

    it('should show and hide password text', async () => {
        let container = wrapper.find('#passwordVisibility').hostNodes();
        container.simulate('click');
        wrapper.update();
        container = wrapper.find('#password_input[type="text"]').hostNodes();
        expect(container).not.toEqual(undefined);
    });

    it('should show and hide confirm password text', async () => {
        let container = wrapper.find('#confirmPasswordVisibility').hostNodes();
        container.simulate('click');
        wrapper.update();
        container = wrapper.find('#password_confirm_input[type="text"]').hostNodes();
        expect(container).not.toEqual(undefined);
    });
});