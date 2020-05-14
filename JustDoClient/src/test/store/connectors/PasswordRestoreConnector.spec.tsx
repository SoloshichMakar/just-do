import {createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import PasswordRestoreConnector from "../../../store/connectors/PasswordRestoreConnector";
import {mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {ApolloProvider} from "react-apollo";
import {createMockClient} from "mock-apollo-client";
import { act } from 'react-dom/test-utils';
import { PASSWORD_RESTORE } from "../../../graphQL/shemas"

const email = "test@mail.com";
const password = "123456EE@";



configure({adapter: new Adapter()});

describe('Password restore click events', () => {
    const match = {
        params: {
            id: 1,
            token: "some token"
        }
    };

    let wrapper: any;

    let store = createStore(MainReducer);

    beforeEach(() => {
        const mockClient = createMockClient();

        mockClient.setRequestHandler(
            PASSWORD_RESTORE,
            () => Promise.resolve({ data: { passwordRestore: {  id: 1, email: email  }} }));

        wrapper = mount(<ApolloProvider client={mockClient}><Provider store={store}><BrowserRouter><PasswordRestoreConnector match = {match}/></BrowserRouter></Provider></ApolloProvider>);
    });
    afterEach(() => {
        wrapper.unmount();
    });


    it('should set password', () => {
        const container = wrapper.find('#password_input').hostNodes();
        expect(container.length).toEqual(1);
        container.simulate('change', {target: {value: password}});
        expect(store.getState().PasswordRestoreReducer.password).toEqual(password);
    });

    test('should set confirm password', () => {
        const container = wrapper.find('#password_confirm_input').hostNodes();
        expect(container.length).toEqual(1);
        container.simulate('change', {target: {value: password}});
        expect(store.getState().PasswordRestoreReducer.confirmPassword).toEqual(password);
    });

    it('should restore password', async () =>
    {
        let container = wrapper.find('#password_input').hostNodes();
        container.simulate('change', {target: {value: password}});

        container = wrapper.find('#password_confirm_input').hostNodes();
        container.simulate('change', {target: {value: password}});

        container = wrapper.find('#color_button').hostNodes();
        await act(async () => {
            await container.simulate('click');
        });
        wrapper.update();
        expect(store.getState().PasswordRestoreReducer.message).toEqual(`You have successfully changed your password!`);
    });



    it('should throw password restore error when link is forbidden', async () =>
    {

        const mockClient = createMockClient();

        mockClient.setRequestHandler(
            PASSWORD_RESTORE,
            () => Promise.reject(new Error('Error')));

        wrapper = mount(<ApolloProvider client={mockClient}><Provider store={store}><BrowserRouter><PasswordRestoreConnector match = {match}/></BrowserRouter></Provider></ApolloProvider>);

        let container = wrapper.find('#password_input').hostNodes();
        container.simulate('change', {target: {value: password}});

        container = wrapper.find('#password_confirm_input').hostNodes();
        container.simulate('change', {target: {value: password}});

        container = wrapper.find('#color_button').hostNodes();
        await act(async () => {
            await container.simulate('click');
        });
        wrapper.update();
        expect(store.getState().PasswordRestoreReducer.message).toEqual(`This link is forbidden, please make new request to get password restore link.`);
    });
});